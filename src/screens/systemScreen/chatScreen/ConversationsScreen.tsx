import React, { useContext, useState } from 'react'
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';

import Conversations from './../../../components/Conversations';
//import SearchInput from '../components/common/SearchInput';

import { theme } from './../../../styles/theme';
import { fabStyles } from '../../../styles/stylesChat';


export const ConversationsScreen = (props: any) => {

	const [buscador, setBuscador] = useState("");

	return (
		<View style={{ backgroundColor: theme.colors.white, flex: 1}}>
			<ImageBackground source={require('../../../sources/img/Background.jpg')} resizeMode="cover" style={styles.BannerTitulo}>
				<Text style={styles.TituloBan}>
					Ubicación
				</Text>
				<View style={styles.cajita}></View>
			</ImageBackground>
			<TextInput
			style={styles.buscador}
				placeholder='buscar'
				onChangeText={setBuscador} 
				value={buscador}
			/>
			<Conversations >
				{/*<SearchInput />*/}
			</Conversations>
			{/*<TouchableOpacity onPress={() => {}} style={fabStyles.style}>
				<Icon name="bell" size={30} color={theme.colors.primary} />
	</TouchableOpacity>*/}
		</View>
	)
}

const styles = StyleSheet.create({
    TituloBan: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
    },
    cajita:{
        width:"100%",
        backgroundColor:"#ffffff",
        height:35,
        position:"absolute",
        bottom:0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
	BannerTitulo: {
        width: '100%',
        height: 120,
        backgroundColor: '#000',
        alignItems: 'center',
        paddingTop: 30,
    },
	buscador:{
		height:40,
		backgroundColor:"grey"
	}
});