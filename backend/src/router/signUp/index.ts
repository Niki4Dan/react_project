import crypto from 'crypto'
import { trpc } from '../../lib/trpc'
import { schema } from './input'

export const createIdeaTrpcRoute = trpc.procedure.input(schema).mutation(async ({ ctx, input }) => {
  const exidea = await ctx.prisma.user.findUnique({
    where: {
      nick: input.nick,
    },
  })

  if (exidea) {
    throw Error('Idea with this nick already exists')
  }

  await ctx.prisma.user.create({
    data: {
      nick: input.nick,
      password: crypto.createHash('sha256').update(input.password).digest('hex'),
    },
  })

  return true
})
