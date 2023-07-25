import { Loading } from '@globals/Fallback'
import { FC, Suspense, lazy } from 'react'

type LazyProps = {
    children: JSX.Element | JSX.Element[]
}

const Lazy: FC<LazyProps> = ( { children } ) => {

    return (
        <Suspense fallback={ 
            <Loading 
                width={ "var(--icon-size)" }
                height={ "var(--icon-size)" }
            /> 
        }>
            { children }
        </Suspense>
    )
}

export default Lazy