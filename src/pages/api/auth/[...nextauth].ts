import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, session }: any) {
      if (account?.provider === "github") {
        const payload = {
          user: { username: profile.login, ...user },
          provider: account.provider,
        }

        const res = await fetch(`http://localhost:3000/api/v1/auth/github`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })
        const data = await res.json()

        if (!data) {
          return false
        }

        account.accessToken = data.access_token
        return true
      }
    },
    // async redirect({url, baseUrl}: any) {
    //   return baseUrl
    // },
    async session({session, token, user}: any) {
      session.accessToken = token.accessToken
      return session
    },
    async jwt({ token, account, user }: any) {
      if (user) {
        token.accessToken = account.accessToken
      }
      return token
    }
  },
}

export default NextAuth(authOptions)