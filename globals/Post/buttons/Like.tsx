import { FC, useEffect, useState } from 'react'
import Icon from '@globals/Icon'
import { useLikePostMutation, useUserLikedPostQuery } from '../../../graphql/codegen/gql/gql'
import { client, queryClient } from '../../../router/graphqlClient'

interface LikeProps {
    id: string
    liked: boolean
}

const Like: FC<LikeProps> = ( { id, liked } ) => {

    const [ open, setOpen ] = useState<boolean>( () => liked )
    const { isLoading, mutate, data } = useLikePostMutation( client, {
        onMutate: async ( newLike ) => {
            // Cancel any outgoing refetches
            // (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: ['LikePost'] })
        
            // Snapshot the previous value
            const previousTodos = queryClient.getQueryData(['LikePost'])
        
            // Optimistically update to the new value
            queryClient.setQueryData(['LikePost'], (old) => newLike )
        
            setOpen( !!newLike.like )

            // Return a context object with the snapshotted value
            return { previousTodos }
          },
          // If the mutation fails,
          // use the context returned from onMutate to roll back
          onError: (err, _, context) => {
            queryClient.setQueryData(['LikePost'], (context as any).previousTodos)
            setOpen( !!(context as any).previousTodos )
          },
          // Always refetch after error or success:
          onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['LikePost'] })
          },
    } )

    // useEffect( () => {
    //     setOpen( !!data?.likePost?.like )
    // }, [ data ] )

    const handleLike: () => void = () => {
        // setOpen( !open )
        mutate( {
            postId: id,
            like: !open
        } )
    }

    return (
        <div onClick={ handleLike }>
            <Icon style={ { height: "1rem !important", zIndex: "100 !important" } }>
                <svg width="100%" height="100%" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                        id="heart-icon" 
                        d="M6 9.5C6 9.5 11 6.4715 11 3.58325C11 2.1041 10.353 1.00931 9 0.624923C7 0.0567321 6 1.61103 6 1.61103C6 1.61103 5 0.0568188 3 0.62501C1.64698 1.0094 1 2.10419 1 3.58334C1 6.47159 6 9.5 6 9.5Z" 
                        stroke={ open ? "transparent" : "var(--light-grey)" }
                        fill={ open ? "var(--red)" : "transparent" }
                    />
                </svg>
            </Icon>
        </div>
    )
}

export default Like