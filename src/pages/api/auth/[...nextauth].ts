// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { JWT } from "next-auth/jwt";


// Initialize Apollo Client
const client = new ApolloClient({
  // uri: process.env.SERVER_PUBLIC_URL || "http://localhost:5000/graphql",
  uri: 'https://stocksync-server.onrender.com/graphql',
  cache: new InMemoryCache(),
});

interface AuthCredentials {
  email: string;
  password: string;
  company: string;
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
        company: {
          label: "Company",
          type: "text",
          placeholder: "Enter your Company name",
        },
      },
      async authorize(credentials: AuthCredentials | undefined, req: any) {
        if (!credentials) {
          return null;
        }

        try {
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
                  firstsignin
                  companyLogo
                  imageURL
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
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: Record<string, any> }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;
        token.password = user.password;
        token.store1 = user.store1;
        token.store2 = user.store2;
        token.store3 = user.store3;
        token.store4 = user.store4;
        token.company = user.company;
        token.role = user.role;
        token.firstsignin = user.firstsignin;
        token.companyLogo = user.companyLogo;
        token.imageURL = user.imageURL;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      session.user.id = token.id;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.email = token.email;
      session.user.password = token.password;
      session.user.store1 = token.store1;
      session.user.store2 = token.store2;
      session.user.store3 = token.store3;
      session.user.store4 = token.store4;
      session.user.company = token.company;
      session.user.role = token.role;
      session.user.firstsignin = token.firstsignin;
      session.user.companyLogo = token.companyLogo;
      session.user.imageURL = token.imageURL;
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
});
