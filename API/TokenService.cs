using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;

namespace API
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}