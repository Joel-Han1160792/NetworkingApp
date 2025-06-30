import type {JwtPayload} from '../types/jwt';   // JWT payload type (raw fields from token)
import type { User } from '../types/user'; 

// Utility: Convert JwtPayload to your app's User type
export default function mapJwtPayloadToUser(jwt: JwtPayload): User {
  return {
    id: jwt.sub,
    name: jwt.displayName ?? "User",
    email: jwt.email,
    // Use an avatar generator if no avatarUrl, or set undefined
    avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(jwt.name ?? "User")}`,
    // You can add more fields if needed
  };
}