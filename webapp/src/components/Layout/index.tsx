import { Link, Outlet } from 'react-router-dom'
import * as routes from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'

export const Layout = () => {
  const { data, isLoading, isFetching, isError } = trpc.getMe.useQuery()
  return (
    <div className={css.layout}>
      <div className={css.navigation}>
        <div className={css.logo}>IdeaNick</div>
        <ul className={css.menu}>
          <li className={css.item}>
            <Link className={css.link} to={routes.getAllIdeasRoute()}>
              All Ideas
            </Link>
          </li>
          {/*eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
          {isLoading || isFetching || isError ? null : data.me ? (
            <>
              <li className={css.item}>
                <Link className={css.link} to={routes.getViewNewIdeaPageRoute()}>
                  Add idea
                </Link>
              </li>

              <li className={css.item}>
                <Link className={css.link} to={routes.getSignOutPageRoute()}>
                  {/*eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
                  Log Out ({data.me.nick})
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className={css.item}>
                <Link className={css.link} to={routes.getSignUpPageRoute()}>
                  Sign Up
                </Link>
              </li>

              <li className={css.item}>
                <Link className={css.link} to={routes.getSignInPageRoute()}>
                  Sign In
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className={css.content}>
        <Outlet />
      </div>
    </div>
  )
}
