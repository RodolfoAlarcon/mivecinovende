import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Alert, Image } from "react-native";
import {
	FlingGestureHandler,
	Directions,
	State,
} from "react-native-gesture-handler";
import { DataTable } from 'react-native-paper';
import { theme } from "./../../styles/theme";
import Icon from 'react-native-vector-icons/Feather';

const Message = ({ time, isLeft, message, onSwipe }: any) => {
	const startingPosition = 0;
	//const x = useSharedValue(startingPosition);
	let countCarrito = 0;
	const isOnLeft = (type: any) => {
		if (isLeft && type === "messageContainer") {
			return {
				alignSelf: "flex-start",
				backgroundColor: "#E1DFF4",
				borderTopLeftRadius: 0,
			};
		} else if (isLeft && type === "message") {
			return {
				color: "#000",
			};
		} else if (isLeft && type === "time") {
			return {
				color: "#fff",
			};
		} else {
			return {
				borderTopRightRadius: 0,
			};
		}
	};



	return (
		<FlingGestureHandler
			direction={isLeft ? Directions.RIGHT : Directions.LEFT}
			onGestureEvent={() => { }}
			onHandlerStateChange={({ nativeEvent }) => {
				if (nativeEvent.state === State.ACTIVE) {
					onSwipe(message, isLeft);
				}
			}}
		>

			<View style={[styles.container]}>

				{(Array.isArray(message)) ?
					<View
						style={[
							styles.messageContainerPoduct,
							isOnLeft('messageContainer'),
						]}
					>
						<View style={{ width: "100%", flexDirection: "row", height: 50, paddingTop: 5, backgroundColor: '#453091', borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
							<View style={{ width: "25%", justifyContent: "center", alignItems: "center" }}>
								<Text style={{ fontSize: 12, color: 'white' }}> Cant. </Text>
							</View>
							<View style={{ width: "25%", justifyContent: "center", alignItems: "center" }}>
								<Text style={{ fontSize: 12, color: 'white' }}> Producto </Text>
							</View>
							<View style={{ width: "25%", justifyContent: "center", alignItems: "center" }}>
								<Text style={{ fontSize: 12, color: 'white' }}> P. Unit </Text>
							</View>
							<View style={{ width: "25%", justifyContent: "center", alignItems: "center" }}>
								<Text style={{ fontSize: 12, color: 'white' }}> Total </Text>
							</View>
						</View>
						{
							console.log(message.length)
						}
						{message.map((n) => (
							<View style={{ width: "100%", flexDirection: "row", height: 50, paddingTop: 5, backgroundColor: 'grey' }}>
								<View style={{ width: "25%", justifyContent: "center", alignItems: "center" }}>
									<Text style={{ fontSize: 12, color: 'black' }}> {n.cantidad <= 10 ? '0' + n.cantidad : n.cantidad} </Text>
								</View>
								<View style={{ width: "25%", justifyContent: "center", alignItems: "center" }}>
									<Text style={{ fontSize: 12, color: 'black' }}> {n.nombre} </Text>
								</View>
								<View style={{ width: "25%", justifyContent: "center", alignItems: "center" }}>
									<Text style={{ fontSize: 12, color: 'black' }}> {n.cantidad} </Text>
								</View>
								<View style={{ width: "25%", justifyContent: "center", alignItems: "center" }}>
									<Text style={{ fontSize: 12, color: 'black' }}> ${n.precios / n.cantidad} </Text>
								</View>
							</View>
						))}
						<View style={{flexDirection:"row", backgroundColor:"grey",borderBottomLeftRadius: 15, borderBottomRightRadius: 15,}}>
							<View style={{height:50,justifyContent:"center",alignItems:"center",width:"30%"}}>
								<Text style={{ fontSize: 12, color: 'black' }}>
									VALOR TOTAL
								</Text>
							</View>
							<View style={{width:"22%"}}></View>
							<View style={{width:"23%"}}></View>
							<View style={{height:50,justifyContent:"center",alignItems:"center",width:"25%"}}>
								<Text style={{ fontSize: 14, color: 'black'}}>
									{message.map((n) => { countCarrito = countCarrito + n.precios })}
									${countCarrito}
								</Text>
							</View>
						</View>
						<View style={styles.timeView}>
								<Text style={[styles.time, isOnLeft("time")]}>
									{time}
								</Text>
							</View>

					</View>
					:
					<View
						style={[
							styles.messageContainer,
							isOnLeft('messageContainer'),
						]}
					>
						<View style={styles.messageView}>
							<Text style={[styles.message, isOnLeft("message")]}>
								{message}
							</Text>
						</View>
						<View style={styles.timeView}>
							<Text style={[styles.time, isOnLeft("time")]}>
								{time}
							</Text>
						</View>
					</View>
				}



			</View>
		</FlingGestureHandler>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: 10,
		marginVertical: 5,
	},
	messageContainer: {
		backgroundColor: "#5541B7",
		maxWidth: "80%",
		alignSelf: "flex-end",
		flexDirection: "row",
		borderRadius: 15,
		paddingHorizontal: 10,
		marginHorizontal: 10,
		paddingTop: 5,
		paddingBottom: 10,
	},
	messageView: {
		backgroundColor: "transparent",
		maxWidth: "80%",
	},
	timeView: {
		backgroundColor: "transparent",
		justifyContent: "flex-end",
		paddingLeft: 10,
	},
	message: {
		color: "white",
		alignSelf: "flex-start",
		fontSize: 15,
	},
	messageContainerPoduct: {
		borderTopLeftRadius: 15, 
		borderTopRightRadius: 15,
		marginHorizontal: 10,
		paddingBottom: 10,
	},
	time: {
		color: "lightgray",
		alignSelf: "flex-end",
		fontSize: 10,
	},
});

export default Message;
