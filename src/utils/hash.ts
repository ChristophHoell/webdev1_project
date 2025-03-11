import bcrypt from 'bcryptjs';

export default function hashString(
  stringToHash: string,
  salt?: string
): string {
  const saltToUse = salt || bcrypt.genSaltSync(10);
  return bcrypt.hashSync(stringToHash, saltToUse);
}

export async function compareHashedString(
  plainText: string,
  hashedString: string
): Promise<boolean> {
  return await bcrypt.compare(plainText, hashedString);
}

export function compareHashedStringSync(
  plainText: string,
  hashedString: string
): boolean {
  return bcrypt.compareSync(plainText, hashedString);
}
