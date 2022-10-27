import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Alert, ScrollView, ImageBackground,TextInput } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import CardBusquedad from '../../components/CardBusquedad'
import { isDeepStrictEqual } from 'util';
import { Buscador } from '../../components/buscador';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';

export const Result = (props: any) => {

    const navigator = useNavigation()
    const { params } = props.route;
    const paramsid = params.id
    const [buscador, setBuscador] = useState("");


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#453091" }}>
                    <ScrollView>
                    <ImageBackground source={require('../../sources/img/Background.jpg')} resizeMode="cover" style={styles.BannerTitulo}>
				<Text style={styles.TituloBan}>
					Conversaciones
				</Text>
				<View style={styles.cajita}></View>
			</ImageBackground>
            <View style={styles.container}> 
            <View>
            <Icon size={20} name="search" color="#b5b2b2" style={{position:"absolute",top:10,left:10,zIndex:9}}/>
				<TextInput
					style={styles.buscador}
					placeholder='Buscar'
					onChangeText={setBuscador}
					value={buscador}
					color='#453091'
					placeholderTextColor="#565656"
				/>
            </View>
            <CardBusquedad
                id={paramsid}
            />
            </View>
        </ScrollView>
        </SafeAreaView>
    )
    function goToScreen(routeName: any, id: any) {
        navigator.navigate(routeName as never, { id: id } as never);
    }

}


const styles = StyleSheet.create({
	buscador: {
		height: 40,
		backgroundColor:'#F0F0F0',
		width: "100%",
		marginBottom: 20,
		borderRadius: 25,
		paddingLeft: 35
	},
    BannerTitulo: {
		width: '100%',
		height: 120,
		backgroundColor: '#000',
		alignItems: 'center',
		paddingTop: 30,
	},
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
	container: {
        minHeight: Dimensions.get("window").height - 120,
        backgroundColor:"#fff",
        width:"95%",
        marginHorizontal:"2.5%",
		paddingHorizontal:15
    },
});