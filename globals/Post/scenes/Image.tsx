import { FC, MutableRefObject, forwardRef, useEffect, useRef, useState } from "react";
import { styles } from "../styles";
import { Spinner } from "@globals/Fallback";

interface ImageProps {
    link: string
}

const Image = forwardRef<React.MutableRefObject<HTMLImageElement> | undefined, ImageProps>( ( { link }, ref ) => {

    const [ isLoading, setIsLoading ] = useState<boolean>( true )

    // if( isLoading ) return <Spinner/>

    return (
        <>
            <img 
                className={ styles.post_wrap_img } 
                src={ link }
                crossOrigin='anonymous'
                ref={ ref as React.LegacyRef<HTMLImageElement> | undefined }
                onLoad={ () => setIsLoading( false ) }
            /> 
            { isLoading && <Spinner placeSelf="center"/> }
        </>
    )
} )

export default Image