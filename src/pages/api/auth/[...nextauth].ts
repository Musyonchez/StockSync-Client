import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { JWT } from "next-auth/jwt";

const client = new ApolloClient({
  uri: "https://stocksync-server.onrender.com/graphql/",
  cache: new InMemoryCache(),
});

interface AuthCredentials {
  email: string;
  password: string;
  company: string;
}

interface SessionConfig {
  strategy: "jwt";
  maxAge: number;
}

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  } as SessionConfig,
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
        company: {
          label: "Company",
          type: "text",
          placeholder: "Enter your Company name",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials: AuthCredentials | undefined, req: any) {
        if (!credentials) {
          return Promise.resolve(null);
        }

        const res = await client.query({
          query: gql`
            query AuthenticateUser(
              $email: String!
              $password: String!
              $company: String!
            ) {
              authenticateUser(
                email: $email
                password: $password
                company: $company
              ) {
                id
                firstName
                lastName
                store1
                store2
                store3
                store4
                company
                role
              }
            }
          `,
          variables: {
            email: credentials.email,
            password: credentials.password,
            company: credentials.company,
          },
        });

        const user = res.data.authenticateUser;
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: Record<string, any> }) {
      if (user) {
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.store1 = user.store1;
        token.store2 = user.store2;
        token.store3 = user.store3;
        token.store4 = user.store4;
        token.company = user.company;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (token) {
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.id = token.id;
        session.user.accessToken = token.accessToken;
        session.user.store1 = token.store1;
        session.user.store2 = token.store2;
        session.user.store3 = token.store3;
        session.user.store4 = token.store4;
        session.user.company = token.company;
        session.user.role = token.role;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
