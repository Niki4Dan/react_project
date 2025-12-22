import { trpc } from '../../lib/trpc'
import { getPasswordHash } from '../../utils/getPasswordHash'
import { signJWT } from '../../utils/signJWT'
import { zSignUpTrpcInput } from './input'

export const signUpTrpcRoute = trpc.procedure.input(zSignUpTrpcInput).mutation(async ({ ctx, input }) => {
  const exnick = await ctx.prisma.user.findUnique({
    where: {
      nick: input.nick,
    },
  })

  if (exnick) {
    throw Error('This nick already exists')
  }

  const exemail = await ctx.prisma.user.findUnique({
    where: {
      email: input.email,
    },
  })

  if (exemail) {
    throw Error('This email already exists')
  }

  const user = await ctx.prisma.user.create({
    data: {
      nick: input.nick,
      email: input.email,
      password: getPasswordHash(input.password),
    },
  })

  const token = signJWT(user.id)

  return { token }
})
