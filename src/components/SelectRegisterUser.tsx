import React from "react";
import { View, StyleSheet } from "react-native";
import { color } from "../styles/colors";
import RNPickerSelect from 'react-native-picker-select';
//import { reduce } from "core-js/core/array";


function SelectRegisterUser(props:any){

    return( 

		<View style={styles.container}>
			<RNPickerSelect	

				placeholder={props.placeholder}
				
				items={props.data}
				disabled={props.disabled}
				value={props.value}
				onValueChange={props.onValueChange}
				style={{
					placeholder:{color:"#565656"}
				}} 
			/>
		</View>


    )


}

const styles = StyleSheet.create({
	container:{
		color:color.PRIMARYCOLOR,
		backgroundColor:'#F0F0F0',
		borderTopLeftRadius: 4,
		borderTopRightRadius: 4,
		borderBottomLeftRadius: 4,
		borderBottomRightRadius: 4,
	},
});

export default SelectRegisterUser