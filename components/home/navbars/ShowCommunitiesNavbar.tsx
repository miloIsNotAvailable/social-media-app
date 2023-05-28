import { FC, Suspense, lazy } from 'react'
import { styles } from '../styles'
import { Loading } from '@globals/Fallback'
const Community = lazy( () => import( "../redirects/CommunityRedirect" ) )

const ShowCommunitiesNavbar: FC = () => {

    return (
    <nav 
        className={ styles.display_communities }
    >
        <div className={ styles.community_redirect }>
            <Suspense fallback={ <Loading width="20vw" height="calc(var(--font-size) + 2rem)"/> }>
                <Community name={ "create community" }/>
            </Suspense>
        </div>
    </nav>
    )
}

export default ShowCommunitiesNavbar