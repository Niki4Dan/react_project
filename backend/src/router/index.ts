import { trpc } from '../lib/trpc'
import { getIdeaTrpcRoute } from './getIdea'
import { getIdeasTrcpRoute } from './getIdeas'

export const trpcRouter = trpc.router({
  getIdea: getIdeaTrpcRoute,
  getIdeasTrcpRoute: getIdeasTrcpRoute,
})

export type TrpcRouter = typeof trpcRouter
