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
          outlineColor={'#F0F0F0'}
          activeOutlineColor={'#F0F0F0'}
          onChangeText={props.onChangeText}
          value={props.value}
          numberOfLines={props.numberOfLines}
          multiline={props.multiline}
          keyboardType={props.keyboardType}
          style={styles.Mytextinput}
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
    Mytextinput: {
      width:'100%',
      borderRadius:0,
      backgroundColor:'#F0F0F0',
    }
})


