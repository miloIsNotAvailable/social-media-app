import { CSSProperties, FC } from "react";
import { styles } from "../styles";

const Spinner: FC<CSSProperties> = ( props ) => {

    return (
        <div style={ props } className={ styles.loader }/>
    )
}

export default Spinner