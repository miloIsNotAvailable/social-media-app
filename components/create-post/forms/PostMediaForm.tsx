import { FC } from "react";
import { styles } from "../styles";
import { useOpenFile } from "../../../hooks/useOpenFile";

const PostMediaForm: FC = () => {

    return (
        <label className={ styles.text_post_wrap }>
            <span>pick or drag files</span>
            <input 
                required
                type={ "file" }
                name={ "media" } 
                className={ styles.text_post_wrap }
            />
        </label>
    )
}

export default PostMediaForm