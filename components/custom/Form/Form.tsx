import { FC } from "react";
import { styles } from "./FormStyles";

interface FormProps {
    label: string
    type: "email"
}

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Form: FC<InputProps> = ( props ) => {

    return (
        <form className={ styles.form_wrap }>
            <input { ...props }/>
            <label className={  styles.form_label }>
                { props.placeholder }
            </label>
        </form>
    )
}

export default Form