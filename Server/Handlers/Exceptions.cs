using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Handlers
{
    public class NotFoundException : Exception
{
    public NotFoundException(string message) : base(message) { }
}

public class ConflictException : Exception
{
    public ConflictException(string message) : base(message) { }
}

public class AuthenticationFailedException : Exception
{
    public AuthenticationFailedException(string message) : base(message) { }
}

}