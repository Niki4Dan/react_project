import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AppContextProvider } from './lib/ctx'
import * as router from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { AllIdeasPage } from './pages/AllIdeasPage'
import { EditIdeaPage } from './pages/EditIdeaPage'
import { NewIdeaPage } from './pages/NewIdeaPage'
import { SignInPage } from './pages/SignInPage'
import { SignOutPage } from './pages/SignOutPage'
import { SignUpPage } from './pages/SignUpPage'
import { ViewIdeaPage } from './pages/ViewIdeaPage'
import './styles/global.scss'

export const App = () => {
  return (
    <TrpcProvider>
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path={router.getSignOutPageRoute()} element={<SignOutPage />} />
            <Route element={<Layout />}>
              <Route path={router.getSignInPageRoute()} element={<SignInPage />} />
              <Route path={router.getSignUpPageRoute()} element={<SignUpPage />} />
              <Route path={router.getAllIdeasRoute()} element={<AllIdeasPage />} />
              <Route path={router.getViewNewIdeaPageRoute()} element={<NewIdeaPage />} />
              <Route path={router.getViewIdeaRoute(router.viewIdeaRouteParams)} element={<ViewIdeaPage />} />
              <Route path={router.getEditIdeaPageRoute(router.editIdeaRouteParams)} element={<EditIdeaPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </TrpcProvider>
  )
}
