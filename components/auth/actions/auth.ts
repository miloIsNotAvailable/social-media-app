import { RouteObject } from "react-router-dom";

export const action: RouteObject["action"] = async( { params, request } ) => {
    
  const data = await request.formData()

  if( !(data.get( "email" ) as string)!.match( "@" ) || !data.get( "password" ) ) throw new Response( "invalid email or password", { status: 400 } ) 

  return   { 
    email: data.get( "email" ) as string, 
    password: data.get( "password" ) as string,
    username: data.get( "username" ) as string
  }
}