using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using Projeto.Communication.Dto.Requests;

namespace Projeto.Application.Validators
{
    public class AuthRegisterValidator : AbstractValidator<RequestAuthRegisterJson>
    {
        public AuthRegisterValidator()
        {
            RuleFor(x => x.Nome)
                .NotEmpty().WithMessage("Nome é obrigatorio")
                .MaximumLength(100);
                
            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email é obrigatorio")
                .EmailAddress().WithMessage("Email invalido");

            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Senha é obrigatoria")
                .MinimumLength(6).WithMessage("senha deve ter no minimo 6 caracteres");
        }
    }
}