using AutoMapper;
using MeetAppApi.Dtos;
using MeetAppApi.Models;

namespace MeetAppApi.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles() 
        {

            CreateMap<User, UserListDto>();
            CreateMap<UserListDto,User>();
            CreateMap<User,RegisterDto>();
            CreateMap<RegisterDto, User>();
            CreateMap<Event,EventDto>();
            CreateMap<EventDto, Event>();
            CreateMap<Category,CategoryDto>();
            CreateMap<CategoryDto, Category>(); 
            CreateMap<Cart,CartDto>();
            CreateMap<CartDto,Cart>();

        }    
    }
}
