import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';

import Conversations from './../../../components/Conversations';
//import SearchInput from '../components/common/SearchInput';

import { theme } from './../../../styles/theme';
import { fabStyles } from '../../../styles/stylesChat'; 

const ConversationsScreen = (props:any) => {
	return (
		<View style={{ backgroundColor: theme.colors.white, flex: 1, marginTop: 15 }}>
			<Conversations>
				{/*<SearchInput />*/}
			</Conversations>
			<TouchableOpacity onPress={() => {}} style={fabStyles.style}>
				<Icon name="bell" size={30} color={theme.colors.primary} />
			</TouchableOpacity>
		</View>
	)
}

export default ConversationsScreen