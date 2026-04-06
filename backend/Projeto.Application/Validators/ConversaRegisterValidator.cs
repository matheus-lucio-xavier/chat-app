using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using Projeto.Communication.Dto.Requests;

namespace Projeto.Application.Validators
{
    public class ConversaRegisterValidator : AbstractValidator<RequestConversaRegisterJson>
    {
        public ConversaRegisterValidator()
        {
            RuleFor(x => x.Nome)
                .NotEmpty().WithMessage("Nome é obrigatorio")
                .MaximumLength(100);
        }
    }
}