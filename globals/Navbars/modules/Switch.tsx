import { FC, JSXElementConstructor, MutableRefObject, createElement, forwardRef, useEffect, useRef, useState } from 'react'
import { styles } from '../styles'

type E = Parameters<typeof createElement>
type V = { type: E[0], props: E[1] & {children: E[2]} }

type SwitchProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const Switch = forwardRef<MutableRefObject<HTMLElement | null>, SwitchProps>( ( children, ref ) => {

    const [ selected, setSelected ] = useState<number>( 0 )
    const divRef = useRef<HTMLDivElement | null>( null )

    return (
        <nav className={ styles.nav_switch_wrap } ref={ ref as any }>
            { (children!.children as React.ReactNode[])!.map( ( el, ind ) => (
                <div 
                    ref={ divRef }
                    className={ styles.nav_switch_element } 
                    tabIndex={ 0 }
                    onClick={ ( e ) => setSelected( ind ) }
                >
                    { createElement( 
                        (el as V)!.type, 
                        (el as V)!.props, 
                        (el as V)!.props!.children 
                    ) }
                    <div 
                        className={ styles.nav_switch_element_underline }
                        style={ {
                            width: selected === ind ? "100%" : "0%"
                        } }      
                    /> 
                </div>
            ) ) }
        </nav>
    )
})

export default Switch