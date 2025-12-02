import _ from 'lodash'
import { ideas } from '../../lib/ideas'
import { trpc } from '../../lib/trpc'

export const getIdeasTrcpRoute = trpc.procedure.query(() => {
  return { ideas: ideas.map((idea) => _.pick(idea, ['ideaNick', 'name', 'description'])) }
})
