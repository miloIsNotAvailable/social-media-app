import { RouteObject } from "react-router-dom";
import { CreatePostMutationVariables } from "../../../graphql/codegen/gql/gql";

export const action: RouteObject["action"] = async( { params, request } ) => {
    
  const data = await request.formData()

//   if( (data.get( "title" ) as string)!.length > 30 || data.get( "description" )!.length > 300 ) 
    // throw new Response( "invalid community name or description", { status: 400 } ) 

    if( typeof window === "undefined" ) return

    const file = data.get( "media" )
    const img = new FileReader()

    file && ( img.onload = e => {
        if( !e.target?.result ) return
        
        console.log( e?.target?.result as string )
    } )

    file && img.readAsDataURL( file as any )

  return { 
    communityId: data.get( "community" ),
    title: data.get( "title" ),
    content: data.get( "text" ) || data.get( "image" ) || data.get( "link" )
  } as CreatePostMutationVariables
}