import { zGetIdeasTrpcInput } from '@project/backend/src/router/getIdeas/input'
import { Title } from 'react-head'
import InfiniteScroll from 'react-infinite-scroller'
import { Link } from 'react-router-dom'
import { useDebounceValue } from 'usehooks-ts'
import { Alert } from '../../components/Alert'
import { Input } from '../../components/Input'
import { layoutContentElRef } from '../../components/Layout'
import { Loader } from '../../components/Loader'
import { Segment } from '../../components/Segment'
import { useForm } from '../../lib/form'
import { getViewIdeaRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'



export const AllIdeasPage = () => {
  const { formik } = useForm({
    initialValues: { search: '' },
    validationSchema: zGetIdeasTrpcInput.pick({ search: true }),
  })

  const search = useDebounceValue(formik.values.search, 1000)

  

  const { data, error, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } =
    trpc.getIdeas.useInfiniteQuery(
      {
        search: search[0],
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor
        },
      }
    )



  return (
    <Segment title="All Ideas">
      <Title>
        All ideas - ideanick
      </Title>
      <div className={css.filter}>
        <Input maxWidth={100} type="text" label="Search" name="search" formik={formik} />
      </div>
      {isLoading || isRefetching ? (
        <Loader type="section" />
      ) : isError ? (
        <Alert color="red">{error.message}</Alert>
      ) : !data.pages[0].ideas.length ? (
        <Alert color="brown">Nothing found by search</Alert>
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
            loader={<Loader type="section" />}
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
