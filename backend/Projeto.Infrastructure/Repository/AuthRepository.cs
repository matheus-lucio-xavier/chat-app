using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Projeto.Domain.Entities;
using Projeto.Domain.Interfaces;
using Projeto.Infrastructure.Data;

namespace Projeto.Infrastructure.Repository
{
    public class AuthRepository : Repository, IAuthRepository
    {
        public AuthRepository(AppDbContext appDbContext) : base(appDbContext)
        {
        }
        public async Task<UserModel?> ConsultarUsuarioPorEmail(string email)
        {
            return await _appDbContext.Usuarios
                .FirstOrDefaultAsync(usuario => usuario.Email == email);
        }
        
    }
}