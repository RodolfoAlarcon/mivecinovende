import React from 'react'
import {StyleSheet, TouchableOpacity, Image, TextInput} from 'react-native'
import { Input} from 'react-native-elements'
import { color } from '../styles/colors';
import { type } from 'os';

export default function MyTextInput(props: any){

    

    return(
        <TextInput
          editable={props.editable}
          label={props.label}
          placeholder={props.placeholder}
          onChangeText={props.onChangeText}
          value={props.value}
          numberOfLines={props.numberOfLines}
          multiline={props.multiline}
          keyboardType={props.keyboardType}
          style={styles.Mytextinput}
          color='#453091'
          placeholderTextColor="#565656" 
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
      borderRadius:50,
      backgroundColor:'#F0F0F0',
      overflow:'hidden',
      height:55,
      paddingHorizontal:15
    }
})


