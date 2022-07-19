import React, { useState } from "react";
import { View, Text } from "react-native";

import ChatHeader from "./../../../components/messages/ChatHeader";
import ChatInput from "./../../../components/messages/ChatInput";
import MessagesList from "./../../../components/messages/MessagesList";

export const MessagesScreen = ({ navigation, route }:any) => {
	const { username, bio, picture, isBlocked, isMuted, idChat } = route.params;
	const [reply, setReply] = useState("");
	const [isLeft, setIsLeft] = useState();

	const swipeToReply = (message:any, isLeft:any) => {
		setReply(message.length > 50 ? message.slice(0, 50) + '...' : message);
		setIsLeft(isLeft);
	};

	const closeReply = () => {
		setReply("");
	};

	return (
		<View style={{ flex: 1 }}>
			<ChatHeader
				onPress={() => {}}
				username={username}
				picture={picture}
				onlineStatus={'Online'}
				bio={''}
	
			/>
			<MessagesList onSwipeToReply={swipeToReply} /> 
			<ChatInput reply={reply} isLeft={isLeft} closeReply={closeReply} username={username} idChat={idChat} />
		</View>
	);
};


 