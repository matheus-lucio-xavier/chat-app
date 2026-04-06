using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Projeto.Communication.Enum;

namespace Projeto.Communication.Dto.Requests
{
    public class RequestMensagemRegisterJson
    {
        public Guid Id { get; set; }
        public MensagemTypeEnum Type { get; set; }
        public required string Content { get; set; }
    }
}