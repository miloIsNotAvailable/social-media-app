import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Flair from '../scenes/PostHeader';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../../../router/graphqlClient';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'globals/Post/Flairs',
  component: Flair,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Flair>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Flair> = (args) => 
<QueryClientProvider client={ queryClient }>
<BrowserRouter>
<Flair {...args} /></BrowserRouter>
</QueryClientProvider>

export const Primary = Template.bind({});
Primary.args = {
    community_name: "hello",
    community_id: "1234",
    flairs: [ "big flair", "bigger flair" ]
}
