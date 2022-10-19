import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import ProfileInfo from './ProfileInfo';

import { theme } from './../styles/theme';

const ConversationItem = ({ picture, username, bio, lastMessage, time, isBlocked, isMuted, notification, hasStory,idChat,idProprietor,idBusiness, chat } : any) => {

	const [modalVisible, setModalVisible] = useState(false);
	const navigation = useNavigation(); 
 
	const showStoryCircle = () => {
		if (hasStory) {
			return {
				borderColor: "#453091",
				borderWidth: 2,
			}
		}
	};

	const showNotification = (type:any) => {
		if (notification && type === "number") {
			return (
				<View style={styles.notificationCircle}>
					<Text style={styles.notification}>{notification}</Text>
				</View>
			);
		} else if (notification && type === "imageCircle") {
			return {
				borderColor: theme.colors.primary
			}
		}
	};

	return (
		<View>
			<TouchableOpacity style={styles.conversation}
			onPress={() => navigation.navigate('MessagesScreen' as never, {
				username: username,
				bio: bio,
				picture: picture,
				isBlocked: isBlocked,
				isMuted: isMuted,
				idChat: idChat,
				chat: chat,
				idBusiness: idBusiness,
				idProprietor: idProprietor
			} as never)}>

				<TouchableOpacity 
					onPress={() => setModalVisible(currentValue => !currentValue)}
					style={[styles.imageContainer, /*showStoryCircle()*/]}>
					<View style={{borderWidth:2,width:50,justifyContent:"center",alignItems:"center", borderRadius:50,height:50, borderColor:"#453091"}}>
						<Image style={styles.image} source={{ uri: picture }} />
					</View>
				</TouchableOpacity>
				<View style={{
						justifyContent: 'center',
						width:"80%",
						flexDirection:"row",
					}}>
					<View style={{
						width:"80%"
					}}>
						<Text numberOfLines={1} style={styles.username}>{username}</Text>
						<Text numberOfLines={1} style={styles.message}>{lastMessage}</Text>
					</View>
					<View style={{
						justifyContent: 'center',
						alignItems:"center",
						width:"20%",
					}}>
						<Text style={styles.time}>{time}</Text>
						{showNotification('number')}
					</View>
				</View>
				
			</TouchableOpacity>

			<Modal animationType="slide" transparent visible={modalVisible}>
				<ProfileInfo
					username={username}
					picture={picture}
					bio={bio}
					isBlocked={isBlocked}
					isMuted={isMuted}
					hide={() => setModalVisible(false)}
				/>
			</Modal>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {

	},
	conversation: {
		flexDirection: 'row',
		paddingBottom: 25,
		width:"100%",
	},
	imageContainer: {
		width:"20%",
		alignItems:"center"
	},
	image: {
		height: 43,
		width: 43,
		resizeMode:"cover",

		borderRadius:50
	},
	username: {
		fontSize: theme.fontSize.title,
		color: "#453091",
		width: 210
	},
	message: {
		fontSize: theme.fontSize.message,
		width: 240,
		color: "#5F577C"
	},
	time: {
		fontSize: theme.fontSize.subTitle,
		color: theme.colors.subTitle,
		fontWeight: '300'
	},
	notificationCircle: {
		backgroundColor: "#453091",
		borderRadius: 50,
		height: 20,
		width: 20,
		marginRight: 5,
		alignItems: 'center',
		justifyContent: 'center'
	},
	notification: {
		color: theme.colors.white,
		fontWeight: 'bold',
		fontSize: 10
	}
})

export default ConversationItem