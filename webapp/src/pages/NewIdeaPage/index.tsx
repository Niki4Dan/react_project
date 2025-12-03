import { schema } from '@project/backend/src/router/createIdea/input'
import { useFormik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/Textarea'
import { trpc } from '../../lib/trpc'

export const NewIdeaPage = () => {

  const createIdea = trpc.createIdea.useMutation()
  const formik = useFormik({
    initialValues: {
      name: '',
      ideaNick: '',
      description: '',
      text: '',
    },
    validationSchema: toFormikValidationSchema(schema),
    onSubmit: async (values) => {
      await createIdea.mutateAsync(values)
    },
  })

  return (
    <Segment title="New Idea">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <Input name="name" label="Name" type="text" formik={formik} />
        <Input name="ideaNick" label="Nick" type="text" formik={formik} />
        <Input name="description" label="Description" type="text" formik={formik} />
        <Textarea name="text" label="Text" formik={formik} />
        {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Some fields are invalid</div>}
        <button type="submit">Create Idea</button>
      </form>
    </Segment>
  )
}
