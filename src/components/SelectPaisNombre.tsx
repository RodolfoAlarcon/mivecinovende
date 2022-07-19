import React from "react";
import { View, StyleSheet } from "react-native";
import { color } from "../styles/colors";
import RNPickerSelect from 'react-native-picker-select';
//import { reduce } from "core-js/core/array";


function SelectPaisNumero(props){


    return(

		<View style={styles.container}>
			<RNPickerSelect	
				value={props.value}
				placeholder={{
					label: 'selecione',
					value: '',
					color: color.SECONDARYCOLOR,
				}}
				onValueChange={props.onValueChange}
				items={[
					{ label: 'Ecuador', value: '1', },
					{ label: 'Venezuela', value: '2' },
				]}

			/>
		</View>


    )


}

const styles = StyleSheet.create({
	container:{
		borderWidth: 1,
		borderColor: 'red',
		borderBottomColor: color.PRIMARYCOLOR,
		color:color.PRIMARYCOLOR
	},
});

export default SelectPaisNumero