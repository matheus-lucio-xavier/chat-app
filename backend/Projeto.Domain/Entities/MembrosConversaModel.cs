using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Projeto.Domain.Entities
{
    public class MembrosConversaModel
    {
        public Guid Id { get; set; }
	
        public Guid ConversaId { get; set; }
        public ConversaModel Conversa { get; set; } = null!;
        public Guid UserId { get; set; }
        public UserModel User { get; set; } = null!;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow; 

    }
}