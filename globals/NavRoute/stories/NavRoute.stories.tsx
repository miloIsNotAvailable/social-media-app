import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import NavRoute from '../modules/NavRoute';
import { BrowserRouter } from 'react-router-dom';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/NavRoute',
  component: NavRoute,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof NavRoute>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof NavRoute> = (args) => <BrowserRouter>
<NavRoute {...args} /></BrowserRouter>;

export const Primary = Template.bind({});
Primary.args = {
    mainpage: "home",
    section: "communities",
    element: "lorem-ipsum"
}