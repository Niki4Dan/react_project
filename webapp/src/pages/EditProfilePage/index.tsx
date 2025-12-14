import type { TrpcRouterOutput } from '@project/backend/src/router'
import { zUpdatePasswordTrpcInput } from '@project/backend/src/router/updatePassword/input'
import { zUpdateProfileTrpcInput } from '@project/backend/src/router/updateProfile/input'
import z from 'zod'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { useForm } from '../../lib/form'
import { withPageWrapper } from '../../lib/pageWrapper'
import { trpc } from '../../lib/trpc'

const General = ({ me }: { me: NonNullable<TrpcRouterOutput['getMe']['me']> }) => {
  const trpcUtils = trpc.useUtils()
  const updateProfile = trpc.updateProfile.useMutation()
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      nick: me.nick,
      name: me.name,
    },
    validationSchema: zUpdateProfileTrpcInput,
    onSubmit: async (values) => {
      const updatedMe = await updateProfile.mutateAsync(values)
      trpcUtils.getMe.setData(undefined, { me: updatedMe })
    },
    successMessage: 'Profile updated',
    resetOnSuccess: false,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Input label="Nick" type="text" name="nick" formik={formik} />
      <Input label="Name" type="text" name="name" formik={formik} />
      <Alert {...alertProps} />
      <Button {...buttonProps}>Update Profile</Button>
    </form>
  )
}


const Password = () => {
  const updatePassword = trpc.updatePassword.useMutation()
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordAgain: '',
    },
    validationSchema: zUpdatePasswordTrpcInput
      .extend({
        newPasswordAgain: z.string().min(1),
      })
      .superRefine((val, ctx) => {
        if (val.newPassword !== val.newPasswordAgain) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Passwords must be the same',
            path: ['newPasswordAgain'],
          })
        }
      }),
    onSubmit: async ({ newPassword, oldPassword }) => {
      await updatePassword.mutateAsync({ newPassword, oldPassword })
    },
    successMessage: 'Password updated',
  })

  return (
    <form onSubmit={formik.handleSubmit}>
        <Input label="Old password" name="oldPassword" type="password" formik={formik} />
        <Input label="New password" name="newPassword" type="password" formik={formik} />
        <Input label="New password again" name="newPasswordAgain" type="password" formik={formik} />
        <Alert {...alertProps} />
        <Button {...buttonProps}>Update Password</Button>
    </form>
  )
}

export const EditProfilePage = withPageWrapper({
  authorizedOnly: true,
  setProps: ({ ctx }) => ({
    me: ctx.me!,
  }),
})(({ me }) => {
  return (
    <>
      <Segment title="Edit Profile">
        <Segment title="General" size={2}><General me={me}/></Segment>
        <Segment title="Password" size={2}><Password /></Segment>
      </Segment>
    </>
  )
})
