import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GoogleProvider from "next-auth/providers/google"
import { JWT } from "next-auth/jwt"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    callbacks: {
        async jwt({ token, account }: { token: JWT; account: any }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
        async session({ session, token }: { session: any; token: JWT }) {
            // Send properties to the client, like an access_token from a provider
            session.user.accessToken = token.accessToken
            return session
        },
    },
})