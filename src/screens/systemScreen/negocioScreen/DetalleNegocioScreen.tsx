import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import ToolBar from '../../../components/Toolbar';

const DetalleNegocioScreen = (props: any) => {


    const { params } = props.route;
    const navigator = useNavigation()
    const [informacionShow, setinformacionShow] = useState(false)
    const [serviciosShow, setserviciosShow] = useState(false)
    const [productosShow, setproductosShow] = useState(false)
    const [contactenosShow, setcontactenosShow] = useState(false)

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#e5e7ea' }}>
            <ToolBar titulo='Vista de negocio'
                onPressLeft={() => goToBackScreen()}
                onPressRight={() => goToScreen('EditBusinessScreen', params.business)}
                iconLeft={require('../../../sources/img/back.png')}
                iconRight={require('../../../sources/img/edit.png')}
            />

            
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                    <Image
                        source={(params.business.url_logo == null || params.business.url_logo == '') ? require('../../../sources/img/url_default.png') : { uri: params.business.url_logo }}
                        style={{ width: 100, height: 100, borderRadius: 200, marginHorizontal: 20, marginVertical: 20 }}
                    />
                    <Text style={{ fontSize: 20, color: 'black', paddingVertical: 10 }}>
                        {params.business.name}
                    </Text>
                    <Text style={{ paddingBottom: 10, color: "#000" }}>
                        {params.business.horario_atencion} Lunes a Viernes 9:00 - 18:00
                </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', paddingBottom: 10, marginBottom: 5 }}>
                    <View style={{ width: '40%', alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity
                        >
                            <Image
                                source={require('../../../sources/img/pdf.png')}
                                style={{ width: 110, height: 55, resizeMode: 'contain', marginVertical: 4 }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '40%', alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity>
                            <Image
                                source={require('../../../sources/img/whatsapp.png')}
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
                            Información
                    </Text>
                    </TouchableOpacity>
                    {informacionShow ? (
                        <View style={{ backgroundColor: 'white', padding: 10, marginTop: -8 }}>

                            <Text style={{ textAlign: 'justify', color: "black", }}>
                                {params.business.description}
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
                                style={{}}
                            >
                                {params.business.servicios.map((n: any) => (
                                    <Text key={n.id} style={{ textAlign: 'justify', color: "black", fontSize: 17, marginBottom: 5 }}>
                                        * {n.servicio}
                                    </Text>
                                ))}

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
                            { params.business.productos.map((n: any) => (
                                <View key={n.id} style={{
                                    flex: 1, flexDirection: "row",
                                    marginBottom: 10,
                                    paddingBottom: 1,
                                    borderBottomColor: 'grey',
                                    borderBottomWidth: 0.6,
                                }}>

                                    <View style={{ flex: 0.5 }} >
                                        <Image source={{ uri: n.url_imagen }} style={{ width: 50, height: 50 }} />

                                    </View>

                                    <View style={{ flex: 2 }} >
                                        <Text style={{ textAlign: 'justify', color: "black", fontSize: 20 }}>
                                            {n.producto}
                                        </Text>
                                    </View>


                                </View>

                            ))}
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
                                {params.business.direccion}
                            </Text>
                            <Text style={{ textAlign: 'justify', fontWeight: 'bold', color: "#000" }}>
                                Teléfono:
                        </Text>
                            <Text style={{ textAlign: 'justify', marginBottom: 10, color: "#000" }}>
                                {params.business.phone}
                            </Text>
                            <Text style={{ textAlign: 'justify', fontWeight: 'bold', color: "#000" }}>
                                Email:
                        </Text>
                            <Text style={{ textAlign: 'justify', marginBottom: 10, color: "#000" }}>
                                {params.business.email}
                            </Text>
                            <Text style={{ textAlign: 'justify', fontWeight: 'bold', color: "#000" }}>
                                Sitio Web:
                        </Text>
                            <Text style={{ textAlign: 'justify', marginBottom: 10, color: "#000" }}>
                                {params.business.sitio_web}
                            </Text>
                        </View>
                    ) : null
                    }
                </View>

                <View style={{ backgroundColor: "white", marginVertical: 7, width: '100%', paddingVertical: 15, paddingHorizontal: 20, justifyContent: 'space-between', flexDirection: 'row', marginBottom: 14 }}>
                    <TouchableOpacity
                        onPress={
                            () => {
                                goToScreen('ListaRedSocialScreen', params.business.redSocial, params.business.id)
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
                                goToScreen('ListaProductoScreen', params.business.productos, params.business.id)
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
                                goToScreen('ListaServicioScreen', params.business.servicios, params.business.id)
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
    function goToBackScreen() {
        navigator.goBack()
    } 

    function goToScreen(routeName: any, data:any, id_negocio:any) {
        navigator.navigate(routeName as never, {data:data, id_negocio:id_negocio} as never);
    }
}

export default DetalleNegocioScreen;
