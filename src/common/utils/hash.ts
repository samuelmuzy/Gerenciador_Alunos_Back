import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export async function comparePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}


export function hashTokenInvite(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}