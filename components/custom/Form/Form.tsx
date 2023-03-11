import { FC } from "react";
import { styles } from "./FormStyles";

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Form: FC<InputProps> = ( props ) => {

    return (
        <form className={ styles.form_wrap }>
            <input required { ...props }/>
            <label className={  styles.form_label }>
                { props.placeholder }
            </label>
        </form>
    )
}

export default Form