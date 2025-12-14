const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>
}
 
export const getAllIdeasRoute = () => '/'
 
export const viewIdeaRouteParams = getRouteParams({ ideaNick: true })
export type ViewIdeaRouteParams = typeof viewIdeaRouteParams
export const getViewIdeaRoute = ({ ideaNick }: ViewIdeaRouteParams) => `/ideas/${ideaNick}`

export const getViewNewIdeaPageRoute = () => '/ideas/new'

export const getSignUpPageRoute = () => '/sign-up'

export const getSignInPageRoute = () => '/sign-in'

export const getSignOutPageRoute = () => '/sign-out'

export const editIdeaRouteParams = getRouteParams({ ideaNick: true })
export type EditIdeaRouteParams = typeof editIdeaRouteParams
export const getEditIdeaPageRoute = ({ ideaNick }: EditIdeaRouteParams) => `/ideas/${ideaNick}/edit`

/* export const getAllIdeasRoute = () => '/'
export const getViewIdeaRoute = ({ ideaNick}: {ideaNick: string}) => `/ideas/${ideaNick}` */