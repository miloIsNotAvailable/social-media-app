import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Login from '../../components/auth';
import { BrowserRouter } from 'react-router-dom';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Login',
  component: Login,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Login>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Login> = (args) => <BrowserRouter>
<Login {...args} /></BrowserRouter>;

export const Primary = Template.bind({});