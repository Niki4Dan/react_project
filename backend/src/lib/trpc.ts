import { initTRPC } from '@trpc/server'
import { trpcRouter } from '../trpc'

export const trpc = initTRPC.create()

export type TrpcRouter = typeof trpcRouter
