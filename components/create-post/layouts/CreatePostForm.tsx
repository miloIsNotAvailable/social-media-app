import { Outline } from '@globals/Button'
import { FC, Suspense, lazy, useState } from 'react'
import { styles } from '../styles'
import { Loading } from '@globals/Fallback'
import { InputProps } from '@globals/Input/modules/Input'

const Input = lazy( () => import( "@globals/Input/modules/Input" ) )
const TextPostForm = lazy( () => import( "../forms/TextPostForm" ) )
const PostMediaForm = lazy( () => import( "../forms/PostMediaForm" ) )
const PostLinkForm = lazy( () => import( "../forms/PostLinkForm" ) )

type ElementType = React.LazyExoticComponent<any>

const CreatePostForm: FC = () => {

    const inputTypes = [ 
        { type: "text", content: "post", Element: TextPostForm }, 
        { type: "file", content: "image/video", Element: PostMediaForm },
        { type: "link", content: "link", Element: PostLinkForm } 
    ]

    const [ { type: t, Element }, setCurrentType ] = useState<{type: string, Element: ElementType}>( {
        type: inputTypes[0].type,
        Element: inputTypes[0].Element,
    } );

    return (
        <div className={ styles.create_post_form_wrap }>
            
            <Suspense fallback={ 
                <Loading width={ "100%" } height={ "3rem" }/> 
            }>
                <Input name={ "title" } placeholder={ "an interesting title" }/>
            </Suspense>
            
            <div className={ styles.pick_community_buttons }>
                { inputTypes.map( ( { content, type, Element } ) => (
                    <Outline
                        type={ "button" }
                        onClick={ () => setCurrentType( { type, Element } ) }
                        style={ { 
                            outlineColor: t === type ? "var(--green)" : "var(--dark-grey)" 
                        } }
                    >
                        { content }
                    </Outline>
                ) ) }
            </div>
            
            <Suspense fallback={ 
                <Loading width={ "100%" } height={ "3rem" }/> 
            }>
                <Element/>
            </Suspense>
            
        </div>
    )
}

export default CreatePostForm