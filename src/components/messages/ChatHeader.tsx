import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Feather';
import { theme } from "./../../styles/theme";

const ChatHeader = ({ username, bio, picture, onlineStatus, onPress, idChat }: any) => {
	const navigator = useNavigation();
	return (

			<ImageBackground source={require('../../sources/img/Background.jpg')} resizeMode="cover" style={styles.BannerTitulo}>
				<View style={{ width: "20%", justifyContent: "center", alignItems: "center" }}>
					<TouchableOpacity onPress={() => goToBackScreen()}>
						<Icon name="chevron-left" size={30} color={theme.colors.white} />
					</TouchableOpacity>
				</View>
				<View style={{ width: "60%", justifyContent: "center", alignItems: "center" }}>
					<Text style={styles.username}>{username}</Text>
				</View>
				<View style={{ width: "20%", justifyContent: "center", alignItems: "center" }}>
					<TouchableOpacity>
						<Icon
							name="more-vertical"
							size={30}
							color={theme.colors.white}
						/>
					</TouchableOpacity>
				</View>
				<View style={styles.cajita}></View>
			</ImageBackground>

	);

	async function goToBackScreen() {
		await navigator.goBack()
	}
};

const styles = StyleSheet.create({
	BannerTitulo: {
		width: '100%',
		height: 120,
		backgroundColor: '#000',
		paddingBottom: 30,
		flexDirection: "row",
	},
	image: {
		height: 65,
		width: 65,
		borderRadius: 32.5,
	},
	usernameAndOnlineStatus: {
		flexDirection: "column",
		justifyContent: "center",
		paddingHorizontal: 10,
	},
	username: {
		color: theme.colors.white,
		fontSize: 18,
		fontWeight: "bold",
	},
	onlineStatus: {
		color: theme.colors.white,
		fontSize: 16,
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
});

export default ChatHeader;
