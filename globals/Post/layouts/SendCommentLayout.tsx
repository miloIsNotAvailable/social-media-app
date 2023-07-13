import { FC, useEffect } from 'react'
import SendComment from '../buttons/SendComment'
import CommentInput from '../inputs/CommentInput'
import { styles } from '../styles'
import CommentLayout from './CommentLayout'
import Posts from '../modules/Posts'
import { Post } from '../../../db/orm/ast/types'
import { Outline } from '@globals/Button'
import { Form, useActionData, useLocation } from 'react-router-dom'
import { CreatePostMutationVariables } from '../../../graphql/codegen/gql/gql'
import CreatePostForm from '../../../components/create-post/layouts/CreatePostForm'
import PickCommunity from '../../../components/create-post/forms/PickCommunity'

const SendCommentLayout: FC = () => {

    const arr: Post[] = new Array( 10 ).fill( {
        id: "hello",
        content: "ye",
        title: "hello",
        communityId: "hello"
    } as Post )

    const action = useActionData() as CreatePostMutationVariables
    const location = useLocation()

    useEffect( () => {
        console.log( { action } )
    }, [ action ] )

    return (
        <div className={ styles.comments_wrap }>
            <Form 
                method="POST" 
                encType="multipart/form-data"
                className={ styles.wrap_send_comment }
            >
                <PickCommunity/>
                <CreatePostForm/>
                <Outline 
                    style={ { width: "100%" } } 
                    type={ "submit" }
                >
                    send
                </Outline>
            </Form>
            <div className={ styles.comments_wrap_responses }>
                <Posts posts={ arr }/>
            </div>
        </div>
    )
}

export default SendCommentLayout