using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Projeto.Communication.Enum;

namespace Projeto.Domain.Entities
{
    public class MensagemModel
    {
        public Guid Id { get; set; }

        public Guid OrigemId { get; set; }
        public UserModel Origem { get; set; } = null!;
        
        public Guid ConversaId { get; set; }
        public ConversaModel Conversa { get; set; } = null!;
        public MensagemTypeEnum Type { get; set; }
        public required string Content { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow; 
        public DateTime? EditedAt { get; set; } 

    }
}