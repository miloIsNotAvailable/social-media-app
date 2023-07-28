import { FC, UIEvent, useEffect, useRef, useState } from 'react'
import { styles } from '../styles'
import { BottomNavbar, DefaultNavbar, SwitchNavbar } from '@globals/Navbars'
import NavRoute from '@globals/NavRoute'

interface HomeLayoutProps {
    children: JSX.Element | JSX.Element[] | string
}

const HomeLayout: FC<HomeLayoutProps> = ( { children } ) => {

    const [ delta, setDelta ] = useState<number>( 0 )
    const [ isScrollDown, setIsScrollDown ] = useState<boolean>( true )
    const navRef = useRef<HTMLElement | null>( null )

    const handleScroll: React.UIEventHandler<HTMLDivElement> 
    = e => {
        setIsScrollDown( delta > e.currentTarget.scrollTop )

        setDelta( e.currentTarget.scrollTop )
    }

    useEffect( () => {
        if( !navRef.current ) return

        navRef.current!.style.maxHeight = !isScrollDown ? "0" : "4rem"
        // navRef.current!.style.visibility = !isScrollDown ? "collapse" : "visible"

    }, [ isScrollDown ] )

    return (
        <div className={ styles.home_layout }>
            <DefaultNavbar/>
            <SwitchNavbar 
                ref={ navRef as any } 
                style={ { 
                    maxHeight: "100%", 
                    visibility: "visible" 
                } }
            >
                <NavRoute 
                    link={ "h/for-you" }
                    to={ "home/for-you" }
                />
                <NavRoute 
                    link={ "h/discover" }
                    to={ "home/discover" }
                />
            </SwitchNavbar>
            <div 
                className={ styles.home_layout_body_wrap } 
                id="layout-body"
                onScroll={ handleScroll }
            >
                { children }
            </div>
            <BottomNavbar/>
        </div>
    )
}

export default HomeLayout