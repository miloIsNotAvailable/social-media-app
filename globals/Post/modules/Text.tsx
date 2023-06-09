import { FC, useEffect, useRef, useState } from 'react'
import { styles } from '../styles'
import PostUserNavbar from '../navbars/PostUserNavbar'
import { isBase64String } from '../interfaces/branded/Base64Type'
import { useLinkToBase64 } from '../hooks/useLinkToBase64'

interface TextProps {
    content?: string | null
    title?: string | null
}


function getAverageRGB( imgEl: HTMLImageElement ) {

    var blockSize = 5, // only visit every 5 pixels
        defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = {r:0,g:0,b:0},
        count = 0;

    if (!context) {
        return defaultRGB;
    }

    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch(e) {
        /* security error, img on diff domain */
        return defaultRGB;
    }

    length = data.data.length;

    while ( (i += blockSize * 4) < length ) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);

    return rgb;

}
const Text: FC<TextProps> = ( { content, title } ) => {

    // const base64 = useLinkToBase64( "https://images.unsplash.com/photo-1549989317-6f14743af1bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" )
    const imgRef = useRef<HTMLImageElement | null>( null )
    const [ avgRGB, setAvgRGB ] = useState<{ r: number, g: number, b: number } | null>( null );

    // console.log( base64 )
    useEffect( () => {
        if( !imgRef.current ) return
        setAvgRGB( getAverageRGB( imgRef.current ) )
    }, [ imgRef ] )

    return (
        <div 
            className={ styles.post_wrap }
            style={ {
                background: `radial-gradient( 
                    circle at 100% 100%, 
                    rgba(${ avgRGB && Object.values( avgRGB ).join( "," ) || "120, 147, 245" }, 0.11) 0, 
                    #2C2C2C1c 60%, 
                    #2727271c 100%
                )`
            } }
        >
            <PostUserNavbar/>
            <h1>{ title }</h1>
            <span className={ styles.post_wrap_text }>
                { content && !!isBase64String( content ) ? 
                    <img 
                        ref={ imgRef }
                        className={ styles.post_wrap_img } 
                        src={ content }
                    /> : 
                    <span id="text-post" className={ styles.post_wrap_text }>
                        { content || "" }
                    </span> 
                }
            </span>
        </div>
    )
}

export default Text