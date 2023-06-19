import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, configure, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import Text from '../modules/Text';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../../../router/graphqlClient';

configure( {
  testIdAttribute: "id"
} )

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'globals/Post/Text',
  component: Text,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Text>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Text> = (args) => 
<QueryClientProvider client={ queryClient }>
<BrowserRouter>
<Text {...args} /></BrowserRouter>
</QueryClientProvider>

export const Primary = Template.bind({});
Primary.args = {
  content: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available",
  title: "lorem ipsum"
}

Primary.play = async( { canvasElement } ) => {
  
  const canvas = within(canvasElement);
  const add = await canvas.findByTestId("text-post");
  
  expect( add ).toBeInTheDocument()
}

export const ImagePost = Template.bind({});
ImagePost.args = {
  content: `https://images.unsplash.com/photo-1549989317-6f14743af1bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80`,
  title: "lorem ipsum"
}

ImagePost.play = async( { canvasElement } ) => {

    const canvas = within(canvasElement);
    const add = await canvas.findByRole('img');
    
    waitFor( () => {
      expect( add ).toBeInTheDocument()
    } )
}