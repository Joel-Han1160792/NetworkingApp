using Server.Models;

namespace Server.Repositories;

public interface IConnectionRepository
{
    Task<Connection?> GetByIdAsync(int id);
    Task AddAsync(Connection connection);
    Task UpdateAsync(Connection connection);
    Task SaveChangesAsync();
    IQueryable<Connection> Query();
}
