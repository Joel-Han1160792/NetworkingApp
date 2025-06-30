export type JwtPayload = {
  sub: string;          // user ID
  email: string;
  displayName?: string;

}