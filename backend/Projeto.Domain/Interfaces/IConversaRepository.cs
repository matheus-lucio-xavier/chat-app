using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Projeto.Domain.Entities;

namespace Projeto.Domain.Interfaces
{
    public interface IConversaRepository : IRepository
    {
        IQueryable<MensagemModel> ConsultarMensagens(Guid id);
        IQueryable<UserModel> ConsultarMembros(Guid id);
        Task<bool> UserPresente(Guid userId, Guid conversaId);
    }
}