import { FC } from "react";
import Layout from "../components/custom/Layout/Layout";
import LoginPage from "../components/auth"

const SignIn: FC = () => {

    return (
        <Layout>
            <LoginPage/>
        </Layout>
    )
}

export default SignIn