using System;
using System.Collections.Generic;
using System.Linq;
using MailKit.Net.Smtp;
using System.Threading.Tasks;
using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;
using MimeKit;

namespace API.Services
{
    public class EmailService : IEmailService
    {
        private readonly SmtpSettings _setting;
        private readonly IWebHostEnvironment _env;
        public EmailService(IOptions<SmtpSettings> setting, IWebHostEnvironment env)
        {
            _setting = setting.Value;
            _env = env;
            
        }

        public async Task SendEmail(string email, string subject, string body, string senderName)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(_setting.SenderName, _setting.SenderEmail));
            message.To.Add(new MailboxAddress(senderName, email));
            message.Subject = subject;
            message.Body = new TextPart("html") { Text = body };

            using (var client = new SmtpClient())
            {
                client.ServerCertificateValidationCallback = (s, c, h, e) => true;

                await client.ConnectAsync(_setting.Server, _setting.Port, false);

                await client.AuthenticateAsync(_setting.Username, _setting.Password);
                await client.SendAsync(message);
                await client.DisconnectAsync(true);
            }
        }
    }
}