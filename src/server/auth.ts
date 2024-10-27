import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./zod";
import { getUserFromDb } from "@/server/action";
import { type User } from "@/types/user";
import { ZodError } from "zod";

class customError extends AuthError {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials): Promise<User | null> => {
        try {
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          const user = await getUserFromDb(email, password);

          if (!user) {
            throw new customError(
              "The email or password you entered is incorrect"
            );
          }

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password: _, ...userWithoutPassword } = user;
          return userWithoutPassword;
        } catch (error) {
          if (error instanceof ZodError) {
            throw new customError(
              "Looks like there's an issue with your input. Please check again!."
            );
          } else {
            throw new customError(
              "The email or password you entered is incorrect"
            );
          }
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (token && token.sub) {
        session.user.id = token.sub; 
      }
      return session; 
    },
    jwt: async ({ token, user }) => {
      
      if (user) {
        token.sub = user.id; 
      }
      return token; 
    },
  },
  pages: {
    signIn: "/signin",
  },
});
