namespace Server.DTOs;

public class ConnectionRequestDto
{
    public int ReceiverId { get; set; }
}

public class ConnectionResponseDto
{
    public int ConnectionId { get; set; }
    public bool Accept { get; set; }
}
