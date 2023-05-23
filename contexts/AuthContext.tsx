import { createContext, useContext } from "react";
import { ExcludeExcept } from "../interfaces/custom";
import { User } from "../db/orm/ast/types";
import { queryClient } from "../router/graphqlClient";
import { AuthSuccess, UserAuthMutation } from "../graphql/codegen/gql/gql";

const createAuthContext = createContext<{ token: string | null }>( { token: null } )

export const AuthProvider = createAuthContext.Provider

export const useAuth = () => {

    if( typeof window == "undefined" || !queryClient.getQueryData( [ "UserAuth" ] ) ) return ""  

    const { signin } = queryClient.getQueryData( [ "UserAuth" ] ) as UserAuthMutation
    return (signin as AuthSuccess).token
}
