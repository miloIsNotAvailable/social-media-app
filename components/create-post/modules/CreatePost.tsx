import { FC, Suspense, lazy } from "react";
import CreatePostHeader from "../scenes/CreatePostHeader";
import { styles } from "../styles";
import PickCommunity from "../forms/PickCommunity";
import { Spinner } from "@globals/Fallback";

const Post = lazy( () => import( "@globals/Post" ) )

const CreatePost: FC = () => {

    return (
        <div className={ styles.create_post_wrap }>
            <div className={ styles.create_post_wrap_forms }>
                <CreatePostHeader/>
                <PickCommunity/>
            </div>
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