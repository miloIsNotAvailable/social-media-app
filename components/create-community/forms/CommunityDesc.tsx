import { FC } from "react";
import { styles } from "../styles";

const CommunityDesc: FC = () => {

    return (
        <textarea 
            className={ styles.community_desc }
            name="description"
            placeholder="community description"
        />
    )
}

export default CommunityDesc