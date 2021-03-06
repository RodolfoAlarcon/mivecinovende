import React, { useContext, useEffect } from 'react'
import { Text, View, TouchableOpacity, StatusBar, Alert, BackHandler, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import { DataTable } from 'react-native-paper';
import { AuthContex } from '../../context/UsuarioContext'
import {color} from '../../styles/colors'
import { useNavigation } from '@react-navigation/native';

function useBackButton(handler:any) {
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handler)
        return () => {
            console.log("hardwareBackPress close")
            BackHandler.removeEventListener("hardwareBackPress", handler)
        }
    }, [handler])
}

export default function SettingScreen(props:any) {
    //useBackButton(cerrarSesion)


    const navigator = useNavigation()
    const {user,logOut,} = useContext(AuthContex)


    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <StatusBar
                backgroundColor={color.WHITE}
                barStyle='dark-content'
                translucent={true}
            />
            {console.log(user)}
            <Text style={{ textAlign: 'center', marginTop: 80, fontFamily: 'summernote' }}>CONFIGURACION DE CUENTA </Text>

            <DataTable>

                <TouchableOpacity onPress={() => {}} >

                    <DataTable.Row style={{ height: 70, padding: 10 }}>
                        <DataTable.Cell style={{ flex: 0.3 }}>
                            <View>
                                <Icon size={30} color="grey" name={"user"} />
                            </View>

                        </DataTable.Cell>
                        <DataTable.Cell style={{ flex: 2 }}>
                            <Text style={{ fontSize: 20 }}> Editar Perfil </Text>
                        </DataTable.Cell>

                        <DataTable.Cell style={{ flex: 0.3 }}>
                            <View>
                                <Image source={require('../../sources/img/arrow.png')} style={{ height: 15, width: 15 }} />
                            </View>
                        </DataTable.Cell>

                    </DataTable.Row>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {}} >

                    <DataTable.Row style={{ height: 70, padding: 10 }}>
                        <DataTable.Cell style={{ flex: 0.3 }}>
                            <View>
                                <Icon size={30} color="grey" name={"shield"} />
                            </View>

                        </DataTable.Cell>
                        <DataTable.Cell style={{ flex: 2 }}>
                            <Text style={{ fontSize: 20 }} > Cambiar Contrase??a </Text>
                        </DataTable.Cell>

                        <DataTable.Cell style={{ flex: 0.3 }}>
                            <View>
                                <Image source={require('../../sources/img/arrow.png')} style={{ height: 15, width: 15 }} />
                            </View>
                        </DataTable.Cell>

                    </DataTable.Row>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => goToScreen("SettingNotificacion")}  >

                    <DataTable.Row style={{ height: 70, padding: 10 }}>
                        <DataTable.Cell style={{ flex: 0.3 }}>
                            <View>
                                <Icon size={30} color="grey" name={"bell"} />
                            </View>

                        </DataTable.Cell>
                        <DataTable.Cell style={{ flex: 2 }}>
                            <Text style={{ fontSize: 20 }} > Notificaciones </Text>
                        </DataTable.Cell>

                        <DataTable.Cell style={{ flex: 0.3 }}>
                            <View>
                                <Image source={require('../../sources/img/arrow.png')} style={{ height: 15, width: 15 }} />
                            </View>
                        </DataTable.Cell>

                    </DataTable.Row>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => goToScreen("HelpScreen")}  >

                    <DataTable.Row style={{ height: 70, padding: 10 }}>
                        <DataTable.Cell style={{ flex: 0.3 }}>
                            <View>
                                <Icon size={30} color="grey" name={"info"} />
                            </View>

                        </DataTable.Cell>
                        <DataTable.Cell style={{ flex: 2 }}>
                            <Text style={{ fontSize: 20 }}> Ayuda </Text>
                        </DataTable.Cell>

                        <DataTable.Cell style={{ flex: 0.3 }}>
                            <View>
                                <Image source={require('../../sources/img/arrow.png')} style={{ height: 15, width: 15 }} />
                            </View>
                        </DataTable.Cell>

                    </DataTable.Row>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {}}  >

                    <DataTable.Row style={{ height: 70, padding: 10 }}>
                        <DataTable.Cell style={{ flex: 0.3 }}>
                            <View>
                                <Icon size={30} color="grey" name={"log-out"} />
                            </View>

                        </DataTable.Cell>
                        <DataTable.Cell style={{ flex: 2 }}>
                            <Text style={{ fontSize: 20 }} > Cerrar Sesi??n </Text>
                        </DataTable.Cell>

                        <DataTable.Cell style={{ flex: 0.3 }}>
                            <View>

                            </View>
                        </DataTable.Cell>

                    </DataTable.Row>
                </TouchableOpacity>

            </DataTable>
        </View>

    )
    function cerrarSesion() {
        Alert.alert("Salir", "Seguro de \n Salir de La Sesion?",
            [
                {
                    text: "Si", onPress: () => {
                        logOut()
                        //,goToScreen('LoginScreen')
                    }
                },
                {
                    text: "No", onPress: () => { }, style: 'cancel'
                }
            ]
        )
    }

    function goToScreen(routeName:any) {
        navigator.navigate(routeName);
    }


}