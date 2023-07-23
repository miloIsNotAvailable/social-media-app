import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import NavbarTop from '../modules/Default';
import { BrowserRouter } from 'react-router-dom';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'globals/Navbars/NavbarTop',
  component: NavbarTop,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof NavbarTop>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof NavbarTop> = (args) => <BrowserRouter>
<NavbarTop {...args} /></BrowserRouter>;

export const Primary = Template.bind({});