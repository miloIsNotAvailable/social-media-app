import { Loading } from '@globals/Fallback'
import { FC, Suspense, lazy } from 'react'
import { Form } from 'react-router-dom'
import { styles } from '../styles'
const Input = lazy( () => import( "@globals/Input/modules/Input" ) )
const Desc = lazy( () => import( "../forms/CommunityDesc" ) )
const Color = lazy( () => import( '@globals/Button/modules/Color' ) )

const CreateCommunity: FC = () => {

    return (
        <Form method="POST" className={ styles.create_community_wrap }>
            <Suspense fallback={ 
                <Loading width="100%" height="3rem"/> 
            }>
                <Input placeholder='community name'/>
            </Suspense>
            <Suspense fallback={ 
                <Loading width="100%" height="3rem"/> 
            }>
                <Desc/>
            </Suspense>
            <Suspense fallback={ 
                <Loading width="100%" height="3rem"/> 
            }>
                <Color>
                    create community
                </Color>
            </Suspense>
        </Form>
    )
}

export default CreateCommunity