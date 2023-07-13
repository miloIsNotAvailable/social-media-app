import { RouteObject } from "react-router-dom";
import { CreatePostMutationVariables } from "../../../graphql/codegen/gql/gql";

export const action: RouteObject["action"] = async( { params, request } ) => {
    
  const data = await request.formData()

//   if( (data.get( "title" ) as string)!.length > 30 || data.get( "description" )!.length > 300 ) 
    // throw new Response( "invalid community name or description", { status: 400 } ) 

    if( typeof window === "undefined" ) return

    if( !!data.get( "text" ) ) return { 
      communityId: data.get( "community" ),
      title: data.get( "title" ),
      content: data.get( "text" ) || data.get( "link" )
    } as CreatePostMutationVariables

    const file = data.get( "media" )
    
    const e = new Promise( resolve => {
      
      if( !file ) return;

      const img = new FileReader()

      img.onload = e => {
          if( !e.target?.result ) return
          resolve( e.target.result ) 
        } 
      
      img.readAsDataURL( file as any )
    } )

    data.set( "media", await e as string )

  return { 
    communityId: data.get( "community" ),
    title: data.get( "title" ),
    content: data.get( "text" ) || data.get( "media" ) || data.get( "link" )
  } as CreatePostMutationVariables
}