import React, { ComponentProps } from 'react'
import { useParams } from 'react-router-dom'
import { useGetPostComments, useGetSingleTweet} from '../../lib/ReactQuery'
import { TweetCard } from '../../components/Shared/TweetCard/TweetCard'
import { TweetInput } from '../../components/Shared/TweetInput/TweetInput'
import { InfiniteTweets } from '../../components/Shared/InfiniteTweets/InfiniteTweets'
import { TweetCardSkeleton } from '../../components/Shared/TweetCard/TweetCardSkeleton'

export const PostPage:React.FC<ComponentProps<'section'>> = () => {
  const {tweetId} = useParams()

  const {data:tweet, isLoading:TweetIsLoading, isError:TweetIsError, error:tweetError} = useGetSingleTweet({tweetId:Number(tweetId)})
  const {data:comments, isLoading:commentsIsLoading, isError:commentsIsError, error:commentsError, fetchNextPage, isFetchingNextPage} = useGetPostComments({tweetId:Number(tweetId)})
  return (
    <section>
      {!(TweetIsLoading || TweetIsError) ?
        <TweetCard tweet={tweet}/>
      :
        <TweetCardSkeleton/>
      }
      <TweetInput tweetId={Number(tweetId)}/>
      <InfiniteTweets data={comments} isLoading={commentsIsLoading} isError={commentsIsError} error={commentsError} fetchNextPage={fetchNextPage} isFetchingNextPage={isFetchingNextPage}/>
    </section>
  )
}
