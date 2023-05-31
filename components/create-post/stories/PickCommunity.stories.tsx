import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PickCommunity from '../forms/PickCommunity';
import { RouterProvider, createBrowserRouter, useRouteError } from 'react-router-dom';
import { setupWorker, graphql } from 'msw'
import { configure, userEvent, waitFor, within } from '@storybook/testing-library';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../../../router/graphqlClient';

configure( {
  testIdAttribute: "id"
} )

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/home/create-post/forms/pick-community',
  component: PickCommunity,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof PickCommunity>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const router = ( args: any ) => createBrowserRouter( [ {
  path: "*",
  element: <PickCommunity />,
  ErrorBoundary: ( err ) => {
    let error = useRouteError();
    console.error( (error as any)?.data );

    return <div>hey</div>
  }
} ] )
const Template: ComponentStory<typeof PickCommunity> = (args) => <QueryClientProvider client={ queryClient }>
  <RouterProvider router={ router( args ) }/>
  </QueryClientProvider>

export const Primary = Template.bind({});
Primary.args = {}

// const handlers = [
//   graphql.mutation( "PickCommunity", ( req, res, ctx ) => {
//     return res( 
//       // ctx.delay( 1000 ),
//       ctx.data( {
//           communities: {
//             title: "hello"
//           }
//       } )
//      )
//   } )
// ] 

// if (typeof global.process === 'undefined') {
//   const worker = setupWorker( ...handlers )
//   worker.start()
// }

// Primary.play = async( { canvasElement } ) => {
  
//   // worker.start()
//   const canvas = within(canvasElement);
//   const title = await canvas.findByTestId( "community-name" )
//   const submit = await canvas.findByTestId( "submit-community" )

//   userEvent.type( title, "hello" )
//   userEvent.click( submit )
  
//   const result = await canvas.findByText( "success" )

//   waitFor( () => {
//     expect( result ).toBeInTheDocument()
//   } )
// }


