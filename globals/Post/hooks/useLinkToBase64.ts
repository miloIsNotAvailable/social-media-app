import { useState } from "react";

// https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
function validURL( str: string ) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

export const useLinkToBase64 = ( url: string | null ): string | null => {
  
  const [ base64, setBase64 ] = useState<string | null>( null );
  
    if( !url || !validURL( url ) ) { return null }

    ( async() => {
      if( typeof window === "undefined" ) return 
        // https://stackoverflow.com/questions/22172604/convert-image-from-url-to-base64
        const data = await fetch(url, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        });
        
        const blob = await data.blob();

        return new Promise((resolve) => {
          const reader = new FileReader();

          reader.readAsDataURL(blob); 
          
          reader.onloadend = () => {
            const base64data = reader.result;   
            setBase64( (base64data as string) )
          }
        });
    } )()

    return base64
}