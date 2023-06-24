import { FC } from 'react'
import CommunityHeader from '../layouts/CommunityHeader'
import CommunityPosts from '../layouts/CommunityPosts'
import { styles } from '../styles'

const Community: FC = () => {

    return (
        <div className={ styles.community_wrap }>
            <CommunityHeader/>
            <CommunityPosts/>
        </div>
    )
}

export default Community