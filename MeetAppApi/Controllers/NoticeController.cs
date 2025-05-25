using AutoMapper;
using MeetAppApi.Context;
using MeetAppApi.Dtos;
using MeetAppApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MeetAppApi.Controllers
{
    //http://localhost:5134/api/Notice
    [ApiController]
    [Route("api/[controller]")]
    public class NoticeController : ControllerBase
    {
        private readonly ApplicationContext _context;

        private readonly IMapper _mapper;

        public NoticeController (ApplicationContext context, IMapper mapper)
        {
            _context = context; 
            _mapper = mapper;
        }


        //http://localhost:5134/api/Notice
        [HttpGet]
        public async Task<IActionResult> getAllNotices()
        {
            try
            {
                var notices = await _context.Notices.Select(n => _mapper.Map<NoticeDto>(n)).ToListAsync();
                if (notices == null)
                    return NotFound();

                return Ok(notices);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Sunucu hatası oluştu." });
            }
        }


        //http://localhost:5134/api/Notice
        [HttpPost]
        public async Task<IActionResult> CreateNotice([FromBody] NoticeDto dto)
        {
            var user = await _context.Users.FindAsync(dto.UserId);
            if (user == null)
                return NotFound(new { message = "Kullanıcı bulunamadı." });

            var not = await _context.Notices.Where(n => n.UserId == dto.UserId).FirstOrDefaultAsync();

            if (not != null)
                return BadRequest(new { message = "Bu kullanıcı için zaten bir notice mevcut." });

            var notice = new Notice
            {
                UserId = dto.UserId,
                NoticeHeader = dto.NoticeHeader,
                NoticeDetail = dto.NoticeDetail
            };

            _context.Notices.Add(notice);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Notice başarıyla eklendi." });
        }

        //http://localhost:5134/api/Notice/id
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNotice(int id, [FromBody] NoticeDto dto)
        {
            var notice = await _context.Notices.FindAsync(id);

            if (notice == null)
                return NotFound(new { message = "Notice bulunamadı." });

            // İlgili kullanıcı var mı kontrolü (opsiyonel ama güvenli)
            var userExists = await _context.Users.AnyAsync(u => u.Id == dto.UserId);
            if (!userExists)
                return NotFound(new { message = "Kullanıcı bulunamadı." });

            // Güncelleme işlemi
            notice.NoticeHeader = dto.NoticeHeader;
            notice.NoticeDetail = dto.NoticeDetail;

            _context.Notices.Update(notice);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Notice başarıyla güncellendi." });
        }

    }
}
