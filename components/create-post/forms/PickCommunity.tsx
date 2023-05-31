import { FC } from "react";
import { styles } from "../styles";

const PickCommunity: FC = () => {

    return (
        <div className={ styles.pick_community_wrap }>
            <div className={ styles.pick_community_placeholder_profile }/>
            <input placeholder="pick community"/>
        </div>
    )
}

export default PickCommunity