import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Form from '../layouts/FillOutForm';
import { RouterProvider, createBrowserRouter, useRouteError } from 'react-router-dom';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/Auth/layouts/form',
  component: Form,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Form>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const router = ( args: any ) => createBrowserRouter( [ {
  path: "*",
  element: <Form />,
  ErrorBoundary: ( err ) => {
    let error = useRouteError();
    console.error( (error as any)?.data );

    return <div>hey</div>
  }
} ] )
const Template: ComponentStory<typeof Form> = (args) => <RouterProvider router={ router( args ) }/>

export const Primary = Template.bind({});
Primary.args = {}