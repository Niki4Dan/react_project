import { trpc } from '../../lib/trpc'
import { getPasswordHash } from '../../utils/getPasswordHash'
import { zSignInTrpcInput } from './input'

export const signInTrpcRoute = trpc.procedure.input(zSignInTrpcInput).mutation(async ({ ctx, input }) => {
  const exnick = await ctx.prisma.user.findUnique({
    where: {
      nick: input.nick,
      password: getPasswordHash(input.password),
    },
  })

  if (!exnick) {
    throw Error('Wrong nick or password!')
  }

  return true
})
