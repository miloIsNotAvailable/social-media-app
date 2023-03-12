import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Fallback from '../../components/custom/Fallback';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Fallback',
  component: Fallback,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Fallback>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Fallback> = (args) => <Fallback {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    width: "4rem",
    height: "2rem"
}