import { z } from 'zod'

export const zBlockIdeaTRpcInput = z.object({
  ideaId: z.string().min(1),
})
