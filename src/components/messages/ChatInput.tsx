import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Platform,
	TouchableOpacity,
	BackHandler
} from "react-native";
import { AuthContex } from '../../context/UsuarioContext'
import { io } from 'socket.io-client';
import Icon from 'react-native-vector-icons/Feather';
import EmojiPicker from "./emojis/EmojiPicker";
import { theme } from "./../../styles/theme";
import { useNavigation } from "@react-navigation/native";

export const ChatInput = ({ reply, closeReply, isLeft, username, idChat, idProprietor, id_business, idBusiness}: any) => {
	const [message, setMessage] = useState("");
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const { user, postChat, socketIO, ...chats } = useContext(AuthContex);
	const navigator = useNavigation();
	const baseUrl = `https://vecinovendechat.herokuapp.com`; 
	const socket = io(baseUrl, {transports: ['websocket']})
	
	async function sendMessage(msg:any) {

		let ref = ''
		if(idProprietor == user.id){

			ref = id_business
		}else{
			ref = user.id
		}

		let stateUSer = true;//borrar y cambiar por el status de usuario
		if (stateUSer) {
		  
			socket.emit('chatAlone', {
				room: idChat, 
				idSender: ref,
				id_user: user.id, 
				msg:msg,
				token: user.access_token,
				idBusiness: id_business,
				idProprietor: idProprietor,
			}) 
			setMessage('')
		}}

		
	return (
		<View style={styles.container}>
			{reply ? (
				<View style={styles.replyContainer}>
					<TouchableOpacity
						onPress={closeReply}
						style={styles.closeReply}
					>
						<Icon name="close" color="#000" size={20} />
					</TouchableOpacity>
					<Text style={styles.title}>
						Response to {isLeft ? username : "Me"}
					</Text>
					<Text style={styles.reply}>{reply}</Text>
				</View>
			) : null}
			<View style={styles.innerContainer}>
				<View style={styles.inputAndMicrophone}>
					<TouchableOpacity
						style={styles.emoticonButton}
						onPress={() => setShowEmojiPicker((value) => !value)}
					>
						<Icon
							name={
								showEmojiPicker ? "close" : "x-circle"
							}
							size={23}
							color="#fff"
						/>
					</TouchableOpacity>
					<TextInput
						multiline
						placeholder={"Type something..."}
						style={styles.input}
						value={message}
						onChangeText={(text) => setMessage(text)}
					/>
					{/*<TouchableOpacity style={styles.rightIconButtonStyle}>
						<Icon
							name="paperclip"
							size={23}
							color={theme.colors.description}
						/>
					</TouchableOpacity>
					<TouchableOpacity style={styles.rightIconButtonStyle}>
						<Icon
							name="camera"
							size={23}
							color={theme.colors.description}
						/>
						</TouchableOpacity>*/}
				</View>
				<TouchableOpacity style={styles.sendButton}
					onPress={()=>sendMessage(message)}
				> 
					<Icon
						name={"navigation"}
						size={23}
						color={theme.colors.white}
					/> 
				</TouchableOpacity>
			</View>
			<EmojiPicker />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		backgroundColor: theme.colors.white,
	},
	replyContainer: {
		paddingHorizontal: 10,
		marginHorizontal: 10,
		justifyContent: "center",
		alignItems: "flex-start",
	},
	title: {
		marginTop: 5,
		fontWeight: "bold",
	},
	closeReply: {
		position: "absolute",
		right: 10,
		top: 5,
	},
	reply: {
		marginTop: 5,
	},
	innerContainer: {
		paddingHorizontal: 10,
		marginHorizontal: 10,
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
		paddingVertical: 10,
	},
	inputAndMicrophone: {
		flexDirection: "row",
		backgroundColor: "#D8D8D8",
		flex: 3,
		marginRight: 10,
		paddingVertical: Platform.OS === "ios" ? 10 : 0,
		borderRadius: 30,
		alignItems: "center",
		justifyContent: "space-between",
	},
	input: {
		backgroundColor: "transparent",
		paddingLeft: 20,
		color: theme.colors.inputText,
		flex: 3,
		fontSize: 15,
		height: 50,
		alignSelf: "center",
	},
	rightIconButtonStyle: {
		justifyContent: "center",
		alignItems: "center",
		paddingRight: 15,
		paddingLeft: 10,
		borderLeftWidth: 1,
		borderLeftColor: "#fff",
	},
	swipeToCancelView: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 30,
	},
	swipeText: {
		color: theme.colors.description,
		fontSize: 15,
	},
	emoticonButton: {
		justifyContent: "center",
		alignItems: "center",
		paddingLeft: 10,
	},
	recordingActive: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingLeft: 10,
	},
	recordingTime: {
		color: theme.colors.description,
		fontSize: 20,
		marginLeft: 5,
	},
	microphoneAndLock: {
		alignItems: "center",
		justifyContent: "flex-end",
	},
	lockView: {
		backgroundColor: "#eee",
		width: 60,
		alignItems: "center",
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		height: 130,
		paddingTop: 20,
	},
	sendButton: {
		backgroundColor: "#453091",
		borderRadius: 50,
		height: 50,
		width: 50,
		alignItems: "center",
		justifyContent: "center",
	},
});


