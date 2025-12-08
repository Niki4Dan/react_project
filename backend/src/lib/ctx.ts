import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import { env } from './env'

const adapter = new PrismaPg({
  connectionString: env.DATABASE_URL,
})

export const createAppContext = () => {
  const prisma = new PrismaClient({
    adapter,
  })

  return {
    prisma,
    stop: async () => {
      await prisma.$disconnect()
    },
  }
}

export type AppContext = ReturnType<typeof createAppContext>
