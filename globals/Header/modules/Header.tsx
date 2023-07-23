import { FC } from 'react'
import { styles } from '../styles'

type HeaderProps = {
    children: string | JSX.Element | JSX.Element[]
} & React.DetailedHTMLProps<
React.HTMLAttributes<HTMLHeadingElement>, 
HTMLHeadingElement> & React.CSSProperties

const Header: FC<HeaderProps> = ( { children, ...rest } ) => {

    return (
        <h1 
            className={ styles.header } 
            style={ rest as React.CSSProperties }
            { ...rest }
        >
            { children }
        </h1>
    )
}

export default Header