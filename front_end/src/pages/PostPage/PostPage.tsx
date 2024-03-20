import React, { ComponentProps } from 'react'
import { useParams } from 'react-router-dom'
import { useGetPostComments, useGetSingleTweet} from '../../lib/ReactQuery'
import { Tweet, TweetCard } from '../../components/Shared/TweetCard/TweetCard'
import { TweetInput } from '../../components/Shared/TweetInput/TweetInput'

export const PostPage:React.FC<ComponentProps<'section'>> = () => {
  const {tweetId} = useParams()
  const {data:tweet, isLoading:TweetIsLoading, isError:TweetIsError, error:tweetError} = useGetSingleTweet({tweetId:Number(tweetId)})
  const {data:comments, isLoading:commentsIsLoading, isError:commentsIsError, error:commentsError} = useGetPostComments({tweetId:Number(tweetId)})
  return (
    <section>
      {!(TweetIsLoading || TweetIsError) ?
        <TweetCard tweet={tweet}/>
      :
      <h1>loading or error {tweetError?.message}</h1>
      }
      <TweetInput tweetId={Number(tweetId)}/>
      {!(commentsIsLoading || commentsIsError) ?
        comments?.pages.map(page => page.results.map((tweet_:Tweet) => {
          return <TweetCard key={tweet_.id} tweet={tweet_}/>
        }))
      :
        <h1>loading or error{commentsError?.message}</h1>
      }
    </section>
  )
}
