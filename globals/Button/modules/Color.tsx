import { FC } from "react";
import { styles } from "../styles";

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const Color: FC<ButtonProps> = ( props ) => {

    return (
        <button className={ styles.button_color } {...props}>
            { props.children }
        </button>
    )
}

export default Color