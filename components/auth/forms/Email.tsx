import { FC } from "react";
import Form from "../../custom/Form";

const Email: FC = () => {

    return (
        <Form
            type={ "email" }
            placeholder={ "email" }
        />
    )
}

export default Email