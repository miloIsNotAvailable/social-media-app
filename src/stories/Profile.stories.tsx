import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Profile from '../../components/custom/Profile';
import { BrowserRouter } from 'react-router-dom';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Profile',
  component: Profile,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Profile>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Profile> = (args) => <BrowserRouter>
<Profile {...args} /></BrowserRouter>;

export const Primary = Template.bind({});