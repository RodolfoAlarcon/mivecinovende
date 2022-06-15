import React from 'react'
import {StyleSheet, TouchableOpacity, Image} from 'react-native'
import { Input} from 'react-native-elements'
import {color} from '../styles/colors'
//import Icon from 'react-native-vector-icons/dist/Feather';
import { TextInput } from 'react-native-paper';
import { type } from 'os';

export default function MyTextInput(props: any){

    

    return(
        <TextInput
          mode={'outlined'}
          editable={props.editable}
          label={props.label}
          placeholder={props.placeholder}
          outlineColor={color.PRIMARYCOLOR}
          activeOutlineColor={color.PRIMARYCOLOR}
          onChangeText={props.onChangeText}
          value={props.value}
          numberOfLines={props.numberOfLines}
          multiline={props.multiline}
          keyboardType={props.type}
          style={{width:'100%'}}
        />
            
    )
}

const styles = StyleSheet.create({  

    btnVisibility:
    {
      height: 40,
      width: 35,
      paddingTop: 8,
      paddingLeft:5,
      paddingRight:5
    },
   
    btnImage:
    {
      resizeMode: 'contain',
      height: '100%',
      width: '100%'
    },
})


