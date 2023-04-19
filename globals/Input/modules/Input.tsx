import { FC, MutableRefObject, forwardRef } from "react";
import { styles } from "../styles";

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input = forwardRef<MutableRefObject<HTMLInputElement | null>, InputProps>( ( args, ref ) => {
    return (
        <div className={ styles.form_wrap }>
            <input required { ...args }/>
            <label className={  styles.form_label }>
                { args.placeholder }
            </label>
        </div>
    )
} )

export default Input