import { FC } from "react";
import CreatePost from "../../components/create-post";
import { action } from '../../components/create-post/actions/validatePostType'

export { action }

const Create: FC = () => {

    return <CreatePost/>
}

export default Create