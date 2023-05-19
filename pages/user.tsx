import { FC } from "react";
import Layout from "../components/custom/Layout/Layout";
import LoginPage from "../components/auth"
import { action } from '../components/auth/actions/auth'

export { action }

const SignIn: FC = () => {

    return (
        <Layout>
            <LoginPage/>
        </Layout>
    )
}

export default SignIn