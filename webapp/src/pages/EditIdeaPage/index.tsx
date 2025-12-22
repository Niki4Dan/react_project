import { zUpdateIdeaTrpcInput } from '@project/backend/src/router/updateIdea/input'
import { canEditIdea } from '@project/backend/src/utils/can'
import pick from 'lodash/pick'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/Textarea'
import { useForm } from '../../lib/form'
import { withPageWrapper } from '../../lib/pageWrapper'

import { getViewIdeaRoute, type EditIdeaRouteParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'



export const EditIdeaPage = withPageWrapper({
  authorizedOnly: true,
  useQuery: () => {
    const { ideaNick } = useParams() as EditIdeaRouteParams
    return trpc.getIdea.useQuery({
      ideaNick,
    })
  },
  checkExists: ({ queryResult }) => !!queryResult.data.idea,
  checkExistsMessage: 'Idea not found!',
  checkAccess: ({ queryResult, ctx }) => canEditIdea(ctx.me, queryResult.data.idea),//!!ctx.me && ctx.me.id === queryResult.data.idea?.authorId,
  checkAccessMessage: 'An idea can only be edited by author!',
  setProps: ({ queryResult }) => ({
    idea: queryResult.data.idea!,
  }),
  title: ({ idea }) => `Edit idea "${idea?.name}" - ideanick`
})(({ idea }) => {
  const navigate = useNavigate()
  const updateIdea = trpc.updateIdea.useMutation()
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: pick(idea, ['name', 'ideaNick', 'description', 'text']),
    validationSchema: zUpdateIdeaTrpcInput.omit({ ideaId: true }), // omit - обратное extend
    onSubmit: async (values) => {
      await updateIdea.mutateAsync({ ideaId: idea.id, ...values })
      navigate(getViewIdeaRoute({ ideaNick: values.ideaNick }))
    },
    resetOnSuccess: false,
    showValidationAlert: true,
  })

  return (
    <Segment title={`Edit Idea: ${idea.ideaNick}`}>
      <form onSubmit={formik.handleSubmit}>
        <Input label="Name" type="text" name="name" formik={formik} />
        <Input label="Nick" type="text" name="ideaNick" formik={formik} />
        <Input label="Description" type="text" name="description" maxWidth={100} formik={formik} />
        <Textarea label="Text" name="text" formik={formik} />
        <Alert {...alertProps} />
        <Button {...buttonProps}>Update Idea</Button>
      </form>
    </Segment>
  )
})

/* export const EditIdeaPage = () => {
  const { ideaNick } = useParams() as EditIdeaRouteParams

  const getIdeaResult = trpc.getIdea.useQuery({
    ideaNick,
  })
  const me = useMe()


  if (getIdeaResult.isLoading || getIdeaResult.isFetching) {
    return <span>Loading...</span>
  }

  if (getIdeaResult.isError) {
    return <span>Error: {getIdeaResult.error.message}</span>
  }

  if (!getIdeaResult.data.idea) {
    return <span>Idea not found</span>
  }

  const idea = getIdeaResult.data.idea

  if (!me) {
    return <span>Only for authorized</span>
  }

  if (me.id !== idea.authorId) {
    return <span>An idea can only be edited by the author</span>
  }

  return <EditIdeaComponent idea={idea} />
} */
