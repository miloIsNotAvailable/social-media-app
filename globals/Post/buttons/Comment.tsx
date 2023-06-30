import { FC } from 'react'
import Icon from '@globals/Icon'

interface CommentProps {
    id: string
}

const Comment: FC<CommentProps> = ( { id } ) => {

    return (
        <a href={ "/posts/" + id }>
            <Icon style={ { height: "1rem !important" } }>
                <svg width ="100%" height="100%" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="comment">
                        <path 
                            id="comment-path" 
                            d="M6 0.5H14C16.7614 0.5 19 2.73858 19 5.5C19 8.26142 16.7614 10.5 14 10.5H9.5L7.5 12.5L5.5 10.5C3.01472 10.5 1 8.48528 1 6V5.5C1 2.73858 3.23858 0.5 6 0.5Z" 
                            stroke="var(--light-grey)"
                        />
                    </g>
                </svg>
            </Icon>
        </a>
    )
}

export default Comment