import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import { NextFunction, Request } from "express";
// import context from "../graphql/context/context";
import { app, server } from "../server/build";
import context from "../graphql/context/context";

( async() => {
  await server.start(); 
} )()

app.use(bodyParser.json( { limit: '50mb' } ))
app.use(bodyParser.urlencoded({
  extended: true
}));

export default ( req: Request, res: any, next: NextFunction ) => {

  return (expressMiddleware(server, { context }))( req, res, next )
}
