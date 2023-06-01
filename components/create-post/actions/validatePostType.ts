import { RouteObject } from "react-router-dom";

export const action: RouteObject["action"] = async( { params, request } ) => {
    
  const data = await request.formData()

//   if( (data.get( "title" ) as string)!.length > 30 || data.get( "description" )!.length > 300 ) 
    // throw new Response( "invalid community name or description", { status: 400 } ) 

    if( typeof window === "undefined" ) return

    const file = data.get( "media" )
    const img = new FileReader()

    img.onload = e => {
        if( !e.target?.result ) return
        
        console.log( e?.target?.result as string )
    }

    file && img.readAsDataURL( file as any )

    console.log( { 
      title: data.get( "title" ),
      text: data.get( "text" ),
      image: data.get( "media" ),
      link: data.get( "link" )
    } )

  return { 
    title: data.get( "title" ),
    text: data.get( "text" ),
    image: data.get( "image" ),
    link: data.get( "link" )
  }
}