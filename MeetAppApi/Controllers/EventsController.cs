using AutoMapper;
using MeetAppApi.Context;
using MeetAppApi.Dtos;
using MeetAppApi.Interfaces;
using MeetAppApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MeetAppApi.Controllers
{
    //http://localhost:5134/api/Events
    [ApiController]
    [Route("api/[controller]")]
    public class EventsController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly IMapper _mapper;
        private readonly IJwtHandler _jwtHandler;
        private readonly IWebHostEnvironment _env;

        public EventsController(ApplicationContext context,IMapper mapper,IJwtHandler jwtHandler, IWebHostEnvironment env)
        {
            _context = context; 
            _mapper = mapper;
            _jwtHandler = jwtHandler;
            _env = env;
        }

        [HttpGet]
        public async Task<IActionResult> GetEvents()
        {
            try
            {
                var events = await _context.Events.Select(e => _mapper.Map<EventDto>(e)).ToListAsync();
                if (events == null)
                    return NotFound();

                return Ok(events);
            }
            catch (Exception)
            {

                return StatusCode(500, new { message = "Sunucu hatası oluştu." });
            }

        }

        //http://localhost:5134/api/Events/id 
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEventById(int? id)
        {
            try
            {
               var events = await _context.Events.Where(e => e.Id == id).Select(e => _mapper.Map<EventDto>(e)).FirstOrDefaultAsync();
                if (events == null)
                    return NotFound();
                return Ok(events);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Sunucu hatası oluştu." });
            }
        }

        //http://localhost:5134/api/Events/id 
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(int? id)
        {
            try
            {
                var existingEvent = await _context.Events.Where(e => e.Id == id).FirstOrDefaultAsync();
                if (existingEvent == null)
                    return NotFound();

                // Eski görseli siliyorum uploads şişmesin !
                var oldImagePath = Path.Combine(_env.WebRootPath, existingEvent.ImageUrl.TrimStart('/'));

                if (System.IO.File.Exists(oldImagePath))
                    System.IO.File.Delete(oldImagePath);


                _context.Events.Remove(existingEvent);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetEventById), new { id }, _mapper.Map<EventDto>(existingEvent));
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Sunucu hatası oluştu." });
            }
        }

        //http://localhost:5134/api/Events/bycategory/id
        [HttpGet("bycategory/{id}")]
        public async Task<IActionResult> GetEventsByCategoryId(int? id)
        {
            try
            {
                if(id == null)
                    return BadRequest(new {message = "id giriniz"});

                var existingEventIds = await _context.EventCategories.Where(e => e.CategoryId == id).Select(e => e.EventId).ToListAsync();
                
                if (existingEventIds == null)
                    return NotFound();
                
                var events = await _context.Events.Where(e => existingEventIds.Contains(e.Id)).Select(e => _mapper.Map<EventDto>(e)).ToListAsync();

                if(events == null) 
                    return NotFound();
                
                return Ok(events);

            }
            catch(Exception err) 
            {
                return NotFound(err);
            }
        }
        //http://localhost:5134/api/Events 
        [HttpPost]
        public async Task<IActionResult> AddEvent([FromForm]AddEventDto eventDto)
        {
            try
            {
                if(eventDto == null)
                {
                    return NotFound();
                }

                if (eventDto.Image == null || eventDto.Image.Length == 0)
                    return BadRequest("Lütfen bir görsel yükleyin.");

                var fileName = Guid.NewGuid() + Path.GetExtension(eventDto.Image.FileName);
                var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads");

                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await eventDto.Image.CopyToAsync(stream);
                }


                var newEvent = new Event
                {
                    EventName = eventDto.EventName,
                    EventDescription = eventDto.EventDescription,
                    City = eventDto.City,
                    Country = eventDto.Country,
                    Location = eventDto.Location,
                    NumberOfTickets = eventDto.NumberOfTickets,
                    TicketPrice = eventDto.TicketPrice,
                    IsOnBanner = eventDto.IsOnBanner,
                    IsOnSale = eventDto.IsOnSale,
                    ImageUrl = $"/uploads/{fileName}",
                    Rules = eventDto.Rules,
                    EndDate = eventDto.EndDate,
                    StartDate = eventDto.StartDate,
                };

                if (eventDto.CategoryIds != null && eventDto.CategoryIds.Any())
                {
                    // eklenen kategori id ler category tablomuzda var mı onu kontrol ediyoruz !
                    var validCategoryIds = await _context.Categories
                    .Where(c => eventDto.CategoryIds.Contains(c.Id))
                    .Select(c => c.Id)
                    .ToListAsync();

                    if (validCategoryIds.Count != eventDto.CategoryIds.Count)  
                        return BadRequest("Geçersiz kategoriler gönderildi.");


                    newEvent.Categories = eventDto.CategoryIds.Select(catId => new EventCategory
                    {
                        CategoryId = catId,
                        Event = newEvent

                    }).ToList();
                }
                _context.Events.Add(newEvent);

                await _context.SaveChangesAsync();

                return Ok(_mapper.Map<EventDto>(newEvent));

            }
            catch(Exception)
            {
                return StatusCode(500, new { message = "Sunucu hatası oluştu." });
            }

        }


        //http://localhost:5134/api/Events/eventId 
        [HttpPut("{eventId}")]
        public async Task<IActionResult> UpdateEvent(int eventId, [FromForm] UpdateEventDto eventDto)
        {
            try
            {
                var existingEvent = await _context.Events
                    .Include(e => e.Categories)
                    .FirstOrDefaultAsync(e => e.Id == eventId);

                if (existingEvent == null)
                {
                    return NotFound("Etkinlik bulunamadı.");
                }

                if (eventDto.CategoryIds == null)
                    return BadRequest("En az bir kategori seçilmelidir.");

                // Görsel vermediye kaydetmiyorum eskisi kalıyor !
                if (eventDto.Image != null && eventDto.Image.Length > 0)
                {

                    // Eski görseli siliyorum uploads şişmesin !
                    var oldImagePath = Path.Combine(_env.WebRootPath, existingEvent.ImageUrl.TrimStart('/'));

                    if (System.IO.File.Exists(oldImagePath))
                        System.IO.File.Delete(oldImagePath);


                    var fileName = Guid.NewGuid() + Path.GetExtension(eventDto.Image.FileName);
                    var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads");

                    if (!Directory.Exists(uploadsFolder))
                        Directory.CreateDirectory(uploadsFolder);

                    var filePath = Path.Combine(uploadsFolder, fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await eventDto.Image.CopyToAsync(stream);
                    }

                    existingEvent.ImageUrl = $@"/uploads/{fileName}";
                }

                existingEvent.EventName = eventDto.EventName;
                existingEvent.EventDescription = eventDto.EventDescription;
                existingEvent.City = eventDto.City;
                existingEvent.Country = eventDto.Country;
                existingEvent.Location = eventDto.Location;
                existingEvent.NumberOfTickets = eventDto.NumberOfTickets;
                existingEvent.TicketPrice = eventDto.TicketPrice;
                existingEvent.IsOnBanner = eventDto.IsOnBanner;
                existingEvent.IsOnSale = eventDto.IsOnSale;
                existingEvent.Rules = eventDto.Rules;
                existingEvent.StartDate = eventDto.StartDate;
                existingEvent.EndDate = eventDto.EndDate;

                // Kategori güncellemesi
                if (eventDto.CategoryIds != null)
                {
                    var validCategoryIds = await _context.Categories
                        .Where(c => eventDto.CategoryIds.Contains(c.Id))
                        .Select(c => c.Id)
                        .ToListAsync();

                    if (validCategoryIds.Count != eventDto.CategoryIds.Count)
                        return BadRequest("Geçersiz kategoriler gönderildi.");

                    // Eski ilişkileri sil
                    if(existingEvent.Categories != null)
                    {
                        _context.EventCategories.RemoveRange(existingEvent.Categories);
                    }

                    // Yeni ilişkileri ekle
                    existingEvent.Categories = eventDto.CategoryIds.Select(catId => new EventCategory
                    {
                        EventId = existingEvent.Id,
                        CategoryId = catId
                    }).ToList();
                }

                await _context.SaveChangesAsync();

                return Ok(_mapper.Map<EventDto>(existingEvent));
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Sunucu hatası oluştu." });
            }
        }

    }
}
