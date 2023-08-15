import { FC, useEffect, useRef, useState } from 'react'
import { styles } from '../styles'
import PostUserNavbar from '../navbars/PostUserNavbar'
import { isBase64String } from '../interfaces/branded/Base64Type'
import { useLinkToBase64 } from '../hooks/useLinkToBase64'
import { Spinner } from '@globals/Fallback'
import PostLayout from '../layouts/PostLayout'
import PostActionsNavbar from '../navbars/PostActionsNavbar'
import { useNavigate } from 'react-router-dom'

interface TextProps {
    content?: string | null
    title?: string | null
    id?: string | null
    communityId?: string | null
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
const Text: FC<TextProps> = ( { content, title, id, communityId } ) => {

    const navigate = useNavigate()

    const handleNavigateToComments: () => void = () => {
        navigate( "/posts/" + id )
    }

    return (
        <div className={ styles.post } onClick={ handleNavigateToComments }>
            {/* <PostLayout 
                content={ content } 
                title={ title } 
                communityId={ communityId }
            /> */}
            {/* <PostActionsNavbar id={ id! }/> */}
        </div>
    )
}

export default Text