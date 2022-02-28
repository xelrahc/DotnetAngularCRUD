using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IEmailService
    {
        Task SendEmail(string email, string subject, string body, string senderName);
    }
}