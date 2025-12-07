import { zSignInTrpcInput } from '@project/backend/src/router/signIn/input'
import { useFormik } from 'formik'
import { useState } from 'react'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { trpc } from '../../lib/trpc'



export const SignInPage = () => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false)
  const [welcomeMessage, setWelcomeMessage] = useState<string | null>(null)
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
        await signIn.mutateAsync(values)

        formik.resetForm()
        setSuccessMessageVisible(true)
        setWelcomeMessage(values.nick)
        setTimeout(() => {
          setSuccessMessageVisible(false)
        }, 3000)
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
        {successMessageVisible && <Alert color="green">Welcome, {welcomeMessage}!</Alert>}
        {!!submittingError && <Alert color="red">{submittingError}</Alert>}
        <Button loading={formik.isSubmitting} >Sign Up</Button>
      </form>
    </Segment>
  )
}
