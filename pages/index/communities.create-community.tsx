import { FC } from "react";
import { CreateCommunity } from "../../components/create-community";
import { action } from '../../components/create-community/actions/createCommunityCheck'

export { action }

const Community: FC = () => {

    return <CreateCommunity/>
}

export default Community