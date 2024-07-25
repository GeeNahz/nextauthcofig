import { ZodError } from 'zod'
import Credentials from 'next-auth/providers/credentials'
import { signInSchema } from "./lib/zod"

import type { NextAuthConfig, User } from 'next-auth'

const db_user = {
  id: '1',
  username: 'stanley',
  name: 'Stan Ley',
  password: '123456',
  email: 'stanley@gmail.com',
  image: '',
}

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        try {
          let user: User | null = null
          const { email, password } = await signInSchema.parseAsync(credentials)

          if (email !== db_user.email) {
            throw new Error('User details are invalid')
          }
          if (password !== db_user.password) {
            throw new Error('User details are invalid')
          }

          user = db_user

          return user
        } catch (error) {
          if (error instanceof ZodError) {
            return null
          }
        }
      },
    }),
  ]
} satisfies NextAuthConfig
