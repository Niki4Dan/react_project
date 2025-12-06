import { trpc } from '../../lib/trpc'
import { schema } from './input'

export const createIdeaTrpcRoute = trpc.procedure.input(schema).mutation(async ({ ctx, input }) => {
  const exidea = await ctx.prisma.idea.findUnique({
    where: {
      ideaNick: input.ideaNick,
    },
  })

  if (exidea) {
    throw Error('Idea with this nick already exists')
  }

  await ctx.prisma.idea.create({
    data: input,
  })

  return true
})
