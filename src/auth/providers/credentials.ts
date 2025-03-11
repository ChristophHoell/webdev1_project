import { dbGetUserByEmailAndPassword } from '@/db/functions/user';
import Credentials from 'next-auth/providers/credentials';
import { credentialsSchema } from '../schema';

export const credentialsProvider = Credentials({
  id: "credentials",
  name: "credentials",
  credentials: {
    email: {},
    password: {},
  },
  authorize: async (credentials) => {
    const { email, password } = credentialsSchema.parse(credentials);

    const maybeUser = await dbGetUserByEmailAndPassword({
      email,
      password,
    });

    if ( maybeUser === undefined ) {
      return null;
    }

    const { passwordHash, ...obscuredUser } = maybeUser;
    return { ...obscuredUser, type: "credentials" };
  }
})