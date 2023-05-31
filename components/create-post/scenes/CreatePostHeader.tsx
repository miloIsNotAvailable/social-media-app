import NavRoute from "@globals/NavRoute";
import { FC } from "react";
import { styles } from "../styles";

const CreatePostHeader: FC = () => {

    return (
        <div className={ styles.create_post_header }>
            <NavRoute mainpage={ "home" } section={ "create-post" }/>
            <span>share whatever's on your mind with the world</span>
        </div>
    )
}

export default CreatePostHeader