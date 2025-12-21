import type { Idea, User, UserPermissons } from '@prisma/client'

type MaybeUser = Pick<User, 'permissions' | 'id'> | null
type MaybeIdea = Pick<Idea, 'authorId'> | null

const hasPermissions = (user: MaybeUser, permission: UserPermissons) => {
  return user?.permissions.includes(permission) || user?.permissions.includes('ALL') || false
}

export const canBlockIdeas = (user: MaybeUser) => {
  return hasPermissions(user, 'BLOCK_IDEAS')
}

export const canEditIdea = (user: MaybeUser, idea: MaybeIdea) => {
  return !!user && !!idea && user?.id === idea?.authorId
}
