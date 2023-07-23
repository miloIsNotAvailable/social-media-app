import { Loading } from '@globals/Fallback'
import { FC, Suspense, lazy } from 'react'

type LazyProps = {
    Component: React.LazyExoticComponent<FC>
}

const Lazy: FC<LazyProps> = ( { Component } ) => {

    return (
        <Suspense fallback={ 
            <Loading 
                width={ "var(--icon-size)" }
                height={ "var(--icon-size)" }
            /> 
        }>
            <Component/>
        </Suspense>
    )
}

export default Lazy