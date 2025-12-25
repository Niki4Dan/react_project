import { HeadProvider } from 'react-head'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AppContextProvider } from './lib/ctx'
import * as router from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { AllIdeasPage } from './pages/AllIdeasPage'
import { EditIdeaPage } from './pages/EditIdeaPage'
import { EditProfilePage } from './pages/EditProfilePage'
import { NewIdeaPage } from './pages/NewIdeaPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { SignInPage } from './pages/SignInPage'
import { SignOutPage } from './pages/SignOutPage'
import { SignUpPage } from './pages/SignUpPage'
import { ViewIdeaPage } from './pages/ViewIdeaPage'
import './styles/global.scss'

export const App = () => {
  return (
    <HeadProvider>
      <TrpcProvider>
        <AppContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path={router.getSignOutRoute.definition} element={<SignOutPage />} />
              <Route element={<Layout />}>
                <Route path={router.getSignUpRoute.definition} element={<SignUpPage />} />
                <Route path={router.getSignInRoute.definition} element={<SignInPage />} />
                <Route path={router.getEditProfileRoute.definition} element={<EditProfilePage />} />
                <Route path={router.getAllIdeasRoute.definition} element={<AllIdeasPage />} />
                <Route path={router.getViewIdeaRoute.definition} element={<ViewIdeaPage />} />
                <Route path={router.getEditIdeaRoute.definition} element={<EditIdeaPage />} />
                <Route path={router.getNewIdeaRoute.definition} element={<NewIdeaPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AppContextProvider>
      </TrpcProvider>
    </HeadProvider>
  )
}
