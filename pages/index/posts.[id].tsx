import FullScreenPost from "@globals/Post/modules/PostFullscreen";
import { FC } from "react";
import { action } from "../../components/create-post/actions/validatePostType";

export { action }

const DisplayPost: FC = () => {

    return <FullScreenPost/>
}

export default DisplayPost