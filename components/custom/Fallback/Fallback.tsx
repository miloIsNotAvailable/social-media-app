import { FC } from "react";
import { styles } from "./FallbackStyles";

type Props = React.CSSProperties | undefined

const Fallback: FC<Props> = ( style ) => {
    
    return (
        <div 
            className={ styles.loading }
            style={ style }
        />
    )
}

export default Fallback