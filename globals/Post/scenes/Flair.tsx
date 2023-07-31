import { FC } from 'react'

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