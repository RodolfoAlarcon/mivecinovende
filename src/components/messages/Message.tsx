import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Alert, Image, TouchableOpacity, Modal } from "react-native";
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

	const [modalDescripcion, setModalDescripcion] = useState('');



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
						<View style={{ width: "100%", flexDirection: "row", height: 40, paddingTop: 5, backgroundColor: '#453091', borderTopLeftRadius: 15 }}>
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

						{message.map((n, index) => (

							<View style={[{ width: "100%", flexDirection: "row", height: 40, paddingTop: 5 }, { backgroundColor: index % 2 === 0 ? '#E5E5E5' : '#EFEFEF' }]}>
								<View style={{ width: "25%", justifyContent: "center", alignItems: "center" }}>
									<Text style={{ fontSize: 12, color: '#A8A8A8' }}> {n.cantidad <= 10 ? '0' + n.cantidad : n.cantidad} </Text>
								</View>
								<View style={{ width: "25%", justifyContent: "center", alignItems: "center" }}>
									<TouchableOpacity
										onPress={
											() => setModalDescripcion(n.id)
										}
										style={{ justifyContent: "center", alignItems: "center", width: "100%" }}
									>
										<Text style={{ fontSize: 12, color: '#A8A8A8' }}> {n.nombre} </Text>
									</TouchableOpacity>
									{modalDescripcion ? (
										modalDescripcion === n.id ?
											<Modal
												animationType="slide"
												transparent={true}
												visible={true}
											>
												<View style={{ justifyContent: "center", alignItems: "center", flex: 1, backgroundColor: "#0000005c", }}>
													<View style={{ width: 300, borderRadius: 15, backgroundColor: "#fff",overflow:"hidden"}}>
														<Image
															source={(n.foto == '') ? require('../../sources/img/Captura.jpg') : { uri: n.foto }}
															style={{ width: 300, height: 200, resizeMode:"cover", marginBottom:15 }}
														/>
														<Text style={{color:'#453091', fontWeight:"900",fontSize:18, paddingHorizontal:15}}>
															{n.nombre}
														</Text>
														<Text style={{color:'#453091', fontWeight:"500",fontSize:18, paddingHorizontal:15}}>
															Precio: ${n.precios}
														</Text>
														<Text style={{color:'#453091', fontWeight:"500",fontSize:16, paddingHorizontal:15}}>
															descripción:
														</Text>
														<Text style={{color:'#453091', fontWeight:"500",fontSize:16, paddingHorizontal:15}}>
															{n.descripcion}
														</Text>
														<TouchableOpacity 
															style={{ backgroundColor: '#9175DC', width:"60%",height:45, borderRadius:50, justifyContent:"center", alignItems:"center",marginHorizontal:"20%",marginVertical:20}}
															onPress={() => { setModalDescripcion('') }}
														>
															<Text style={{color:"#fff", fontWeight:"900"}}>
																Regresar
															</Text>
														</TouchableOpacity>
													</View>
												</View>
											</Modal> : <>
											</>

									) : null}
								</View>
								<View style={{ width: "25%", justifyContent: "center", alignItems: "center" }}>
									<Text style={{ fontSize: 12, color: '#A8A8A8' }}> {n.cantidad} </Text>
								</View>
								<View style={{ width: "25%", justifyContent: "center", alignItems: "center" }}>
									<Text style={{ fontSize: 12, color: '#A8A8A8' }}> ${n.precios / n.cantidad} </Text>
								</View>
							</View>
						))}
						<View style={[{ flexDirection: "row" }, { backgroundColor: message.length % 2 === 0 ? '#E5E5E5' : '#EFEFEF' }]}>
							<View style={{ height: 40, justifyContent: "center", alignItems: "center", width: "30%" }}>
								<Text style={{ fontSize: 12, color: '#453091' }}>
									VALOR TOTAL
								</Text>
							</View>
							<View style={{ width: "22%" }}></View>
							<View style={{ width: "23%" }}></View>
							<View style={{ height: 40, justifyContent: "center", alignItems: "center", width: "25%" }}>
								<Text style={{ fontSize: 14, color: '#453091' }}>
									{message.map((n) => { countCarrito = countCarrito + n.precios })}
									${countCarrito}
								</Text>
							</View>
						</View>
						<View style={styles.timeView}>
							<Text style={[styles.time, isOnLeft("time"), { marginRight: 5, marginTop: 5 }]}>
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
		borderRadius: 15,
		marginHorizontal: 10,
		paddingBottom: 10,
		backgroundColor: "#E5E5E5",
	},
	time: {
		color: "lightgray",
		alignSelf: "flex-end",
		fontSize: 10,
	},
});

export default Message;
