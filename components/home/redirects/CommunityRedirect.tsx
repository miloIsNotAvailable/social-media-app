import Profile from "@globals/Profile";
import { FC } from "react";
import { Link } from "react-router-dom";
import { styles } from "../styles";

interface CommunityRedirectProps {
    name: string
}

const CommunityRedirect: FC<CommunityRedirectProps> = ( { name } ) => {

    return (
        <Link 
            className={ styles.community_redirect }
            to={ "/communities/" + name.replace( " ", "-" ) }
        >
            <Profile/>
            <span>
                { name }
            </span>
        </Link>
    )
}

export default CommunityRedirect