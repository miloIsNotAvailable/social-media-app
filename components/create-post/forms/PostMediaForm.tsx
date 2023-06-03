import { ChangeEvent, DragEvent, FC, useState } from "react";
import { styles } from "../styles";
import { useOpenFile } from "../../../hooks/useOpenFile";

const PostMediaForm: FC = () => {

    const [ base64String, setBase64String ] = useState<string | null>( null );
    const openFile = useOpenFile<React.Dispatch<React.SetStateAction<string | null>>>( setBase64String )

    return (
        <label className={ styles.text_post_wrap }>
            { base64String ? 
            <img 
                className={ styles.img_preview_wrap } 
                src={ base64String }
            /> : 
            <span className={ styles.media_text }>
                drag and drop images or upload
            </span>
            }
            <input 
                required
                type={ "file" }
                name={ "media" } 
                className={ styles.text_post_wrap }
                onChange={ openFile }
                onDrop={ openFile }
            />
        </label>
    )
}

export default PostMediaForm