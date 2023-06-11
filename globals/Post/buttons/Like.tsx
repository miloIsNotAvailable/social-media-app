import { FC } from 'react'
import Icon from '@globals/Icon'

const Like: FC = () => {

    return (
        <Icon style={ { height: "1rem !important" } }>
            <svg width="100%" height="100%" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                    id="heart-icon" 
                    d="M6 9.5C6 9.5 11 6.4715 11 3.58325C11 2.1041 10.353 1.00931 9 0.624923C7 0.0567321 6 1.61103 6 1.61103C6 1.61103 5 0.0568188 3 0.62501C1.64698 1.0094 1 2.10419 1 3.58334C1 6.47159 6 9.5 6 9.5Z" 
                    stroke="var(--light-grey)" 
                />
            </svg>
        </Icon>
    )
}

export default Like