import { FC } from "react";
import { styles } from "../styles";

type TextPostFormProps =  React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>

const TextPostForm: FC<TextPostFormProps> = ( props ) => {

    return <textarea 
        { ...props }
        name={ "text" } 
        placeholder="create new post. use markdown to style it!"
        className={ styles.text_post_wrap }
    />
}

export default TextPostForm