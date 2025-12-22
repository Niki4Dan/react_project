import { zSignUpTrpcInput } from '@project/backend/src/router/signUp/input'
import Cookies from 'js-cookie'

import { z } from 'zod'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { useForm } from '../../lib/form'
import { withPageWrapper } from '../../lib/pageWrapper'

import { trpc } from '../../lib/trpc'

export const SignUpPage = withPageWrapper({
  redirectAuthorized: true,
    title: 'SignUp - ideanick',
})(() => {

  const trpcUtils = trpc.useUtils()
  const signUp = trpc.signUp.useMutation()
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      nick: '',
      password: '',
      passwordAgain: '',
    },
    validationSchema: zSignUpTrpcInput.extend({ passwordAgain: z.string().min(1) }).superRefine((val, ctx) => {
      if (val.password != val.passwordAgain) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Password must be the same',
          path: ['passwordAgain'],
        })
      }
    }),
    onSubmit: async (values) => {
      const { token } = await signUp.mutateAsync(values)
      Cookies.set('token', token, { expires: 9999999 })
      void trpcUtils.invalidate()

    },
  })

  return (
    <Segment title="Sign Up">
      <form onSubmit={formik.handleSubmit}>
        <Input name="nick" label="Nick" type="text" formik={formik} />
        <Input name="password" label="Password" type="password" formik={formik} />
        <Input name="passwordAgain" label="Password again" type="password" formik={formik} />
        <Alert {...alertProps} />
        <Button {...buttonProps}>Sign Up</Button>
      </form>
    </Segment>
  )
})
