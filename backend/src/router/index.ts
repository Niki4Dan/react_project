import { inferRouterOutputs } from '@trpc/server'
import { trpc } from '../lib/trpc'
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { blockIdeaTrpcRoute } from './blockIdea'
import { createIdeaTrpcRoute } from './createIdea'
import { getIdeaTrpcRoute } from './getIdea'
import { getIdeasTrpcRoute } from './getIdeas'
import { getMeTrpcRoute } from './getMe'
import { setIdeaLikeTrpcRoute } from './setIdeaLike'
import { signInTrpcRoute } from './signIn'
import { signUpTrpcRoute } from './signUp'
import { updateIdeaTrpcRoute } from './updateIdea'
import { updatePasswordTrpcRoute } from './updatePassword'
import { updateProfileTrpcRoute } from './updateProfile'
// @endindex

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  blockIdea: blockIdeaTrpcRoute,
  createIdea: createIdeaTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  getIdeas: getIdeasTrpcRoute,
  getMe: getMeTrpcRoute,
  setIdeaLike: setIdeaLikeTrpcRoute,
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
  updateIdea: updateIdeaTrpcRoute,
  updatePassword: updatePasswordTrpcRoute,
  updateProfile: updateProfileTrpcRoute,
  // @endindex
})

export type TrpcRouter = typeof trpcRouter
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>
export type TrpcRouterInput = inferRouterOutputs<TrpcRouter>
