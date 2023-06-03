import React, { FC, Suspense, lazy, useEffect, useRef } from "react";
import CreatePostHeader from "../scenes/CreatePostHeader";
import { styles } from "../styles";
import PickCommunity from "../forms/PickCommunity";
import { Loading, Spinner } from "@globals/Fallback";
import CreatePostForm from "../layouts/CreatePostForm";
import { Form, useActionData, useFormAction } from "react-router-dom";
import { CreatePostMutationVariables, useCreatePostMutation } from "../../../graphql/codegen/gql/gql";
import { client } from "../../../router/graphqlClient";
// import { Outline } from "@globals/Button";

const Post = lazy( () => import( "@globals/Post" ) )
const Outline = lazy( () => import( "@globals/Button/modules/Outline" ) )

const CreatePost: FC = () => {

    const { isLoading, mutate } = useCreatePostMutation( client )
    const action = useActionData() as CreatePostMutationVariables
    const formRef = useRef<HTMLFormElement | undefined>( null )

    useEffect( () => {
        action && mutate( action )
    }, [ action ] )

    const handleClearForm: () => void = () => {
        if( !formRef.current ) return

        formRef.current.reset()
    }

    return (
        <div className={ styles.create_post_wrap }>
            <Form 
                ref={ formRef as React.Ref<HTMLFormElement> | undefined }
                method="POST"
                className={ styles.create_post_wrap_forms }
                encType="multipart/form-data"
            >
                <CreatePostHeader/>
                <PickCommunity/>
                <CreatePostForm/>
                <div className={ styles.submit_wrap }>
                    <Suspense fallback={ 
                        <Loading width={ "100%" } height={ "3rem" }/> 
                    }>
                            <Outline type="submit">
                                { isLoading ? 
                                <Spinner 
                                    width={ "1rem" }
                                    height={ "1rem" }
                                    borderWidth={ "1px" }
                                /> 
                                : "post" }
                            </Outline>
                    </Suspense>
                    <Suspense fallback={ 
                        <Loading width={ "100%" } height={ "3rem" }/> 
                    }>
                            <Outline 
                                onClick={ handleClearForm }
                            >
                                cancel
                            </Outline>
                    </Suspense>
                </div>
            </Form>
            <div className={ styles.create_post_preview }>
                <Suspense fallback={ 
                    <Spinner
                        width={ "2rem" }
                        height={ "2rem" }
                        borderWidth={ "1px" }
                    /> 
                }>
                    <Post 
                        title={ "hello" }
                        content={ "lorem ipsum dolorem sit amet" }
                    />
                </Suspense>
            </div>
        </div>
    )
}

export default CreatePost