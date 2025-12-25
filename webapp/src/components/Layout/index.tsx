import { createRef } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Logo from '../../assets/images/test_logo.svg?react'
import { useMe } from '../../lib/ctx'
import * as routes from '../../lib/routes'
import css from './index.module.scss'


export const layoutContentElRef = createRef<HTMLDivElement>()

export const Layout = () => {
  const me = useMe()
  return (
    <div className={css.layout}>
      <div className={css.navigation}>
        <Logo className={css.logo}></Logo>
        <ul className={css.menu}>
          <li className={css.item}>
            <Link className={css.link} to={routes.getAllIdeasRoute()}>
              All Ideas
            </Link>
          </li>
          {}
          {me ? (
            <>
              <li className={css.item}>
                <Link className={css.link} to={routes.getNewIdeaRoute()}>
                  Add idea
                </Link>
              </li>

              <li className={css.item}>
                <Link className={css.link} to={routes.getEditProfileRoute()}>
                  Edit Profile
                </Link>
              </li>

              <li className={css.item}>
                <Link className={css.link} to={routes.getSignOutRoute()}>
                  {}
                  Log Out ({me.nick})
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className={css.item}>
                <Link className={css.link} to={routes.getSignUpRoute()}>
                  Sign Up
                </Link>
              </li>

              <li className={css.item}>
                <Link className={css.link} to={routes.getSignInRoute()}>
                  Sign In
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className={css.content} ref={layoutContentElRef}>
        <Outlet />
      </div>
    </div>
  )
}
