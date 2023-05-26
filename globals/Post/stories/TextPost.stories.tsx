import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Text from '../modules/Text';
import { BrowserRouter } from 'react-router-dom';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'globals/Post/Text',
  component: Text,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Text>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Text> = (args) => <BrowserRouter>
<Text {...args} /></BrowserRouter>;

export const Primary = Template.bind({});
Primary.args = {}