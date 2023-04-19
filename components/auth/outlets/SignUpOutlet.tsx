import { Default as Input } from "@globals/Input";
import { FC } from "react";

const SignUpOutlet: FC = () => {

    return <Input 
        placeholder="username" 
        name="username"
        required
    />
}

export default SignUpOutlet