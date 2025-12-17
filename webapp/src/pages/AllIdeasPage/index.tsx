import InfiniteScroll from 'react-infinite-scroller'
import { Link } from 'react-router-dom'
import { Alert } from '../../components/Alert'
import { layoutContentElRef } from '../../components/Layout'
import { Loader } from '../../components/Loader'
import { Segment } from '../../components/Segment'
import { getViewIdeaRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'

export const AllIdeasPage = () => {
  const { data, error, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } =
    trpc.getIdeas.useInfiniteQuery(
      {},
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor
        },
      }
    )

  return (
    <Segment title="All Ideas">
      {isLoading || isRefetching ? (
        <Loader type="section" /> 
      ) : isError ? (
        <Alert color="red">{error.message}</Alert>
      ) : (
        <div className={css.ideas}>
          <InfiniteScroll
            threshold={50} // количество пикселей от конца, если приблизимся то подгрузить
            loadMore={() => {
              if (!isFetchingNextPage && hasNextPage) {
                fetchNextPage()
              }
            }}
            hasMore={hasNextPage}
            loader={
<Loader type="section" /> 
            }
            getScrollParent={() => layoutContentElRef.current}
            useWindow={(layoutContentElRef.current && getComputedStyle(layoutContentElRef.current).overflow) !== 'auto'}
          >
            {data.pages
              .flatMap((page) => page.ideas)
              .map((idea) => (
                <div className={css.idea} key={idea.ideaNick}>
                  <Segment
                    size={2}
                    title={
                      <Link className={css.ideaLink} to={getViewIdeaRoute({ ideaNick: idea.ideaNick })}>
                        {idea.name}
                      </Link>
                    }
                    description={idea.description}
                  >
                  Likes: {idea.likesCount}
                  </Segment>
                </div>
              ))}
          </InfiniteScroll>
        </div>
      )}
    </Segment>
  )
}
