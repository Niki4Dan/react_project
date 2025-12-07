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
/* export const getAllIdeasRoute = () => '/'
export const getViewIdeaRoute = ({ ideaNick}: {ideaNick: string}) => `/ideas/${ideaNick}` */