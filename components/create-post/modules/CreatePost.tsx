import { FC, Suspense, lazy } from "react";
import CreatePostHeader from "../scenes/CreatePostHeader";
import { styles } from "../styles";
import PickCommunity from "../forms/PickCommunity";
import { Loading, Spinner } from "@globals/Fallback";
import CreatePostForm from "../layouts/CreatePostForm";
import { Form } from "react-router-dom";
// import { Outline } from "@globals/Button";

const Post = lazy( () => import( "@globals/Post" ) )
const Outline = lazy( () => import( "@globals/Button/modules/Outline" ) )

const CreatePost: FC = () => {

    return (
        <div className={ styles.create_post_wrap }>
            <Form 
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
                                post
                            </Outline>
                            <Outline>
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