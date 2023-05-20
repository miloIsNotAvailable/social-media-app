import { FC } from "react";
import SignUpOutlet from "../../components/auth/outlets/SignUpOutlet";
import { action } from '../../components/auth/actions/auth'
import { useRouteError } from "react-router-dom";

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

const SignUp: FC = () => {

    return <SignUpOutlet/>
}

export default SignUp