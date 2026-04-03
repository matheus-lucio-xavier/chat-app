using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Projeto.Domain.Interfaces;
using Projeto.Infrastructure.Data;

namespace Projeto.Infrastructure.Repository
{
    public class Repository : IRepository
    {
        protected readonly AppDbContext _appDbContext;

        public Repository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public IQueryable<T> Consultar<T>() where T : class
        {
            return _appDbContext.Set<T>().AsQueryable();
        }

        public async Task<T?> ConsultarPorId<T>(Guid id) where T : class
        {
            return await _appDbContext.Set<T>().FindAsync(id);
        }

        public async Task<bool> Cadastrar<T>(T model) where T : class
        {
            await _appDbContext.Set<T>().AddAsync(model);
            return true;
        }

        public async Task<bool> Editar<T>(T model) where T : class
        {

            var existe = await _appDbContext.Set<T>().FindAsync(
                _appDbContext.Entry(model).Property("Id").CurrentValue
            );

            if (existe == null)
                throw new Exception("Não encontrado");

            _appDbContext.Entry(existe).CurrentValues.SetValues(model);

            return true;
        }

        public bool Excluir<T>(T model) where T : class
        {
            _appDbContext.Set<T>().Remove(model);
            return true;
        }
    }
}