using AutoMapper;
using MeetAppApi.Context;
using MeetAppApi.Dtos;
using MeetAppApi.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MeetAppApi.Controllers
{
    //http://localhost:5134/api/Categories
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {

        private readonly ApplicationContext _context;
        private readonly IMapper _mapper;
        private readonly IJwtHandler _jwtHandler;

        public CategoriesController(ApplicationContext context, IMapper mapper, IJwtHandler jwtHandler)
        {
            _context = context;
            _mapper = mapper;
            _jwtHandler = jwtHandler;
        }

        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            try
            {
                var categories = await _context.Categories.Select(c => _mapper.Map<CategoryDto>(c)).ToListAsync();
                if (categories == null)
                    return NotFound();
                return Ok(categories);
            }catch (Exception)
            {
                return StatusCode(500, new { message = "Sunucu hatası oluştu." });
            }
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryById(int? id)
        {
            try
            {
                var category = await _context.Categories.Where(c => c.Id == id).Select(c => _mapper.Map<CategoryDto>(c)).FirstOrDefaultAsync();
                if (category == null)
                    return NotFound();
                return Ok(category);
            }
            catch(Exception)
            {
                return StatusCode(500, new { message = "Sunucu hatası oluştu." });
            }
        }

    }
}
