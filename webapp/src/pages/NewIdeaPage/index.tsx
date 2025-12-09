import { schema } from '@project/backend/src/router/createIdea/input'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/Textarea'
import { useForm } from '../../lib/form'
import { trpc } from '../../lib/trpc'

export const NewIdeaPage = () => {
  const createIdea = trpc.createIdea.useMutation()
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      name: '',
      ideaNick: '',
      description: '',
      text: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      await createIdea.mutateAsync(values)
      formik.resetForm()
    },
    successMessage: 'Idea created!',
    showValidationAlert: true,
  })

  return (
    <Segment title="New Idea">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <Input name="name" label="Name" type="text" formik={formik} maxWidth={'100'} />
        <Input name="ideaNick" label="Nick" type="text" formik={formik} />
        <Input name="description" label="Description" type="text" formik={formik} />
        <Textarea name="text" label="Text" formik={formik} />
        <Alert {...alertProps} />
        <Button {...buttonProps}>Create Idea</Button>
      </form>
    </Segment>
  )
}
