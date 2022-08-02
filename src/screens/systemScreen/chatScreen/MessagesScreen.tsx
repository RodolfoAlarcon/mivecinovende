import React, { useState, useContext, useEffect, useRef} from "react";
import { View, Text,ScrollView } from "react-native";
import { AuthContex } from './../../../context/UsuarioContext'
import ChatHeader from "./../../../components/messages/ChatHeader";
import {ChatInput} from "./../../../components/messages/ChatInput";
import MessagesList from "./../../../components/messages/MessagesList";
import Message from "./../../../components/messages/Message";
import { theme } from "./../../../styles/theme";

export const MessagesScreen = ({ navigation, route }:any) => {
	const { username, bio, picture, isBlocked, isMuted, idChat, chat, idProprietor, idBusiness } = route.params;
	const [reply, setReply] = useState("");
	const [isLeft, setIsLeft] = useState();
	const [messages, setMessages] = useState(chat);
	const { user } = useContext(AuthContex);
	const swipeToReply = (message:any, isLeft:any) => {
		setReply(message.length > 50 ? message.slice(0, 50) + '...' : message);
		setIsLeft(isLeft);
	};

	const closeReply = () => {
		setReply("");
	};

	const userRef = useRef(user.id);
	const scrollView = useRef();

	const [chatArray, setChatArray] = useState(chat.map((message:any, key:any) => (
		<Message
			key={key}
			time={message.time}
			isLeft={message.sender !== userRef.current}
			message={message.msg}
			onSwipe={swipeToReply}
		/>
	)));

	const nMsg = (msg:any) =>{
		console.log(msg)
		chat.push(msg[0])
		//alert(JSON.stringify(chat))
		//setMessages(chat)
		setChatArray(chat.map((message:any, key:any) => (
			<Message
				key={key}
				time={message.time}
				isLeft={message.sender !== userRef.current}
				message={message.msg}
				onSwipe={swipeToReply}
			/>
		)))

	} 
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
			{chatArray}
		</ScrollView>
			<ChatInput reply={reply} isLeft={isLeft} closeReply={closeReply} username={username} idChat={idChat} idProprietor={idProprietor} id_business={idBusiness} nMsg={nMsg}/>
		</View>
	);
};


/*import React, { useState, useContext, useEffect} from "react";
import { View, Text } from "react-native";
import { AuthContex } from './../../../context/UsuarioContext'
import ChatHeader from "./../../../components/messages/ChatHeader";
import ChatInput from "./../../../components/messages/ChatInput";
import MessagesList from "./../../../components/messages/MessagesList";

export const MessagesScreen = ({ navigation, route }:any) => {
	const { username, bio, picture, isBlocked, isMuted, idChat, chat, idProprietor, idBusiness } = route.params;
	const [reply, setReply] = useState("");
	const [isLeft, setIsLeft] = useState();
	const [chatArray, setChatArray] = useState(chat);
	const [messages, setMessages] = useState();
	const { user,  } = useContext(AuthContex);
	const swipeToReply = (message:any, isLeft:any) => {
		setReply(message.length > 50 ? message.slice(0, 50) + '...' : message);
		setIsLeft(isLeft);
	};

	const closeReply = () => {
		setReply("");
	};
 
	function nMsg(msg:any){
		chat.push(msg[0])
		
		return setMessages(chatArray)
	} 
	useEffect(() => {
		alert(newMsg);
	}, [setNewMsg])
	return (
		<View style={{ flex: 1 }}> 
			<ChatHeader
				onPress={() => {}}
				username={username}
				picture={picture}
				onlineStatus={'Online'}
				bio={''}
	
			/>
			<MessagesList onSwipeToReply={swipeToReply} chat={chatArray} userId={user.id} /> 
			<ChatInput reply={reply} isLeft={isLeft} closeReply={closeReply} username={username} idChat={idChat} idProprietor={idProprietor} id_business={idBusiness} nMsg={nMsg}/>
		</View>
	);
};*/


  