import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import HomeLayout from '../layouts/HomeLayout';
import { RouterProvider, createBrowserRouter, useRouteError } from 'react-router-dom';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/home/layouts/HomeLayout',
  component: HomeLayout,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof HomeLayout>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const router = ( args: any ) => createBrowserRouter( [ {
  path: "*",
  element: <HomeLayout>
    <div>hello</div>
  </HomeLayout>,
  ErrorBoundary: ( err ) => {
    let error = useRouteError();
    console.error( (error as any)?.data );

    return <div>hey</div>
  }
} ] )

const router_2 = ( args: any ) => createBrowserRouter( [ {
  path: "*",
  element: <HomeLayout>
        <div style={ { width: "100%", height:"111vh" } }>
            hello
        </div>
  </HomeLayout>,
  ErrorBoundary: ( err ) => {
    let error = useRouteError();
    console.error( (error as any)?.data );

    return <div>hey</div>
  }
} ] )
const Template: ComponentStory<typeof HomeLayout> = (args) => <RouterProvider router={ router( args ) }/>
const Template2: ComponentStory<typeof HomeLayout> = (args) => <RouterProvider router={ router_2( args ) }/>

export const Primary = Template.bind({});
Primary.args = {}

export const Scroll = Template2.bind({});
Scroll.args = {}