using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Projeto.Communication.Dto.Requests;
using Projeto.Communication.Dto.Responses;

namespace Projeto.Application.Services.Auth
{
    public interface IAuthService
    {
        Task<ServiceResponse<ResponseAuthLoginJson>> Login(RequestAuthLoginJson auth);
        Task<ServiceResponse<ResponseAuthRegisterJson>> Register(RequestAuthRegisterJson request);
    }
}