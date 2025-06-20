using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Repositories;

public class ConnectionRepository : IConnectionRepository
{
    private readonly AppDbContext _context;
    public ConnectionRepository(AppDbContext context) => _context = context;

    public Task<Connection?> GetByIdAsync(int id) => _context.Connections.FindAsync(id).AsTask();
    public async Task AddAsync(Connection connection) => await _context.Connections.AddAsync(connection);
    public Task UpdateAsync(Connection connection)
    {
        _context.Connections.Update(connection);
        return Task.CompletedTask;
    }
    public Task SaveChangesAsync() => _context.SaveChangesAsync();
    public IQueryable<Connection> Query() => _context.Connections.AsQueryable();
}
