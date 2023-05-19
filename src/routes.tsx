// import { AnimatePresence } from 'framer-motion'
import { FC } from 'react'
import { BrowserRouter, Route, RouteObject, RouterProvider, Routes, createBrowserRouter, useLocation, useRouteError } from 'react-router-dom'
import LoginPage from '../components/auth/modules/LoginPage'

export const getPages = () => {
    
    // @ts-ignore
    const __routes__: any = import.meta.globEager( '/pages/*.tsx' )
    // @ts-ignore
    const __outlets__: any = import.meta.globEager( '/pages/[a-z]+/*.tsx' )

    const outlets = Object.keys(__outlets__).map((route) => {
        
        const path = route
          .replace(/\/pages|index|\.tsx$/g, '')
          .replace(/\[\.{3}.+\]/, '*')
          .replace(/\[/g, ':')
          .replace( /\]/g, "" )
    
        return { 
          path, 
          element: __outlets__[route].default, 
          action: __outlets__[route].action,
          ErrorBoundary: __outlets__[route].ErrorBoundary
        }
      })

    const routes = Object.keys(__routes__).map((route) => {
        
        const path = route
          .replace(/\/pages|index|\.tsx$/g, '')
          .replace( /\./, "/" )
          .replace(/\[\.{3}.+\]/, '*')
          .replace(/\[/g, ':')
          .replace( /\]/g, "" )
    
        let children = outlets.filter( ( { path: p } ) => p.match( path ) )
        children = children.map( ( { element: Element, path: p, action, ErrorBoundary } ) => {

        return {
                path: p.replace( path, "" ).replace( "/", "" ),
                element: <Element/>,
                action,
                ErrorBoundary
            }
        } )

        return { path, element: __routes__[route].default, children }
      })

    return routes
}

export const routes: RouteObject[] = getPages().map( ( e ) => ( {
    ...e, 
    element: <e.element/>,
} ) )

const AppRoutes: FC = () => {

    // @ts-ignore
    const __routes__: any = import.meta.globEager( '/pages/**/[a-z[]*.tsx' )
    
    const routes = Object.keys(__routes__).map((route) => {
        const path = route
          .replace(/\/pages|index|\.tsx$/g, '')
          .replace(/\[\.{3}.+\]/, '*')
          .replace(/\[/g, ':')
          .replace( /\]/g, "" )
        //   .replace(/\[(.+)\]/, ':$1')
      
        return { path, component: __routes__[route].default }
      })
    
    const location = useLocation()

    const router = createBrowserRouter( 
        //     getPages().map( ( { element: Element, path } ) => ( { 
        //         path, 
        //         element: <Element/>,
        //         } ) 
        //     ) 
        // )
        [
            {
                path: "/",
                element: <div>hey</div>
            }
        ] ) || []
        

    return (
        // <AnimatePresence mode="wait">
        <RouterProvider router={ router } fallbackElement={ null }/>
        // <Routes location={ location } key={ location.pathname }>
            //     { routes.map( ( { component: Component, path } ) =>(
            //         <Route 
            //             path={ path } 
            //             element={ <Component/> }
            //             key={ path }
            //         />
            //     ) ) }
            // </Routes>
        // </AnimatePresence>
    )
}

export default AppRoutes