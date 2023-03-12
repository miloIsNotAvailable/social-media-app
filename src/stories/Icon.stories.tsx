import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Icon from '../../components/custom/Icon';
import { default as MenuIcon } from '../../imgs/menuIcon.svg'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Icon',
  component: Icon,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Icon>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const IconAsImage = Template.bind({});
IconAsImage.args = {
    src: MenuIcon
}

export const IconAsSvg = Template.bind({});
IconAsSvg.args = {
    children: <svg width="18" height="7" viewBox="0 0 18 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Group 36">
    <g id="Group 35">
    <line id="Line 26" y1="0.5" x2="18" y2="0.5" stroke="white"/>
    <line id="Line 27" y1="6.5" x2="18" y2="6.5" stroke="white"/>
    </g>
    </g>
    </svg>    
}