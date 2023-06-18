import { FC } from "react";
import Profile from "@globals/Profile";
import NavRoute from "@globals/NavRoute";
import { styles } from '../styles'

const CommunityHeader: FC = () => {

    return (
        <div className={ styles.community_header }>
            <div className={ styles.community_name }>
                <Profile/>
                <NavRoute 
                    mainpage={ "home" } 
                    section={ "communities" }
                    element={ "lorem-ipsum" }
                />
            </div>
            <div className={ styles.community_desc }>
                this is a community description 
            </div>
        </div>
    )
}

export default CommunityHeader