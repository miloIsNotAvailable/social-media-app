import { FC } from "react";
import App from "./App";
import ReactDOMserver from 'react-dom/server'
import { StaticHandlerContext, StaticRouter, StaticRouterProvider, createStaticHandler, createStaticRouter } from 'react-router-dom/server'
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { getPages } from "./routes";
import type * as express from "express";
import fetch, { Headers, Request, Response, RequestInit } from 'node-fetch'

export const render = async ( request: express.Request ) =>  {

    const routes = getPages().map( ( e ) => ( {
        ...e, 
        element: <e.element/>,
      } ) )

    let { query, dataRoutes } = createStaticHandler( routes );
    let remixRequest = createFetchRequest(request);
    let context = await query( remixRequest as any ) as StaticHandlerContext | Response
  
    if (context instanceof Response) {
      throw context;
    }

    const router = createStaticRouter( dataRoutes, context )

    return ReactDOMserver.renderToString(
        <Provider store={ store }>
            <StaticRouterProvider 
                router={ router }
                context={ context }
                nonce="the-nonce"
            />
        </Provider>
    )   
}


export function createFetchRequest(req: express.Request): Request {
    let origin = `${req.protocol}://${req.get("host")}`;
    // Note: This had to take originalUrl into account for presumably vite's proxying
    let url = new URL(req.originalUrl || req.url, origin);
  
    let controller = new AbortController();
    req.on("close", () => controller.abort());
  
    let headers = new Headers();
  
    for (let [key, values] of Object.entries(req.headers)) {
      if (values) {
        if (Array.isArray(values)) {
          for (let value of values) {
            headers.append(key, value);
          }
        } else {
          headers.set(key, values);
        }
      }
    }
  
    let init: RequestInit = {
      method: req.method,
      headers,
      signal: controller.signal,
    };
  
    if (req.method !== "GET" && req.method !== "HEAD") {
      init.body = req.body;
    }
  
    return new Request(url.href, init);
  }