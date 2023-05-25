import { Loading } from '@globals/Fallback'
import { FC, Suspense, lazy } from 'react'
import { default as HomeIcon } from '../../../imgs/slash.svg'
import { default as DiscoverIcon } from '../../../imgs/compas.svg'
import { default as CreatePostIcon } from '../../../imgs/+.svg'
import { styles } from '../styles'

const Icon = lazy( () => import( "@globals/Icon" ) )

const BottomNavbar: FC = () => {

    const options = [ HomeIcon, DiscoverIcon, CreatePostIcon ]

    return (
        <nav className={ styles.navbar_bottom_wrap }>
            { options.map( src => (
                <Suspense fallback={ <Loading 
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
                    />
                </Suspense>
            )) }
        </nav>
    )
}

export default BottomNavbar