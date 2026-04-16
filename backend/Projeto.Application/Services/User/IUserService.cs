using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Projeto.Communication.Dto.Requests;
using Projeto.Communication.Dto.Responses;
using Projeto.Domain.Entities;

namespace Projeto.Application.Services.User
{
    public interface IUserService
    {
        Task<List<UserModel>> Consultar();
        Task<ServiceResponse<List<ResponseConversaJson>>> ConsultarConversas(Guid userLogadoId);

        // Nullable pois o usuário pode não ser encontrado
        Task<ServiceResponse<UserModel>> ConsultarId(Guid id);

        Task<ServiceResponse<ResponseUserJson>> Cadastrar(RequestUserRegisterJson user);
        Task<ServiceResponse<ResponseUserJson>> Editar(RequestUserRegisterJson user);

        // Nullable pois retorna null se o usuário não existir
        Task<ServiceResponse<ResponseUserJson>> Deletar(Guid id);
    }
}