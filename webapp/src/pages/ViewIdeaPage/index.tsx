import { format } from 'date-fns/format'
import { useParams } from 'react-router-dom'
import { LinkButton } from '../../components/Button'
import { Segment } from '../../components/Segment'
import { type ViewIdeaRouteParams } from '../../lib/routes'
import * as router from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'



export const ViewIdeaPage = () => {
  const { ideaNick } = useParams() as ViewIdeaRouteParams
  const getMeResult = trpc.getMe.useQuery()
  const { data, error, isLoading, isFetching, isError } = trpc.getIdea.useQuery({
    ideaNick,
  })

  if (isLoading || isFetching) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  if (!data) {
    return <span>No ideas found</span>
  }

  if (!data.idea) {
    return <span>Idea not found</span>
  }

    if (getMeResult.isError) {
    return <span>Error: {getMeResult.error.message}</span>
  }

  const me = getMeResult.data!.me

  return (
    <Segment title={data.idea.name} description={data.idea.description}>
      <div className={css.createdAt}>Created at: {format(data.idea.createdAt, 'yyyy-MM-dd')}</div>
      <div className={css.author}>Author: {data.idea.author.nick}</div>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: data.idea.text }} />
      {me?.id === data.idea.author.id && (
        <div className={css.editButton}>
          <LinkButton to={router.getEditIdeaPageRoute({ ideaNick: data.idea.ideaNick })}>Edit</LinkButton>
        </div>
      )}
    </Segment>
  )
}
