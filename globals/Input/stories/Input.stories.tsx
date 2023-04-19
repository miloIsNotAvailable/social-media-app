import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Form from '../modules/Input';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'globals/Input/modules/default',
  component: Form,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Form>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Form> = (args) => <Form {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  placeholder: "hello"
}