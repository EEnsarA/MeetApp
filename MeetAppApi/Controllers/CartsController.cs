using AutoMapper;
using MeetAppApi.Context;
using MeetAppApi.Dtos;
using MeetAppApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace MeetAppApi.Controllers
{

    // http://localhost:5134/api/carts
    [ApiController]
    [Route("api/[controller]")]
    public class CartsController : ControllerBase
    {
        private readonly ApplicationContext _context;

        private readonly IMapper _mapper;

        public CartsController(ApplicationContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        // http://localhost:5134/api/carts/id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCartByUserId(int? id)
        {
            try
            {
                var cart = await _context.Carts.Where(c => c.UserId == id).Select(c => _mapper.Map<CartDto>(c)).FirstOrDefaultAsync();
                if(cart == null)
                    return NotFound();
                return Ok(cart);

            }catch(Exception)
            {
                return StatusCode(500, new { message = "Sunucu hatası oluştu." });
            }
        }

        // http://localhost:5134/api/carts/byUserId/id
        [HttpGet("byUserId/{id}")]
        public async Task<IActionResult> GetCartEventsByUserId(int? id)
        {
            try
            {

                var cart = await _context.Carts
                       .Include(c => c.Items)
                            .ThenInclude(ci => ci.Event)
                                .FirstOrDefaultAsync(c => c.UserId == id);// event bilgisi

                if (cart == null || cart.Items == null || !cart.Items.Any())
                    return NotFound(new { message = "Sepet veya sepet öğeleri bulunamadı." });

                var result = cart.Items.Select(ci => new EventsWithCountDto
                {
                       Id = ci.Event.Id,
                       EventName = ci.Event.EventName,
                       EventDescription = ci.Event.EventDescription,
                       ImageUrl = ci.Event.ImageUrl,
                       City = ci.Event.City,
                       Country = ci.Event.Country,
                       Location = ci.Event.Location,
                       StartDate = ci.Event.StartDate,
                       EndDate = ci.Event.EndDate,
                       NumberOfTickets = ci.Event.NumberOfTickets,
                       TicketPrice = ci.Event.TicketPrice,
                       IsOnSale = ci.Event.IsOnSale,
                       IsOnBanner = ci.Event.IsOnBanner,
                       Rules = ci.Event.Rules,
                       Count = ci.Count,

                }).ToList();

                return Ok(result);
            }
            catch (Exception) 
            {
                return StatusCode(500, new { message = "Sunucu hatası oluştu." });
            }
        }

        // http://localhost:5134/api/carts/
        [HttpPost]
        public async Task<IActionResult> AddEventToCart([FromBody] AddCartDto addCartDto)
        {
            try
            {
                if(addCartDto == null)
                    return BadRequest();

                var userId = addCartDto.userId;
                var eventId = addCartDto.eventId;

                
                var cart = await _context.Carts
                    .Include(c => c.Items)   // left joinle carts içindeki cartItems tablosuna geçiş yaparak cart ve cartItemsı getiriyor yani tabloları birden fazla context sorgusu ile getirmek yerine left joinle getiriyoruz !
                    .FirstOrDefaultAsync(c => c.UserId == userId);

                if(cart == null)
                {
                    cart = new Cart
                    {
                        UserId = userId,
                        Items = new List<CartItem>()
                    };
                    _context.Carts.Add(cart);
                    await _context.SaveChangesAsync();
                }

                var existingItem = cart.Items.FirstOrDefault(ci => ci.EventId == eventId);
                if(existingItem != null) 
                {
                    existingItem.Count += 1;
                }
                else
                {
                    cart.Items.Add(new CartItem
                    {
                        EventId = eventId,
                        Count = 1
                    });
                }
                await _context.SaveChangesAsync();
                return Ok(new {message = "Etkinlik Sepete Eklendi"});

            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Sunucu hatası oluştu." });
            }
        }

        // http://localhost:5134/api/carts/
        [HttpDelete]
        public async Task<IActionResult> RemoveEventFromCart([FromBody] AddCartDto removeCardDto)
        {
            try
            {
                if (removeCardDto == null)
                    return BadRequest();


                var userId = removeCardDto.userId;
                var eventId = removeCardDto.eventId;

                var cart = await _context.Carts  // left joinle carts içindeki cartItems tablosuna geçiş yaparak cart ve cartItemsı getiriyor yani tabloları birden fazla context sorgusu ile getirmek yerine left joinle getiriyoruz !
                .Include(c => c.Items)
                .FirstOrDefaultAsync(c => c.UserId == userId);


                if (cart == null)
                    return NotFound(new { message = "Kullanıcının sepeti bulunamadı." });

                var cartItem = cart.Items.FirstOrDefault(ci => ci.EventId == eventId);  

                if (cartItem == null)
                    return NotFound(new { message = "Etkinlik sepette bulunamadı." });

                if (cartItem.Count > 1)
                {
                    cartItem.Count -= 1;
                }
                else
                {
                    cart.Items.Remove(cartItem);
                    _context.CartItems.Remove(cartItem); // Ayrıca EF’e de bildir
                }
                await _context.SaveChangesAsync();

                return Ok(new { message = "Etkinlik sepetten kaldırıldı." });
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Sunucu hatası oluştu." });
            }
        }

        // http://localhost:5134/api/carts/updateTickets
        [HttpPost("updateTickets")]
        public async Task<IActionResult> UpdateEventTickets([FromBody]List<UpdateEventTicketsDto> ticketUpdates)
        {
            if (ticketUpdates == null)
                return BadRequest();
            var eventIds = ticketUpdates.Select(t => t.EventId).ToList();

            var existingEvents = await _context.Events.Where(e => eventIds.Contains(e.Id)).ToListAsync();

            foreach(var ticket in ticketUpdates)
            {
                var ev = existingEvents.FirstOrDefault(e => e.Id == ticket.EventId);
                if (ev == null)
                    return NotFound("Event not found");

                if (ev.NumberOfTickets < ticket.TicketCount)
                    return BadRequest($"Not enough tickets available");
                
                ev.NumberOfTickets -= ticket.TicketCount;
            }

            await _context.SaveChangesAsync();

            return Ok("Event tickets updated successfully.");

        }

        // http://localhost:5134/api/carts/clearCart/id
        [HttpPost("clearCart/{userId}")]
        public async Task<IActionResult> ClearCart(int? userId)
        {
            try
            {
                var cart = await _context.Carts
                    .Include(c => c.Items)
                    .FirstOrDefaultAsync(c => c.UserId == userId);

                if (cart == null || cart.Items == null)
                    return NotFound(new { message = "Sepet zaten boş." });

                _context.CartItems.RemoveRange(cart.Items);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Sepet başarıyla temizlendi." });
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Sepet temizlenirken bir hata oluştu." });
            }
        }

    }

}
