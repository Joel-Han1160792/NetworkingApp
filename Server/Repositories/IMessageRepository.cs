using Server.Models;

namespace Server.Repositories;

public interface IMessageRepository
{
    Task<Message?> GetByIdAsync(int id);
    Task AddAsync(Message message);
    Task SaveChangesAsync();
    IQueryable<Message> Query();
}
