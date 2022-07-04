import React from 'react'
import { ScrollView } from 'react-native'

import ConversationItem from './ConversationItem';

const Conversations = ({ children }:any) => {
	return (
		<ScrollView>
			{children}
			<ConversationItem
				picture="https://images.pexels.com/photos/2078265/pexels-photo-2078265.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
				username="azx"
				bio="my name is Mercy azx"
				lastMessage="Hello there"
				time="4:00 PM"
				notification="3"
				isBlocked
				isMuted
				hasStory
			/>
				<ConversationItem
				picture="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
				username="burger"
				bio="my name is Mercy Burger"
				lastMessage="Hello there"
				time="4:00 PM"
				notification="3"
				isBlocked
				isMuted
				hasStory
			/>

		</ScrollView>
	)
}

export default Conversations