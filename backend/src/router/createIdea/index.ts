import { ideas } from '../../lib/ideas'
import { trpc } from '../../lib/trpc'
import { schema } from './input'

export const createIdeaTrpcRoute = trpc.procedure.input(schema).mutation(({ input }) => {
  if (ideas.find((idea) => idea.ideaNick === input.ideaNick)) {
    throw Error('Idea with this nick already exists')
  }
  ideas.unshift(input)
  return true
})
