import { trpc } from '../../lib/trpc'
import { canEditIdea } from '../../utils/can'
import { zUpdateIdeaTrpcInput } from './input'

export const updateIdeaTrpcRoute = trpc.procedure.input(zUpdateIdeaTrpcInput).mutation(async ({ ctx, input }) => {
  const { ideaId, ...ideaInput } = input
  if (!ctx.me) {
    throw new Error('Not authorize')
  }
  const idea = await ctx.prisma.idea.findUnique({
    where: {
      id: ideaId,
    },
  })

  if (!idea) {
    throw new Error('Not found')
  }
  if (!canEditIdea(ctx.me, idea)) {
    throw new Error('Not your idea')
  }

  if (idea.ideaNick != input.ideaNick) {
    const exIdea = await ctx.prisma.idea.findUnique({
      where: {
        ideaNick: input.ideaNick,
      },
    })
    if (exIdea) {
      throw new Error('Idea with this nick already exists')
    }
  }
  await ctx.prisma.idea.update({
    where: {
      id: ideaId,
    },
    data: {
      ...ideaInput,
    },
  })
  return true
})
