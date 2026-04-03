using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Projeto.Domain.Entities;

namespace Projeto.Domain.Interfaces
{
    public interface IAuthRepository : IRepository
    {
        Task<UserModel?> ConsultarUsuarioPorEmail(string email);
    }
}