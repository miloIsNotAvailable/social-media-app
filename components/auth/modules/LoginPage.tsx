import { FC } from "react";
import { styles } from "../styles";
import FillOutForm from "../layouts/FillOutForm";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

export const queryClient = new QueryClient();

const LoginPage: FC = () => {

    return (
        <QueryClientProvider client={ queryClient }>
        <div className={ styles.login_page }>
            <FillOutForm/>
        </div>
        </QueryClientProvider>
    )
}

export default LoginPage