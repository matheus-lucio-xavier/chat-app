using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Projeto.Application.Services.Conversa;
using Projeto.Communication.Dto.Requests;

namespace Projeto.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ConversaController : ControllerBase
    {
        private readonly IConversaService _service;

        public ConversaController(IConversaService service)
        {
            _service = service;
        }

        [HttpGet("conversas")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetConversa()
        {
            var response = await _service.Consultar();
            return Ok(response);
        }

        [HttpGet("conversas/{conversaId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetConversaId(Guid conversaId)
        {
            var response = await _service.ConsultarId(conversaId);
            if (response.Success)
                return StatusCode(response.StatusCode, response.Data);

            return StatusCode(response.StatusCode, response.Message);
        }

        [HttpGet("conversas/{conversaId}/mensagens")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetConversaMensagens(Guid conversaId)
        {
            var userLogadoId = GetUserId();

            var response = await _service.ConsultarMensagens(userLogadoId, conversaId);
            if (response.Success)
                return StatusCode(response.StatusCode, response.Data);

            return StatusCode(response.StatusCode, response.Message);
        }

        [HttpGet("conversas/{conversaId}/membros")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetConversaMembros(Guid conversaId)
        {
            var userLogadoId = GetUserId();

            var response = await _service.ConsultarMembros(userLogadoId, conversaId);
            if (response.Success)
                return StatusCode(response.StatusCode, response.Data);

            return StatusCode(response.StatusCode, response.Message);
        }

        [HttpPost("conversas-privado")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> PostConversaPrivado([FromQuery] Guid userId, [FromBody] RequestConversaRegisterJson conversa)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userLogadoId = GetUserId();

            var response = await _service.CadastrarPrivado(userLogadoId, userId, conversa);
            if (response.Success)
                return StatusCode(response.StatusCode, response.Data);

            return StatusCode(response.StatusCode, response.Message);
        }

        [HttpPost("conversas-grupo")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> PostConversaGrupo([FromBody] RequestConversaRegisterJson conversa)
        // RequestConversaRegisterJson em vez de conversaModel
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userLogadoId = GetUserId();

            var response = await _service.CadastrarGrupo(userLogadoId, conversa);
            if (response.Success)
                return StatusCode(response.StatusCode, response.Data);

            return StatusCode(response.StatusCode, response.Message);
        }

        [HttpPost("conversas/{conversaId}/adcinar-membro")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AdcionarMembro(Guid conversaId, Guid userId)
        // RequestConversaRegisterJson em vez de conversaModel
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userLogadoId = GetUserId();

            var response = await _service.AdcionarMembro(userLogadoId, conversaId, userId);
            if (response.Success)
                return StatusCode(response.StatusCode, response.Data);

            return StatusCode(response.StatusCode, response.Message);
        }

        [HttpPost("conversas/{conversaId}/adcinar-mensagem")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AdcionarMensagem(Guid conversaId, RequestMensagemRegisterJson mensagem)
        // RequestConversaRegisterJson em vez de conversaModel
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = GetUserId();

            var response = await _service.adcionarMensagem(conversaId, userId, mensagem);
            if (response.Success)
                return StatusCode(response.StatusCode, response.Data);

            return StatusCode(response.StatusCode, response.Message);
        }

        [HttpDelete("conversas/{conversaId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Deleteconversa(Guid conversaId)
        {
            var response = await _service.Deletar(conversaId);
            if (response.Success)
                return StatusCode(response.StatusCode, response.Data);

            return StatusCode(response.StatusCode, response.Message);
        }

        private Guid GetUserId()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                throw new UnauthorizedAccessException("Usuário não autenticado");

            if (!Guid.TryParse(userId, out var id))
                throw new Exception("Id do usuário inválido no token");

            return id;
        }
    }
}