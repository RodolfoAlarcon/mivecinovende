import React, { useContext } from 'react'
import { ScrollView } from 'react-native'
import { AuthContex } from '../context/UsuarioContext'
import ConversationItem from './ConversationItem';

const Conversations = ({ children }: any, props: any) => {
	const { chats, user } = useContext(AuthContex);

	return (
		<ScrollView>
			{children}
			{chats.map((n: any) => (
				<ConversationItem
					key={n.id}
					picture={n.url_logo}
					username={n.name}
					bio="my name is Mercy azx"
					lastMessage="Hello there"
					time="4:00 PM"
					notification="3"
					idChat={n.id}
					chat={n.chat}
					idBusiness={n.id_business}
					idProprietor={user.id !== n.id_user ? user.id : ''}
					isBlocked
					isMuted
					hasStory
				/>
			))}
		</ScrollView>
	)
}

export default Conversations