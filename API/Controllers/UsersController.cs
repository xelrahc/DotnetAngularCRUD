using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly ITokenService _tokenService;
        public UsersController(IUserRepository userRepository, IMapper mapper, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _mapper = mapper;
            _userRepository = userRepository;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetUsers()
        {
            var users = await _userRepository.GetUsersAsync();

            return Ok(users);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDTO>> GetUser(int id)
        {
            var user = await _userRepository.GetUserAsync(id);
            return _mapper.Map<UserDTO>(user);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<UserDTO>> UpdateUser(int id, UserUpdateDTO userUpdateDTO)
        {
            var user = await _userRepository.GetUserAsync(id);

            _mapper.Map(userUpdateDTO, user);

            _userRepository.Update(user);

            if (await _userRepository.SaveAllAsync())
                return Ok(
                    new UserDTO
                    {
                        Email = user.Email,
                        Token = _tokenService.CreateToken(user),
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Id = user.Id
                    }
                );

            return BadRequest("Failed to update user");
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            _userRepository.DeleteUser(id);
            if (await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update user");
        }
    }
}