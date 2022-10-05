import React, { useState, useContext, useEffect, useRef} from "react";
import { View, Text,ScrollView } from "react-native";
import { AuthContex } from './../../../context/UsuarioContext'
import ChatHeader from "./../../../components/messages/ChatHeader";
import {ChatInput} from "./../../../components/messages/ChatInput";
import MessagesList from "./../../../components/messages/MessagesList";
import Message from "./../../../components/messages/Message";
import { theme } from "./../../../styles/theme";
import { getChats } from './../../../storage/ChatsAsyncStorage'

export const MessagesScreen = ({ navigation, route }:any) => {

	const { username, bio, picture, isBlocked, isMuted, idChat, chat, idProprietor, idBusiness } = route.params;
	const [reply, setReply] = useState("");
	const [isLeft, setIsLeft] = useState();
	const { user, chats } = useContext(AuthContex);
	const [messages, setMessages] = useState(chats);

	const swipeToReply = (message:any, isLeft:any) => {
		setReply(message.length > 50 ? message.slice(0, 50) + '...' : message);
		setIsLeft(isLeft);
	};

	const closeReply = () => {
		setReply("");
	};

	let stateChats = messages.filter((n: any) => n.id == idChat);

        if (stateChats.length == 2) {
			stateChats = stateChats[0]
		}else if(stateChats.length == 1){
			stateChats = stateChats[0]
		}
	
	let ref = ''

	if(idProprietor == user.id){

		ref = idBusiness
	}else{
		ref = user.id
	}

	const scrollView = useRef();

	return (
		<View style={{ flex: 1 }}> 
			<ChatHeader
				onPress={() => {}}
				username={username}
				picture={picture}
				onlineStatus={'Online'}
				bio={''}
				idChat={idChat}
	
			/>
			{/*<MessagesList onSwipeToReply={swipeToReply} chat={messages} userId={user.id} /> */}
			<ScrollView style={{ backgroundColor: theme.colors.white, flex: 1 }}
			ref={ref => scrollView.current = ref}
			onContentChange={() => {
				scrollView.current.scrollToEnd({ animated: true })
			}}
		> 
			{stateChats.chat.map((message:any, key:any) => (
			<Message
				key={key}
				time={message.time}
				isLeft={message.sender !== ref}
				message={message.msg}
				onSwipe={swipeToReply}
			/>
		))}
		</ScrollView>
			<ChatInput reply={reply} isLeft={isLeft} closeReply={closeReply} username={username} idChat={idChat} idProprietor={idProprietor} id_business={idBusiness} idBusiness={idBusiness} />
		</View>
	);
};

