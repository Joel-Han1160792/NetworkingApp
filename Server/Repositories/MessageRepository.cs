using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Repositories;

public class MessageRepository : IMessageRepository
{
    private readonly AppDbContext _context;
    public MessageRepository(AppDbContext context) => _context = context;

    public Task<Message?> GetByIdAsync(int id) => _context.Messages.FindAsync(id).AsTask();
    public async Task SaveAsync(Message message)
{
    await _context.Messages.AddAsync(message);
    await _context.SaveChangesAsync();
}

    public IQueryable<Message> Query() => _context.Messages.AsQueryable();
}
