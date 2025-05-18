using AutoMapper;
using MeetAppApi.Context;
using MeetAppApi.Dtos;
using MeetAppApi.Interfaces;
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



    }
}
