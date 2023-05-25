import { CSSProperties, FC } from "react";
import { styles } from "../styles";

const Loading: FC<CSSProperties> = ( props ) => {

    return (
        <div className={ styles.loading } style={ props }/>
    )
}

export default Loading