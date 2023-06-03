import { useState } from "react";

export const useLinkToBase64 = ( url: string ) => {

    const [ base64, setBase64 ] = useState<string | null>( null );

    ( async() => {
      if( typeof window === "undefined" ) return 
        const data = await fetch(url);
        const blob = await data.blob();
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob); 
          reader.onloadend = () => {
            const base64data = reader.result;   
            setBase64( base64data as string )
          }
        });
    } )()

    return base64
}