import { FC } from "react";
import SignUpOutlet from "../../components/auth/outlets/SignUpOutlet";
import { action } from '../../components/auth/actions/auth'

export { action }

const SignUp: FC = () => {

    return <SignUpOutlet/>
}

export default SignUp