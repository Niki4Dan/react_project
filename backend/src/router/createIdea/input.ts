import { z } from 'zod'

export const schema = z.object({
  name: z.string('Name is required').min(1),
  ideaNick: z
    .string('Nick is required')
    .min(1)
    .regex(/^[a-z0-9-]+$/, 'Nick may contain only lowercase letters, numbers and dashes'),
  description: z.string('Description is required').min(1),
  text: z.string('Text is required').min(100, 'Text should be at least 100 characters long'),
})
