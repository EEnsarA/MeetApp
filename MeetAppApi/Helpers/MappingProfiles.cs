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

        }    
    }
}
