import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import NavbarSwitch from '../modules/Switch';
import { BrowserRouter } from 'react-router-dom';
import NavRoute from '@globals/NavRoute/modules/NavRoute';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'globals/Navbars/NavbarSwitch',
  component: NavbarSwitch,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof NavbarSwitch>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof NavbarSwitch> = (args) => <BrowserRouter>
<NavbarSwitch {...args}>
  <NavRoute link={ "lorem/ipsum/" }/>
  <NavRoute link={ "lorem/ipsum/" }/>
  {/* <div>hello</div> */}
  {/* <div>hello</div> */}
</NavbarSwitch></BrowserRouter>;

export const Primary = Template.bind({});