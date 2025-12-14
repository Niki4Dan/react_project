import { zSignInTrpcInput } from '@project/backend/src/router/signIn/input'
import Cookies from 'js-cookie'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { useForm } from '../../lib/form'
import { withPageWrapper } from '../../lib/pageWrapper'

import { trpc } from '../../lib/trpc'

export const SignInPage = withPageWrapper({
  redirectAuthorized: true,
})(() => {

  const trpcUtils = trpc.useUtils()
  const signIn = trpc.signIn.useMutation()
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      nick: '',
      password: '',
    },
    validationSchema: zSignInTrpcInput,
    onSubmit: async (values) => {
      const { token } = await signIn.mutateAsync(values)
      Cookies.set('token', token, { expires: 99999 })
      void trpcUtils.invalidate()

    },
  })

  return (
    <Segment title="Sign In">
      <form onSubmit={formik.handleSubmit}>
        <Input name="nick" label="Nick" type="text" formik={formik} />
        <Input name="password" label="Password" type="password" formik={formik} />
        <Alert {...alertProps} />
        <Button {...buttonProps}>Sign In</Button>
      </form>
    </Segment>
  )
})
