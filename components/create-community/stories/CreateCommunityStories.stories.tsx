import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CreateCommunity from '../modules/CreateCommunity';
import { RouterProvider, createBrowserRouter, useRouteError } from 'react-router-dom';
import { setupWorker, graphql } from 'msw'
import { configure, userEvent, waitFor, within } from '@storybook/testing-library';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../../../router/graphqlClient';
import { action } from '../actions/createCommunityCheck';

configure( {
  testIdAttribute: "id"
} )

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/communities/modules/create-community',
  component: CreateCommunity,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof CreateCommunity>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const router = ( args: any ) => createBrowserRouter( [ {
  path: "*",
  element: <CreateCommunity />,
  action: action,
  ErrorBoundary: ( err ) => {
    let error = useRouteError();
    console.error( (error as any)?.data );

    return <div>hey</div>
  }
} ] )
const Template: ComponentStory<typeof CreateCommunity> = (args) => <QueryClientProvider client={ queryClient }>
  <RouterProvider router={ router( args ) }/>
  </QueryClientProvider>

export const Primary = Template.bind({});
Primary.args = {}

const handlers = [
  graphql.mutation( "CreateCommunity", ( req, res, ctx ) => {
    return res( 
      // ctx.delay( 1000 ),
      ctx.data( {
          communities: {
            title: "hello"
          }
      } )
     )
  } )
] 

if (typeof global.process === 'undefined') {
  const worker = setupWorker( ...handlers )
  worker.start()
}

Primary.play = async( { canvasElement } ) => {
  
  // worker.start()
  const canvas = within(canvasElement);
  const title = await canvas.findByTestId( "community-name" )
  const submit = await canvas.findByTestId( "submit-community" )

  userEvent.type( title, "hello" )
  userEvent.click( submit )
  
  const result = await canvas.findByText( "success" )

  waitFor( () => {
    expect( result ).toBeInTheDocument()
  } )
}


