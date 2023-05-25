import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TopNavbar from '../navbars/TopNavbar';
import { RouterProvider, createBrowserRouter, useRouteError } from 'react-router-dom';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/home/navbars/TopNavbar',
  component: TopNavbar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof TopNavbar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const router = ( args: any ) => createBrowserRouter( [ {
  path: "*",
  element: <TopNavbar />,
  ErrorBoundary: ( err ) => {
    let error = useRouteError();
    console.error( (error as any)?.data );

    return <div>hey</div>
  }
} ] )
const Template: ComponentStory<typeof TopNavbar> = (args) => <RouterProvider router={ router( args ) }/>

export const Primary = Template.bind({});
Primary.args = {}