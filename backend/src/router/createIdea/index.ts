import { ideas } from '../../lib/ideas'
import { trpc } from '../../lib/trpc'
import { schema } from './input'



export const createIdeaTrpcRoute = trpc.procedure.input(schema).mutation(({ input }) => {
  ideas.unshift(input)
  return true
})
