import { Default as Input } from '@globals/Input'
import { ChangeEvent, FC, useRef, useState, MouseEvent, useEffect } from 'react'
import { styles } from '../styles'
import { Color } from '@globals/Button'
import Flairs from '../scenes/Flairs'

const PickFlairs: FC = () => {

    const [ flairs, setFlairs ] = useState<string[]>( [] )
    const ref = useRef<HTMLInputElement | null>( null )

    const handleAddFlair: ( e: MouseEvent<HTMLButtonElement> ) => void 
    = e => {
        if( !ref.current || !ref.current?.value ) return
        // e.preventDefault()
        setFlairs( prev => [ ...prev, ref.current!.value ] )
    }

    return (
        <div className={ styles.flairs_wrap }>
            <div className={ styles.flairs_post_wrap }>
                <Input 
                    ref={ ref as React.Ref<React.MutableRefObject<HTMLInputElement | null>> | undefined }
                    name="flairs" 
                    placeholder='add flairs'
                />
                <Color 
                    type={ "button" } 
                    onClick={ handleAddFlair }
                >
                    add flair
                </Color>
            </div>
            <div className={ styles.flairs_post_wrap }>
                { flairs.map( flair => ( 
                    <Flairs content={ flair }/> 
                ) ) }
            </div>
        </div>
    )
}

export default PickFlairs