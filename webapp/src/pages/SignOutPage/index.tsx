import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../../components/Loader'
import { getSignInPageRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

export const SignOutPage = () => {
  const navigate = useNavigate()
  const trpcUtils = trpc.useUtils()
  useEffect(() => {
    Cookies.remove('token')
    void trpcUtils.invalidate().then(() => {
      navigate(getSignInPageRoute())
    })
  }, [])

  return <Loader type="page" /> 
}