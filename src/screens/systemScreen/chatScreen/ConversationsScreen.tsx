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
		<View style={{ backgroundColor: theme.colors.white, flex: 1 }}>
			<ImageBackground source={require('../../../sources/img/Background.jpg')} resizeMode="cover" style={styles.BannerTitulo}>
				<Text style={styles.TituloBan}>
					Ubicación
				</Text>
				<View style={styles.cajita}></View>
			</ImageBackground>
			<View>
				<Icon size={20} name="search" color="#b5b2b2" style={{position:"absolute",top:10,left:25,zIndex:9}}/>
				<TextInput
					style={styles.buscador}
					placeholder='Buscar'
					onChangeText={setBuscador}
					value={buscador}
				/>
			</View>
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
	cajita: {
		width: "100%",
		backgroundColor: "#ffffff",
		height: 35,
		position: "absolute",
		bottom: 0,
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
	buscador: {
		height: 40,
		backgroundColor: "#949ea5",
		width: "90%",
		marginHorizontal: "5%",
		marginBottom: 20,
		borderRadius: 25,
		paddingLeft: 35
	}
});