import { FC } from 'react'
import { styles } from '../styles'

interface FlairsProps {
    content: string
    children?: JSX.Element | JSX.Element[] | string
}

const Flairs: FC<FlairsProps> = ( { content, children } ) => {

    return (
        <div className={ styles.flair }>
            { content }
            { children }
        </div>
    )
}

export default Flairs