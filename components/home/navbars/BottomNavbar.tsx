import { Loading } from '@globals/Fallback'
import { FC, Suspense, lazy } from 'react'
import { default as HomeIcon } from '../../../imgs/slash.svg'
import { default as DiscoverIcon } from '../../../imgs/compas.svg'
import { default as CreatePostIcon } from '../../../imgs/+.svg'
import { styles } from '../styles'
import { useNavigate } from 'react-router-dom'

const Icon = lazy( () => import( "@globals/Icon" ) )

const BottomNavbar: FC = () => {

    const options = [ 
        { link: "/home/for-you", src: HomeIcon }, 
        { link: "/home/create-post", src: CreatePostIcon },
        { link: "/home/discover", src: DiscoverIcon }, 
    ]

    const navigate = useNavigate();

    return (
        <nav className={ styles.navbar_bottom_wrap }>
            { options.map( ( { link, src } ) => (
                <Suspense key={ link } fallback={ <Loading 
                    width={ "calc(1.3 * var(--icon-size))" } 
                    height={ "calc(1.3 * var(--icon-size))" }/> 
                }>
                    <Icon 
                        src={ src } 
                        style={ {
                            width: 'calc(1.3 * var(--icon-size))',
                            height: 'calc(1.3 * var(--icon-size))',
                            borderRadius: "var(--border-1)",
                            padding: '1rem'
                        } }
                        onClick={ () => navigate( link ) }
                    />
                </Suspense>
            )) }
        </nav>
    )
}

export default BottomNavbar