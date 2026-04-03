namespace Projeto.Domain.Entities
{
    public class UserModel
    {
        public Guid Id { get; set; }
        public string Nome { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;
        public bool Active { get; set; }
    }
}