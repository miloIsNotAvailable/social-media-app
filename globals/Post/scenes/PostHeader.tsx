import NavRoute from "@globals/NavRoute";
import Profile from "@globals/Profile";
import { FC } from "react";
import Flair from "./Flair";
import { styles } from "../styles";

interface PostHeaderProps {
    flairs: string[]
    communityId: string
    community: string
}

const PostHeader: FC<PostHeaderProps> = ( { flairs, communityId, community } ) => {

    return (
        <div className={ styles.post_header_wrap }>
            <Profile/>
            <div className={ styles.post_community_and_flairs }>
                <NavRoute link={ "communities/" + community }/>
                <div className={ styles.flairs_wrap }>
                    { flairs.map( flair => (
                        <Flair content={ flair }/>
                    ) ) }
                </div>
            </div>
        </div>
    )
}

export default PostHeader