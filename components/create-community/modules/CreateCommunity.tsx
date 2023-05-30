import { Loading, Spinner } from '@globals/Fallback'
import { FC, Suspense, lazy, useEffect } from 'react'
import { Form, useActionData } from 'react-router-dom'
import { styles } from '../styles'
import { CreateCommunityMutationVariables, useCreateCommunityMutation } from '../../../graphql/codegen/gql/gql'
import { client, queryClient } from '../../../router/graphqlClient'
const Input = lazy( () => import( "@globals/Input/modules/Input" ) )
const Desc = lazy( () => import( "../forms/CommunityDesc" ) )
const Color = lazy( () => import( '@globals/Button/modules/Color' ) )

const CreateCommunity: FC = () => {

    const action = useActionData() as CreateCommunityMutationVariables;
    const { data, isLoading, mutate, isSuccess, isError, reset } = useCreateCommunityMutation( client, {
        onSettled: () => setTimeout( () => { reset() }, 1000 )
    } )

    useEffect( () => {
        if( !action ) return

        mutate( action )
    }, [ action ] )

    console.log( data )

    return (
        <Form method="POST" className={ styles.create_community_wrap }>
            <Suspense fallback={ 
                <Loading width="100%" height="3rem"/> 
            }>
                <Input 
                    id="community-name"
                    autoFocus
                    required 
                    name='title' 
                    placeholder='community name'
                />
            </Suspense>
            <Suspense fallback={ 
                <Loading width="100%" height="3rem"/> 
            }>
                <Desc/>
            </Suspense>
            <Suspense fallback={ 
                <Loading width="100%" height="3rem"/> 
            }>
                <Color 
                    id={ "submit-community" }
                    disabled={ isLoading || isSuccess || isError }
                >
                    {isLoading ? 
                        <Spinner 
                            width="1rem" 
                            height="1rem"
                            borderWidth="1px"
                        /> : 
                        isSuccess ? "success" : "create community"
                    }
                </Color>
            </Suspense>
        </Form>
    )
}

export default CreateCommunity