using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using Projeto.Communication.Dto.Requests;

namespace Projeto.Application.Validators
{
    public class MensagemRegisterValidator : AbstractValidator<RequestMensagemRegisterJson>
    {
        public MensagemRegisterValidator()
        {
            RuleFor(x => x.Content)
                .NotEmpty().WithMessage("Conteudo é obrigatorio");
        }
    }
}