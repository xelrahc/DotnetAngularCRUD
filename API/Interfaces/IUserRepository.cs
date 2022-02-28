using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Models;

namespace API.Interfaces
{
    public interface IUserRepository
    {
    void Update(User user);

        void DeleteUser(int id);

        Task<bool> SaveAllAsync();

        Task<IEnumerable<UserDTO>> GetUsersAsync();

        Task<User> GetUserAsync(int id);
        Task<User> GetUserByEmailAsync(string email);

    }
}