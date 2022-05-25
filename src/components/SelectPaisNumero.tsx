import React ,{ useState  }from "react";
import { View, StyleSheet } from "react-native";
import { color } from "../styles/colors";
import RNPickerSelect from 'react-native-picker-select';
//import { reduce } from "core-js/core/array";


function SelectPaisNumero(props:any){
	let array:any = [];

	props.countrys.countrys.map((n:any )=> {
        let arrayTemnp = { label: n.name, value: n.code_country };
        array.push(arrayTemnp);
        //arrayTemnp = { label: n.nombre, value: n.id };
    })
    

    return( 

		<View style={styles.container}>
			<RNPickerSelect	
				value={props.value}
				placeholder={{
					label: 'Pais',
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
	},
});

export default SelectPaisNumero