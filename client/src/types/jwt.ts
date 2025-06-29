export default interface JwtPayload {
  sub: string;          // user ID
  email: string;
  displayName?: string;

}