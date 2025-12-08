import { zSignUpTrpcInput } from '@project/backend/src/router/signUp/input'
import { useFormik } from 'formik'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { getAllIdeasRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'





export const SignUpPage = () => {
  const navigate = useNavigate()
  const trpcUtils = trpc.useUtils()
  const [submittingError, setSubmittingError] = useState<string | null>(null)
  const signUp = trpc.signUp.useMutation()
  const formik = useFormik({
    initialValues: {
        nick: '',
        password: '',
        passwordAgain: '',
    },
    validationSchema: toFormikValidationSchema(zSignUpTrpcInput
        .extend({ passwordAgain: z.string().min(1) })
        .superRefine((val, ctx) => {
            if (val.password != val.passwordAgain){
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Password must be the same',
                    path: ['passwordAgain'],
                })
            }
        })
    ),
    onSubmit: async (values) => {
      try {
        setSubmittingError(null)
        const { token } = await signUp.mutateAsync(values)
        Cookies.set('token', token, { expires: 9999999 })
        void trpcUtils.invalidate()
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
    <Segment title="Sign Up">
      <form onSubmit={formik.handleSubmit}>
        <Input name="nick" label="Nick" type="text" formik={formik} />
        <Input name="password" label="Password" type="password" formik={formik} />
        <Input name="passwordAgain" label="Password again" type="password" formik={formik} />
        {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Some fields are invalid</div>}
        {!!submittingError && <Alert color="red">{submittingError}</Alert>}
        <Button loading={formik.isSubmitting} >Sign Up</Button>
      </form>
    </Segment>
  )
}
