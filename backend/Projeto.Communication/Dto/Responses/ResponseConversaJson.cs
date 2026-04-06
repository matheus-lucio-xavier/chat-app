using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Projeto.Communication.Enum;

namespace Projeto.Communication.Dto.Responses
{
    public class ResponseConversaJson
    {
        public Guid Id { get; set; }
        public ConversaTypeEnum Type { get; set; }	
        public required string Nome { get; set; }
    }
}