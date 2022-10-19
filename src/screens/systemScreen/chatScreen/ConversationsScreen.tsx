import React, { useContext, useState } from 'react'
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, TextInput, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';

import Conversations from './../../../components/Conversations';
//import SearchInput from '../components/common/SearchInput';

import { theme } from './../../../styles/theme';
import { fabStyles } from '../../../styles/stylesChat';
import SafeAreaView from 'react-native-safe-area-view';
import { ScrollView } from 'react-native-gesture-handler';


export const ConversationsScreen = (props: any) => {

	const [buscador, setBuscador] = useState("");

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#453091" }}>
			<ScrollView>
			<ImageBackground source={require('../../../sources/img/Background.jpg')} resizeMode="cover" style={styles.BannerTitulo}>
				<Text style={styles.TituloBan}>
					Ubicación
				</Text>
				<View style={styles.cajita}></View>
			</ImageBackground>
			<View style={styles.container}>
				<Icon size={20} name="search" color="#b5b2b2" style={{position:"absolute",top:10,left:35,zIndex:9}}/>
				<TextInput
					style={styles.buscador}
					placeholder='Buscar'
					onChangeText={setBuscador}
					value={buscador}
					color='#453091'
					placeholderTextColor="#565656"
				/>
							<Conversations >
				{/*<SearchInput />*/}
			</Conversations>
			</View>
			{/*<TouchableOpacity onPress={() => {}} style={fabStyles.style}>
				<Icon name="bell" size={30} color={theme.colors.primary} />
	</TouchableOpacity>*/}
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	TituloBan: {
		color: '#fff',
		fontSize: 20,
		fontWeight: '600',
	},
	cajita: {
		width: "95%",
		backgroundColor: "#ffffff",
		height: 35,
		position: "absolute",
		bottom: 0,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		marginHorizontal:"2.5%"
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
		backgroundColor:'#F0F0F0',
		width: "90%",
		marginHorizontal: "5%",
		marginBottom: 20,
		borderRadius: 25,
		paddingLeft: 35
	},
	container: {
        minHeight: Dimensions.get("window").height - 120,
        backgroundColor:"#fff",
        width:"95%",
        marginHorizontal:"2.5%",
		paddingHorizontal:10
    },
});