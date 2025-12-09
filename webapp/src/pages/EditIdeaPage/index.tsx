import type { TrpcRouterOutput } from '@project/backend/src/router'
import { zUpdateIdeaTrpcInput } from '@project/backend/src/router/updateIdea/input'
import { useFormik } from 'formik'
import pick from 'lodash/pick'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/Textarea'
import { type EditIdeaRouteParams, getViewIdeaRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

const EditIdeaComponent = ({ idea }: { idea: NonNullable<TrpcRouterOutput['getIdea']['idea']> }) => {
  const navigate = useNavigate()
  const [submittingError, setSubmittingError] = useState<string | null>(null)
  const updateIdea = trpc.updateIdea.useMutation()
  const formik = useFormik({
    initialValues: pick(idea, ['name', 'ideaNick', 'description', 'text']),
    validationSchema: toFormikValidationSchema(zUpdateIdeaTrpcInput.omit({ ideaId: true })), // omit - обратное extend
    onSubmit: async (values) => {
      try {
        setSubmittingError(null)
        await updateIdea.mutateAsync({ ideaId: idea.id, ...values })
        navigate(getViewIdeaRoute({ ideaNick: values.ideaNick }))
      } catch (err: any) {
        setSubmittingError(err.message)
      }
    },
  })

  return (
    <Segment title={`Edit Idea: ${idea.ideaNick}`}>
      <form onSubmit={formik.handleSubmit}>
          <Input label="Name" type='text' name="name" formik={formik} />
          <Input label="Nick" type='text' name="ideaNick" formik={formik} />
          <Input label="Description" type='text' name="description" maxWidth={100} formik={formik} />
          <Textarea label="Text" name="text" formik={formik} />
          {!formik.isValid && !!formik.submitCount && <Alert color="red">Some fields are invalid</Alert>}
          {submittingError && <Alert color="red">{submittingError}</Alert>}
          <Button loading={formik.isSubmitting}>Update Idea</Button>
      </form>
    </Segment>
  )
}

export const EditIdeaPage = () => {
  const { ideaNick } = useParams() as EditIdeaRouteParams

  const getIdeaResult = trpc.getIdea.useQuery({
    ideaNick,
  })
  const getMeResult = trpc.getMe.useQuery()

  if (getIdeaResult.isLoading || getIdeaResult.isFetching || getMeResult.isLoading || getMeResult.isFetching) {
    return <span>Loading...</span>
  }

  if (getIdeaResult.isError) {
    return <span>Error: {getIdeaResult.error.message}</span>
  }

  if (getMeResult.isError) {
    return <span>Error: {getMeResult.error.message}</span>
  }

  if (!getIdeaResult.data.idea) {
    return <span>Idea not found</span>
  }

  const idea = getIdeaResult.data.idea
  const me = getMeResult.data.me

  if (!me) {
    return <span>Only for authorized</span>
  }

  if (me.id !== idea.authorId) {
    return <span>An idea can only be edited by the author</span>
  }

  return <EditIdeaComponent idea={idea} />
}