import { zSignUpTrpcInput } from '@project/backend/src/router/signUp/input'
import { useFormik } from 'formik'
import { useState } from 'react'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { trpc } from '../../lib/trpc'



export const SignUpPage = () => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false)
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
        await signUp.mutateAsync(values)
        formik.resetForm()
        setSuccessMessageVisible(true)
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
    <Segment title="Sign Up">
      <form onSubmit={formik.handleSubmit}>
        <Input name="nick" label="Nick" type="text" formik={formik} />
        <Input name="password" label="Password" type="password" formik={formik} />
        <Input name="passwordAgain" label="Password again" type="password" formik={formik} />
        {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Some fields are invalid</div>}
        {successMessageVisible && <Alert color="green">Thanks for sign up!</Alert>}
        {!!submittingError && <Alert color="red">{submittingError}</Alert>}
        <Button loading={formik.isSubmitting} >Sign Up</Button>
      </form>
    </Segment>
  )
}
