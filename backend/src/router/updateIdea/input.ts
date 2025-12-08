import { z } from 'zod'
import { schema } from '../createIdea/input'

export const zUpdateIdeaTrpcInput = schema.extend({
  ideaId: z.string().min(1),
})
