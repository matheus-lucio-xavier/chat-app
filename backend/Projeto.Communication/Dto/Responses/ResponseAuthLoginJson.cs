using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Projeto.Communication.Dto.Responses
{
    public class ResponseAuthLoginJson
    {
        public string Token { get; set; } = string.Empty;
        public string ExpiresIn { get; set; } = string.Empty;
        public ResponseUserJson Usuario { get; set; } = new();
    }
}