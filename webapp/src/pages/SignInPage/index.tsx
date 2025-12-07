import { zSignInTrpcInput } from '@project/backend/src/router/signIn/input'
import { useFormik } from 'formik'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { getAllIdeasRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'


export const SignInPage = () => {
  const navigate = useNavigate()
  const [submittingError, setSubmittingError] = useState<string | null>(null)
  const signIn = trpc.signIn.useMutation()
  const formik = useFormik({
    initialValues: {
      nick: '',
      password: '',
    },
    validationSchema: toFormikValidationSchema(zSignInTrpcInput),
    onSubmit: async (values) => {
      try {
        setSubmittingError(null)
        const token = await signIn.mutateAsync(values)
        Cookies.set('token', token, { expires: 99999 })
        navigate(getAllIdeasRoute())
        
      } catch (error: any) {
        setSubmittingError(error.message)
        setTimeout(() => {
          setSubmittingError(null)
        }, 3000)
      }
    },
  })

  return (
    <Segment title="Sign In">
      <form onSubmit={formik.handleSubmit}>
        <Input name="nick" label="Nick" type="text" formik={formik} />
        <Input name="password" label="Password" type="password" formik={formik} />
        {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Some fields are invalid</div>}
        {!!submittingError && <Alert color="red">{submittingError}</Alert>}
        <Button loading={formik.isSubmitting}>Sign Up</Button>
      </form>
    </Segment>
  )
}
