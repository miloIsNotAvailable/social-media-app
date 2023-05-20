import { FC } from "react";
import { action } from '../../components/auth/actions/auth'
import FillOutForm from "../../components/auth/layouts/FillOutForm";
import { useRouteError } from "react-router-dom";
import { GraphQLError } from "graphql";

type ErrType = { 
    response: { 
        errors: GraphQLError[]
    } 
}

const ErrorBoundary: FC = () => {
    
    // const { response: { 
    //     errors: [ err ] 
    // } } = useRouteError() as ErrType
    
    const e = useRouteError()
    console.error( e ) 

    return( 
    <div>
        { "an error occurred" }
    </div> 
    )
}

export { action, ErrorBoundary }

const SignIn: FC = () => <></>

export default SignIn