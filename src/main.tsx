import React, { FC } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import '../styles/index.css'
import { store } from '../redux/store'
import { BrowserRouter, RouteObject, RouterProvider, createBrowserRouter, matchRoutes } from 'react-router-dom'
import { StaticRouter } from 'react-router-dom/server'
import { getPages, routes } from './routes'

// const routes: RouteObject[] = getPages().map( ( { element: Element, path } ) => ( {
//   path, 
//   element: <Element/>
// } ) )

const Render: FC = () => {

  const router = createBrowserRouter( routes )

  return (
    <Provider store={ store }>
      {/* <BrowserRouter> */}
        {/* <React.StrictMode> */}
          <RouterProvider router={ router } />
        {/* </React.StrictMode> */}
      {/* </BrowserRouter> */}
    </Provider>
  )
}

async function hydrate() {
  // Determine if any of the initial routes are lazy
  let lazyMatches = matchRoutes(routes, window.location)?.filter(
    (m) => m.route.lazy
  );

  // Load the lazy matches and update the routes before creating your router
  // so we can hydrate the SSR-rendered content synchronously
  if (lazyMatches && lazyMatches?.length > 0) {
    await Promise.all(
      lazyMatches.map(async (m) => {
        let routeModule = await m.route.lazy!();
        Object.assign(m.route, { ...routeModule, lazy: undefined });
      })
    );
  }
}

hydrate()

if( typeof window !== "undefined" ) {

  const container = document.getElementById('root') as HTMLElement
  //@ts-ignore
  if( import.meta.hot || !container?.innerText ) {
    const root = ReactDOM.createRoot( container! )
    root.render( <Render/> )
  } else {
    console.log( "hello" )
    const container = document.getElementById('root') as HTMLElement
    ReactDOM.hydrateRoot( container!, <Render/> )
  }
}

// if( typeof window !== "undefined" ) {

//   const container = document.getElementById('root') as HTMLElement
//   ReactDOM.hydrateRoot( container!, <Render/> )
// }

