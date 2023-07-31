import { FC } from 'react'
import { styles } from '../styles'

interface FlairProps {
    content: string
}

const Flair: FC<FlairProps> = ( { content } ) => {

    return (
        <div className={ styles.post_flair }>
            { content }
        </div>
    )
}

export default Flair