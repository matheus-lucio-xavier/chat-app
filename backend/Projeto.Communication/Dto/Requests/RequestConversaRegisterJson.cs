using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Projeto.Communication.Enum;

namespace Projeto.Communication.Dto.Requests
{
    public class RequestConversaRegisterJson
    {
        public Guid Id { get; set; }
        public required string Nome { get; set; }
    }
}