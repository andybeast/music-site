import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import clientPromise from '@/src/lib/mongodb';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db();
        const user = await db.collection('users').findOne({ email: credentials.email });

        if (user && (await compare(credentials.password, user.password))) {
          return { id: user._id.toString(), email: user.email, isVerified: user.isVerified };
        } else {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isVerified = user.isVerified;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.isVerified = token.isVerified;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});

