import { FC, lazy, Suspense } from "react";
// const Icon = lazy( () => import( "../../custom/Icon" ) );
import { default as GoogleIcon } from "../../../imgs/google.svg"
import Fallback from "../../custom/Fallback";
import Icon from "../../custom/Icon";

const OAuth: FC = () => {

    return (
        <button>
            <Icon src={ GoogleIcon }/>
            sign in with google
        </button>
    )
}

export default OAuth