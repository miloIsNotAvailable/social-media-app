import { ChangeEvent, DragEvent, useState } from "react"

type event = DragEvent<HTMLInputElement> | ChangeEvent<HTMLInputElement>

// check for drag evemts
const eventIsDrag = ( e: event ): 
e is DragEvent<HTMLInputElement> => {
    const v = e as DragEvent<HTMLInputElement>

    return !!v.dataTransfer
}
/**
 * @param useOpenFile
 * @description hook gets base64 string 
 * from dragged & dropped or uploaded image in HTML input
 * @example ```tsx
 * const handleImage = useOpenFile() 
 * ...
 *  <input 
        type={ "file" } 
        className={ styles.media }
        onDrop={ handleImage }
        onChange={ handleImage }
    />
 * ```
 * @returns void
 */
export const useOpenFile: 
<T extends any>( callback: T ) => ( e:event ) => string | null 
= ( callback ) => {

    const [ file_, setFile ] = useState<string | null>( null )

    return ( e ) => {
        
        if( typeof window === "undefined" ) return null

        const drag = eventIsDrag( e )

        // if( !e.currentTarget.accept ) return;

        // e.preventDefault()
        drag && e.dataTransfer.getData( 'text/plain' )
        const file = drag ? e.dataTransfer.files : e.target.files
        const img = new FileReader()

        img.onload = e => {
            if( !e.target?.result ) return
            
            (callback as any)(e?.target?.result as string)
        }
        file && img.readAsDataURL( file[0] )
        // console.log( img.dispatchEvent )
        // e.currentTarget.files = [ { item: new File() } ]
        // e.target.
        return file_
    }
}