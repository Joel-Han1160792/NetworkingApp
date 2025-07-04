using Server.Models;

namespace Server.Repositories;

public interface IMessageRepository
{
    Task<Message?> GetByIdAsync(int id);
    Task SaveAsync(Message message);
    IQueryable<Message> Query();
}
