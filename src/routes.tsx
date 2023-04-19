// import { AnimatePresence } from 'framer-motion'
import { FC } from 'react'
import { BrowserRouter, Route, RouteObject, RouterProvider, Routes, createBrowserRouter, useLocation } from 'react-router-dom'

export const getPages = () => {
    
    // @ts-ignore
    const __routes__: any = import.meta.globEager( '/pages/**/[a-z[]*.tsx' )
    
    const routes = Object.keys(__routes__).map((route) => {
        const path = route
          .replace(/\/pages|index|\.tsx$/g, '')
          .replace(/\[\.{3}.+\]/, '*')
          .replace(/\[/g, ':')
          .replace( /\]/g, "" )
        //   .replace(/\[(.+)\]/, ':$1')
      
        return { path, element: __routes__[route].default }
      })

    return routes
}

export const routes: RouteObject[] = getPages().map( ( e ) => ( {
    ...e, 
    element: <e.element/>
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