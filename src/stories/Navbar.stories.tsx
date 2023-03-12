import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Navbar from '../../components/Navbar';
import { BrowserRouter } from 'react-router-dom';
import { styles } from '../../components/Navbar/build/NavbarStyles';
import Fallback from '../../components/custom/Fallback';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Navbar',
  component: Navbar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Navbar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Navbar> = (args) => <BrowserRouter>
<Navbar {...args} /></BrowserRouter>;

const TemplateLoading: ComponentStory<typeof Navbar> = (args) => (
<BrowserRouter>
  <nav className={ styles.navbar_wrap }>
    <Fallback
      width={ "var(--icon-size)" }               
      height={ "var(--icon-size)" }               
      />
    <Fallback
      width={ "calc( 12ch )" }
      height={ "var(--title-size)" }
    />  
    <Fallback 
      width={ "var(--icon-size)" }
      height={ "var(--icon-size)" }
      borderRadius={ "50%" }
    /> 
  </nav>
</BrowserRouter>
);

export const Primary = Template.bind({});
Primary.args = {}

export const Loading = TemplateLoading.bind({});
Primary.args = {}