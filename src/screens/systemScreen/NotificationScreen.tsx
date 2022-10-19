import React, { useContext, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet,  Alert, BackHandler, ScrollView, Image, Modal,ImageBackground, Dimensions } from 'react-native'
import { AuthContex } from '../../context/UsuarioContext'
import SafeAreaView from 'react-native-safe-area-view';
import { useNavigation } from '@react-navigation/native';
import ElementListNotificacion from '../../components/ElementListNotificacion'
import {color} from '../../styles/colors'

export const  NotificationScreen = (props: any) => {
    const {notifications} = useContext(AuthContex)
    console.log(notifications);
        const[modalOpen, setModalOpen] = useState(false);
       
       
   
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "#453091" }}>
			<ScrollView>
			<ImageBackground source={require('../../sources/img/Background.jpg')} resizeMode="cover" style={styles.BannerTitulo}>
				<Text style={styles.TituloBan}>
					Notificación
				</Text>
				<View style={styles.cajita}></View>
			</ImageBackground>
      
            <View style={styles.container}>
            <ElementListNotificacion 
                    notifications = {notifications}
                    colorIcon= {color.BLACK}
                />
            </View>
                </ScrollView>
               
                
            </SafeAreaView>
    
        )
       

}
const styles = StyleSheet.create({
	TituloBan: {
		color: '#fff',
		fontSize: 20,
		fontWeight: '600',
	},
	cajita: {
		width: "95%",
		backgroundColor: "#ffffff",
		height: 35,
		position: "absolute",
		bottom: 0,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		marginHorizontal:"2.5%"
	},
	BannerTitulo: {
		width: '100%',
		height: 120,
		backgroundColor: '#000',
		alignItems: 'center',
		paddingTop: 30,
	},
	buscador: {
		height: 40,
		backgroundColor:'#F0F0F0',
		width: "90%",
		marginHorizontal: "5%",
		marginBottom: 20,
		borderRadius: 25,
		paddingLeft: 35
	},
	container: {
        minHeight: Dimensions.get("window").height - 120,
        backgroundColor:"#fff",
        width:"95%",
        marginHorizontal:"2.5%",
		paddingHorizontal:10
    },
});