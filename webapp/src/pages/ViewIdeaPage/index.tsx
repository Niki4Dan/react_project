import type { TrpcRouterOutput } from '@project/backend/src/router'
import { canBlockIdeas, canEditIdea } from '@project/backend/src/utils/can.ts'
import { format } from 'date-fns/format'
import { Alert } from '../../components/Alert'
import { Button, LinkButton } from '../../components/Button'
import { Icon } from '../../components/Icon'
import { Segment } from '../../components/Segment'
import { useForm } from '../../lib/form'
import { withPageWrapper } from '../../lib/pageWrapper'
import { getEditIdeaRoute, getViewIdeaRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'

const BlockIdea = ({ idea }: { idea: NonNullable<TrpcRouterOutput['getIdea']['idea']> }) => {
  const blockIdea = trpc.blockIdea.useMutation()
  const trpcUtils = trpc.useUtils()
  const { formik, alertProps, buttonProps } = useForm({
    onSubmit: async () => {
      await blockIdea.mutateAsync({ ideaId: idea.id })
      await trpcUtils.getIdea.refetch({ ideaNick: idea.ideaNick })
    },
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <Alert {...alertProps} />
      <Button color="red" {...buttonProps}>
        Block Idea
      </Button>
    </form>
  )
}

const LikeButton = ({ idea }: { idea: NonNullable<TrpcRouterOutput['getIdea']['idea']> }) => {
  const trpcUtils = trpc.useUtils()
  const setIdeaLike = trpc.setIdeaLike.useMutation({
    onMutate: ({ isLikedByMe }) => {
      const oldGetIdeaData = trpcUtils.getIdea.getData({ ideaNick: idea.ideaNick })
      if (oldGetIdeaData?.idea) {
        const newGetIdeaData = {
          ...oldGetIdeaData,
          idea: {
            ...oldGetIdeaData.idea,
            isLikedByMe,
            likesCount: oldGetIdeaData.idea.likesCount + (isLikedByMe ? 1 : -1),
          },
        }
        trpcUtils.getIdea.setData({ ideaNick: idea.ideaNick }, newGetIdeaData)
      }
    },
    onSuccess: () => {
      void trpcUtils.getIdea.invalidate({ ideaNick: idea.ideaNick })
    },
  })
  return (
    <button
      className={css.likeButton}
      onClick={() => {
        void setIdeaLike.mutateAsync({ ideaId: idea.id, isLikedByMe: !idea.isLikedByMe })
      }}
    >
      <Icon size={32} name={idea.isLikedByMe ? 'likeFilled' : 'likeEmpty'} />
    </button>
  )
}

export const ViewIdeaPage = withPageWrapper({
  useQuery: () => {
    const { ideaNick } = getViewIdeaRoute.useParams()
    return trpc.getIdea.useQuery({
      ideaNick,
    })
  },

  checkExists: ({ queryResult }) => !!queryResult.data.idea,
  showLoaderOnFetching: false,
  checkExistsMessage: 'Idea not found!',

  setProps: ({ queryResult, ctx }) => ({
    idea: queryResult.data.idea,
    me: ctx.me,
  }),
  title: ({ idea }) => `${idea?.name} - ideanick`,
})(({ idea, me }) => {
  return (
    <Segment title={idea?.name} description={idea?.description}>
      <div className={css.createdAt}>Created at: {format(idea!.createdAt, 'yyyy-MM-dd')}</div>
      <div className={css.author}>
        Author: {idea?.author.nick}
        {idea?.author.name ? ` (${idea.author.name})` : ''}
      </div>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: idea!.text }} />
      <div className={css.likes}>
        Likes: {idea.likesCount}
        {me && (
          <>
            <br />
            <LikeButton idea={idea} />
          </>
        )}
      </div>
      {canEditIdea(me, idea) && (
        <div className={css.editButton}>
          <LinkButton to={getEditIdeaRoute({ ideaNick: idea!.ideaNick })}>Edit</LinkButton>
        </div>
      )}

      {canBlockIdeas(me) && (
        <div className={css.blockIdea}>
          <BlockIdea idea={idea} />
        </div>
      )}
    </Segment>
  )
})
