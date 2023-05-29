import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CreateCommunity from '../modules/CreateCommunity';
import { RouterProvider, createBrowserRouter, useRouteError } from 'react-router-dom';
import { setupWorker, graphql } from 'msw'
import { within } from '@storybook/testing-library';

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
  ErrorBoundary: ( err ) => {
    let error = useRouteError();
    console.error( (error as any)?.data );

    return <div>hey</div>
  }
} ] )
const Template: ComponentStory<typeof CreateCommunity> = (args) => <RouterProvider router={ router( args ) }/>

export const Primary = Template.bind({});
Primary.args = {}

const handlers = [
  graphql.query( "http://localhost:6006/api/graphiql", ( req, res, ctx ) => {
    return res( 
      ctx.data( {
        communityData: "hello"
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
  
  // expect( add ).toBeInTheDocument()
}


