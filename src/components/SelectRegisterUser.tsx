import React from "react";
import { View, StyleSheet } from "react-native";
import { color } from "../styles/colors";
import RNPickerSelect from 'react-native-picker-select';
//import { reduce } from "core-js/core/array";


function SelectRegisterUser(props){

    return( 

		<View style={styles.container}>
			<RNPickerSelect	

				placeholder={props.placeholder}
				
				items={props.data}
				disabled={props.disabled}
				value={props.value}
				onValueChange={props.onValueChange}

			/>
		</View>


    )


}

const styles = StyleSheet.create({
	container:{
		color:color.PRIMARYCOLOR,
		borderColor:color.PRIMARYCOLOR,
		borderWidth: 1,
		borderTopLeftRadius: 4,
		borderTopRightRadius: 4,
		borderBottomLeftRadius: 4,
		borderBottomRightRadius: 4,
	},
});

export default SelectRegisterUser