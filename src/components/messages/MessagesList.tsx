import React, { useState, useRef, useEffect } from "react";
import { ScrollView } from "react-native";

import Message from "./Message";

import { theme } from "./../../styles/theme";

const MessagesList = ({ onSwipeToReply, chat, userId, nMsg }:any) => {
	//const [messages, setMessages] = useState(chat);

	const user = useRef(userId);
	const scrollView = useRef();
	/*useEffect(() => {
	alert('hola desdde msj')
	}, [setMessages])*/
	return (
		<ScrollView style={{ backgroundColor: theme.colors.white, flex: 1 }}
			ref={ref => scrollView.current = ref}
			onContentChange={() => {
				scrollView.current.scrollToEnd({ animated: true })
			}}
		> 
			{chat.map((message:any,key:any) => (
				<Message
					key={key}
					time={message.time}
					isLeft={message.sender !== user.current}
					message={message.msg}
					onSwipe={onSwipeToReply}
				/>
			))}
		</ScrollView>
	);
};

export default MessagesList;
