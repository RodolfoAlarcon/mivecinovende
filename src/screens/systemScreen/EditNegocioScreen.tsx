import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

export const EditNegocioScreen = (props: any) => {

    const navigator = useNavigation()
    const [informacionShow, setinformacionShow] = useState(false)
    const [serviciosShow, setserviciosShow] = useState(false)
    const [productosShow, setproductosShow] = useState(false)
    const [contactenosShow, setcontactenosShow] = useState(false)

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#e5e7ea' }}>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                <Image
                    source={require('../../sources/img/pizza.jpg')}
                    style={{ width: 100, height: 100, borderRadius: 200, marginHorizontal: 20, marginVertical: 20 }}
                />
                <Text style={{ fontSize: 20, color: 'black', paddingVertical: 10 }}>
                    Nombre del local
                </Text>
                <Text style={{ paddingBottom: 10, color: "#000" }}>
                    Lunes a Viernes 9:00 - 18:00
                </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', paddingBottom: 10, marginBottom: 5 }}>
                <View style={{ width: '40%', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity
                    >
                        <Image
                            source={require('../../sources/img/pdf.png')}
                            style={{ width: 110, height: 55, resizeMode: 'contain', marginVertical: 4 }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ width: '40%', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity>
                        <Image
                            source={require('../../sources/img/whatsapp.png')}
                            style={{ width: 110, height: 55, resizeMode: 'contain', marginVertical: 4 }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <TouchableOpacity
                    style={{ backgroundColor: 'white', marginVertical: 7, width: '100%', paddingVertical: 15, paddingLeft: 10 }}
                    onPress={
                        () => setinformacionShow(!informacionShow)
                    }
                >
                    <Text style={{ color: 'black', fontSize: 18 }}>
                        Informacion
                    </Text>
                </TouchableOpacity>
                {informacionShow ? (
                    <View style={{ backgroundColor: 'white', padding: 10, marginTop: -8 }}>

                        <Text style={{ textAlign: 'justify', color: "black", }}>
                            Informacion a mostrar
                        </Text>

                    </View>
                ) : null
                }
            </View>


            <View>
                <TouchableOpacity
                    style={{ backgroundColor: 'white', marginVertical: 7, width: '100%', paddingVertical: 15, paddingLeft: 10 }}
                    onPress={
                        () => setserviciosShow(!serviciosShow)
                    }
                >
                    <Text style={{ color: 'black', fontSize: 18 }}>
                        Servicios
                    </Text>
                </TouchableOpacity>
                {serviciosShow ? (
                    <View style={{ backgroundColor: 'white', padding: 10, marginTop: -8, flexDirection: 'row', flexWrap: 'wrap' }}>
                        <View
                            style={{ width: '33.3%' }}
                        >
                            <Text style={{ textAlign: 'justify', color: "black", }}>
                                Servicios a mostrar
                            </Text>

                        </View>
                    </View>
                ) : null
                }
            </View>



            <View>
                <TouchableOpacity
                    style={{ backgroundColor: 'white', marginVertical: 7, width: '100%', paddingVertical: 15, paddingLeft: 10 }}
                    onPress={
                        () => setproductosShow(!productosShow)
                    }
                >
                    <Text style={{ color: 'black', fontSize: 18 }}>
                        Productos
                    </Text>
                </TouchableOpacity>
                {productosShow ? (
                    <View style={{ backgroundColor: 'white', padding: 10, marginTop: -8 }}>
                        <Text style={{ textAlign: 'justify', color: "#000" }}>
                            aqui van los productos
                        </Text>
                    </View>
                ) : null
                }
            </View>



            <View>
                <TouchableOpacity
                    style={{ backgroundColor: 'white', marginVertical: 7, width: '100%', paddingVertical: 15, paddingLeft: 10 }}
                    onPress={
                        () => setcontactenosShow(!contactenosShow)
                    }
                >
                    <Text style={{ color: 'black', fontSize: 18 }}>
                        Contáctanos
                    </Text>
                </TouchableOpacity>
                {contactenosShow ? (
                    <View style={{ backgroundColor: 'white', padding: 10, marginTop: -8 }}>
                        <Text style={{ textAlign: 'justify', fontWeight: 'bold', color: "#000" }}>
                            Dirección:
                        </Text>
                        <Text style={{ textAlign: 'justify', marginBottom: 10, color: "#000" }}>
                            Direccion
                        </Text>
                        <Text style={{ textAlign: 'justify', fontWeight: 'bold', color: "#000" }}>
                            Teléfono:
                        </Text>
                        <Text style={{ textAlign: 'justify', marginBottom: 10, color: "#000" }}>
                            0412*******
                        </Text>
                        <Text style={{ textAlign: 'justify', fontWeight: 'bold', color: "#000" }}>
                            Email:
                        </Text>
                        <Text style={{ textAlign: 'justify', marginBottom: 10, color: "#000" }}>
                            ejemplo@example.com
                        </Text>
                        <Text style={{ textAlign: 'justify', fontWeight: 'bold', color: "#000" }}>
                            Sitio Web:
                        </Text>
                        <Text style={{ textAlign: 'justify', marginBottom: 10, color: "#000" }}>
                            www.alucinamkt.com
                        </Text>
                    </View>
                ) : null
                }
            </View>

            <View style={{ backgroundColor: "white", marginVertical: 7, width: '100%', paddingVertical: 15, paddingHorizontal: 20, justifyContent: 'space-between', flexDirection: 'row', marginBottom: 14 }}>
                <TouchableOpacity
                    onPress={
                        () => {
                            goToScreen('')
                        }
                    }
                >
                    <Text style={{ textAlign: 'justify', color: "blue", textDecorationLine: "underline" }}>
                        Redes Sociales <Icon size={15} color="blue" name={"edit"} />
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={
                        () => {
                            goToScreen('')
                        }
                    }
                >
                    <Text style={{ textAlign: 'justify', color: "blue", textDecorationLine: "underline" }}>
                        Productos <Icon size={15} color="blue" name={"edit"} />
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={
                        () => {
                            goToScreen('')
                        }
                    }
                >
                    <Text style={{ textAlign: 'justify', color: "blue", textDecorationLine: "underline" }}>
                        Servicios <Icon size={15} color="blue" name={"edit"} />
                    </Text>
                </TouchableOpacity>
            </View>


        </ScrollView>
    )
    function goToScreen(routeName: any) {
        navigator.navigate(routeName as never);
    }
}

export default EditNegocioScreen;
