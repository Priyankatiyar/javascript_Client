import React from 'react';
import { TextField } from '../../components';
import { Slider } from '../../components/slider';
import { Navbar } from '../../layouts/components/Navbar';
import { Div } from '../../components/TextField/style';
import { banners, DEFAULT_BANNER_IMAGE } from '../../configs/constants';

const TextFieldDemo = () => (

  <Div>
    <Navbar />
    &nbsp;&nbsp;&nbsp;
    <div>
      <Slider altText="No Image" duration="2000" height="200" random banner={banners} defaultbanner={DEFAULT_BANNER_IMAGE} />
    </div>

    <p><b>This is a Disabled Input</b></p>
    <TextField disabled value="Disabled Input" />
    <p><b> A Valid Input</b></p>
    <TextField value="Accessible" />
    <p><b>An Input with Errors </b></p>
    <TextField error="Could not be more than" value="101" />
  </Div>
);

export default TextFieldDemo;
