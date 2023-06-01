import { Default as Input } from "@globals/Input";
import { FC } from "react";

const PostLinkForm: FC = () => {

    return (
        <Input 
            name={ "link" }  
            placeholder="paste your link here"
        />
    )
}

export default PostLinkForm