import { useFormik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { z } from 'zod'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/Textarea'

const schema = z.object({
  name: z.string("Name is required").min(1),
  nick: z
    .string("Nick is required")
    .min(1)
    .regex(/^[a-z0-9-]+$/, 'Nick may contain only lowercase letters, numbers and dashes'),
  description: z.string('Description is required').min(1),
  text: z.string('Text is required').min(100, 'Text should be at least 100 characters long'),
})

export const NewIdeaPage = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validationSchema: toFormikValidationSchema(schema), /* (values) => {
      const errors: Partial<typeof values> = {}

      if (!values.name) {
        errors.name = 'Name is required'
      }
      if (!values.nick) {
        errors.nick = 'Nick is required'
      } else if (!values.nick.match(/^[a-z0-9-]+$/)) {
        errors.nick = 'Nick may contain only lowercase letters, numbers and dashes'
      }
      if (!values.description) {
        errors.description = 'Description is required'
      }
      if (!values.text) {
        errors.text = 'Text is required'
      } else if (values.text.length < 100) {
        errors.text = 'Text must be at least 100 characters long'
      }

      return errors
    }, */
    onSubmit: (values) => {
      console.info('Submitted', values)
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
        <Input name="nick" label="Nick" type="text" formik={formik} />
        <Input name="description" label="Description" type="text" formik={formik} />
        <Textarea name="text" label="Text" formik={formik} />
        {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Some fields are invalid</div>}
        <button type="submit">Create Idea</button>
      </form>
    </Segment>
  )
}
