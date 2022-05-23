import * as React from 'react';
import { TextInput } from 'react-native-paper';
import {color} from '../styles/colors'

const TextClient = (props:any) => {
  const [text, setText] = React.useState("");

  return (
    <TextInput
    label={props.label}
    value={props.value}
    outlineColor={color.PRIMARYCOLOR}
    activeOutlineColor={color.PRIMARYCOLOR}
    style={{
        width:"100%"
    }}
    />
  );
};

export default TextClient;