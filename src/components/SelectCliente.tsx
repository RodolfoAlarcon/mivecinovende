import React ,{ useState  }from "react";
import { View, StyleSheet } from "react-native";
import { color } from "../styles/colors";
import RNPickerSelect from 'react-native-picker-select';
//import { reduce } from "core-js/core/array";


function SelectCliente(props:any){
	let array:any = [];
    
    return( 

		<View style={styles.container}>
			<RNPickerSelect	
				value={props.value}
				placeholder={{
					label: 'selecione',
					value: 'Selecionar',
				}}

				onValueChange={props.onValueChange}
				items={array}


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
        width:'100%'
	},
});

export default SelectCliente