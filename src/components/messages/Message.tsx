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
						<DataTable>
							<DataTable.Row style={{ height: 20, paddingTop: 5, backgroundColor: 'gray' }}>

								<DataTable.Cell style={{ flex: 0.3, borderRightColor: 'white', borderRightWidth: 0.3 }}>
									<Text style={{ fontSize: 12, color: 'white' }}> # </Text>
								</DataTable.Cell>

								<DataTable.Cell style={{ flex: 0.5, borderRightColor: 'white', borderRightWidth: 0.3 }}>
									<Text style={{ fontSize: 12, color: 'white' }}> Foto </Text>
								</DataTable.Cell>

								<DataTable.Cell style={{ flex: 1.6, borderRightColor: 'white', borderRightWidth: 0.3 }}>
									<Text style={{ fontSize: 12, color: 'white' }}> Item </Text>
								</DataTable.Cell>

								<DataTable.Cell style={{ flex: 0.5, borderRightColor: 'white', borderRightWidth: 0.3 }}>
									<Text style={{ fontSize: 12, color: 'white' }}> P. unit </Text>
								</DataTable.Cell>

								<DataTable.Cell style={{ flex: 0.4 }}>
									<Text style={{ fontSize: 12, color: 'white' }}> Total </Text>
								</DataTable.Cell>

							</DataTable.Row>
							{message.map((n) => (
								<DataTable.Row style={{ height: 50, paddingTop: 2, borderBottomWidth: 0.3, borderBottomColor: 'grey' }}>

									<DataTable.Cell style={{ flex: 0.3, borderRightColor: 'grey', borderRightWidth: 0.3 }}>
										<Text style={{ fontSize: 12, color: 'black' }}> { n.cantidad <= 10 ? '0' + n.cantidad : n.cantidad} </Text>
									</DataTable.Cell>

									<DataTable.Cell style={{ flex: 0.5, borderRightColor: 'grey', borderRightWidth: 0.3 }}>
										<Image
											source={{ uri: n.foto }}
											style={{ width: 35, height: 35 }}
										/>
									</DataTable.Cell>

									<View style={{ flex: 1.6, borderRightColor: 'grey', borderRightWidth: 0.3, justifyContent: 'center' }}>
										
											<Text numberOfLines={3} style={{ fontSize: 12, color: 'black', marginLeft:5}}> servicio de albercas y psocinas </Text>
										
									</View>

									<DataTable.Cell style={{ flex: 0.5, borderRightColor: 'grey', borderRightWidth: 0.3, justifyContent: 'center' }}>
										<Text style={{ fontSize: 14, color: 'black' }}> ${n.precios / n.cantidad} </Text>
									</DataTable.Cell>

									<DataTable.Cell style={{ flex: 0.4, justifyContent: 'center' }}>
										<Text style={{ fontSize: 12, color: 'black' }}> ${n.precios} </Text>
									</DataTable.Cell>

								</DataTable.Row>
							))}

							<DataTable.Row style={{ height: 20, paddingTop: 5, borderBottomWidth: 0.3, borderBottomColor: 'grey' }}>
								<DataTable.Cell style={{ flex: 0.4 }}>

								</DataTable.Cell>
								<DataTable.Cell style={{ flex: 0.4 }}>

								</DataTable.Cell>
								<DataTable.Cell style={{ flex: 1.5 }}>
									<Text style={{ fontSize: 12, color: 'black' }}> VALOR TOTAL </Text>
								</DataTable.Cell>

								<DataTable.Cell style={{ flex: 0.6 }}>
									<Text style={{ fontSize: 14, color: 'black' }}> </Text>
								</DataTable.Cell>
								{message.map((n) => { countCarrito = countCarrito + n.precios })}
								<DataTable.Cell style={{ flex: 0.4 }}>
									<Text style={{ fontSize: 14, color: 'black', justifyContent: 'center' }}> ${countCarrito} </Text>
								</DataTable.Cell>

							</DataTable.Row>
							<View style={styles.timeView}>
								<Text style={[styles.time, isOnLeft("time")]}>
									{time}
								</Text>
							</View>
						</DataTable>

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
		backgroundColor: '#fff',
		maxWidth: "95%",
		//alignSelf: "flex-end",
		//flexDirection: "row",
		borderRadius: 15,
		paddingHorizontal: 5,
		marginHorizontal: 5,
		paddingTop: 5,
		paddingBottom: 10,
		marginBottom: 25
	},
	time: {
		color: "lightgray",
		alignSelf: "flex-end",
		fontSize: 10,
	},
});

export default Message;
