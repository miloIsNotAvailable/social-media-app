import { RouteObject } from "react-router-dom";

export const action: RouteObject["action"] = async( { params, request } ) => {
    
  const data = await request.formData()

  if( (data.get( "title" ) as string)!.length > 30 || data.get( "description" )!.length > 300 ) 
    throw new Response( "invalid community name or description", { status: 400 } ) 

  return { 
    title: data.get( "title" ),
    description: data.get( "description" )
  }
}