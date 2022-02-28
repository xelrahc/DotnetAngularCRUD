using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountsController : BaseApiController
    {
        private const string EmailBody = "Sample Email Body", EmailSubject = "Sample Email Subject";
        private readonly SimpleCRUDContext _context;
        private readonly ITokenService _tokenService;
        private readonly IEmailService _emailService;
        public AccountsController(SimpleCRUDContext context, ITokenService tokenService, IEmailService emailService)
        {
            _emailService = emailService;
            _tokenService = tokenService;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO)
        {
            if (await UserExists(registerDTO.Email)) return BadRequest("Email is taken.");
            
            var user = new User
            {
                FirstName = registerDTO.FirstName,
                LastName = registerDTO.LastName,
                Email = registerDTO.Email.ToLower(),
                Password = registerDTO.Password
            };

            _context.Users.Add(user);
            if(await _context.SaveChangesAsync() > 0) await _emailService.SendEmail(user.Email, EmailSubject, EmailBody, $"{user.LastName}, {user.FirstName}");

            return new UserDTO
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == loginDTO.Email);

            if (user == null) return Unauthorized("Invalid email.");

            if (user.Password != loginDTO.Password) return Unauthorized("Invalid password.");

            return new UserDTO
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                FirstName = user.FirstName,
                LastName = user.LastName,
                Id = user.Id
            };
        }

        private async Task<bool> UserExists(string email)
        {
            return await _context.Users.AnyAsync(u => u.Email == email.ToLower());
        }
    }
}