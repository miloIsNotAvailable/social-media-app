import { FC, useEffect, useRef, useState } from 'react'
import { styles } from '../styles'
import PostUserNavbar from '../navbars/PostUserNavbar'
import { isBase64String } from '../interfaces/branded/Base64Type'
import { useLinkToBase64, validURL } from '../hooks/useLinkToBase64'
import { Spinner } from '@globals/Fallback'
import Image from '../scenes/Image'

interface PostLayoutProps {
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
        console.log( "no contexxt" )
        return defaultRGB;
    }

    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height || canvas.clientWidth;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width || canvas.clientHeight; 

    context.drawImage(imgEl, 0, 0);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch(e) {
        /* security error, img on diff domain */
        console.log( e )
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
const PostLayout: FC<PostLayoutProps> = ( { content, title } ) => {

    const base64 = useLinkToBase64( content as string | null )
    const [ avgRGB, setAvgRGB ] = useState<{ r: number, g: number, b: number } | null>( null );
    
    const imageRef = useRef<HTMLImageElement | null>( null )

    useEffect( () => {
        if( !imageRef.current || !base64 ) return

        const img = document.createElement( "img" )
        img.src = base64
        img.crossOrigin = "anonymous"
        img.className = styles.post_wrap_image
        
        img.onload = () => {

            setAvgRGB( getAverageRGB( img ) )
        }

    }, [ imageRef.current, base64 ] )

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
                { content && validURL( content ) ? 
                    <Image link={ content } ref={ imageRef as React.Ref<React.MutableRefObject<HTMLImageElement> | undefined> | undefined }/>
                    : 
                    <span id="text-post" className={ styles.post_wrap_text }>
                        { content || "" }
                    </span>
                }
            </span>
        </div>
    )
}

export default PostLayout