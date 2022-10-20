import React, { useState, useContext } from 'react';
import { View, AppRegistry, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Linking, ScrollView, FlatList, Modal, ImageBackground } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import ToolBar from '../../../components/Toolbar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper'
import { BusinessCategory } from '../../../interfaces/BusinessCategoryInterface';
import { AuthContex } from '../../../context/UsuarioContext'
import { getCart } from '../../../storage/CartAsyncStorage';
import { io } from 'socket.io-client';
import { cos } from 'react-native-reanimated';

const DetalleNegocioScreen = (props: any) => {

    const { modifiedCart, cart, emptyCart, user, unFollowBussiness, followBussiness, favorites } = useContext(AuthContex)
    const { params } = props.route;
    var cartNow = cart.filter((n: any) => n.id_negocio == params.business.id);

    console.log(favorites);
    var favorite = favorites.filter((n: any) => n.id_business == params.business.id && n.id_user == user.id);

    const navigator = useNavigation()

    const [modalPrecioFinal, setModalPrecioFinal] = useState(false)

    const [sliderModal, setSliderModal] = useState(false)
    const [descripcionFoto, setDescripcionFoto] = useState('')
    const [modalDescripcion, setModalDescripcion] = useState('')

    const baseUrl = `https://vecinovendechat.herokuapp.com`;
    const socket = io(baseUrl, { transports: ['websocket'] })

    function handleAlertClick() {
        setTimeout(() => {
            setDescripcionFoto('')
        }, 7000);
    }
    setTimeout(() => {
        setSliderModal(true)
    }, 1000);




    const renderItem = ({ item }: BusinessCategory) => (
        <View style={{ marginRight: 5 }}>
            <Text style={styles.TextoCategorias}>
                {item.name}
            </Text>
        </View>
    );

    const sera = ['']
    // y aqui finaliza

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#453091" }}>
            <ScrollView>
                <ImageBackground source={require('../../../sources/img/Background.jpg')} resizeMode="cover" style={styles.BannerTitulo}>
                    <View style={{ flexDirection: "row", width: "95%" }}>
                        <View style={{ width: "25%" }}>
                            <View style={{ borderWidth: 2, padding: 3, borderRadius: 100, borderColor: "#fff", width: 70 }}>
                                <Image
                                    source={(params.business.url_logoo == null || params.business.url_logo == '') ? require('../../../sources/img/url_default.png') : { uri: params.business.url_logo }}
                                    style={{ width: 60, height: 60, borderRadius: 200, }}
                                />
                            </View>
                        </View>
                        <View style={{ width: "70%" }}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ color: "#fff", marginTop: 5, fontSize: 20 }}>
                                    {params.business.name}
                                </Text>
                                <Image
                                    source={require('../../../sources/img/verificado.png')}
                                    style={{ width: 20, height: 20, resizeMode: "stretch", marginTop: 10, marginLeft: 10 }}
                                />
                            </View>
                            <View style={{ paddingVertical: 5, backgroundColor: "#6900FF", width: 130, borderRadius: 15 }}>
                                <Text style={{ color: "#fff", textAlign: "center", fontSize: 12 }}>
                                    Vendedor Premium
                                </Text>
                            </View>
                        </View>
                        <View style={{ width: "5%" }}>
                            <Icon name="more-vertical" size={25} color="#fff" />
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", width: "95%", marginVertical: 15, justifyContent: "space-between" }}>
                        <View style={{ width: "32%" }}>
                            <Text style={{ color: "#fff", textAlign: "center", fontSize: 10 }}>254</Text>
                            <Text style={{ color: "#fff", textAlign: "center", fontSize: 10 }}>FAVORITOS</Text>
                        </View>
                        <View style={{ width: "32%" }}>
                            <Text style={{ color: "#fff", textAlign: "center", fontSize: 10 }}>198</Text>
                            <Text style={{ color: "#fff", textAlign: "center", fontSize: 10 }}>SATISFECHOS</Text>
                        </View>
                        <View style={{ width: "32%" }}>
                            <Text style={{ color: "#fff", textAlign: "center", fontSize: 10 }}>4.5</Text>
                            <Text style={{ color: "#fff", textAlign: "center", fontSize: 10 }}>ESTRELLLAS</Text>
                        </View>
                    </View>
                    <View style={{ width: "95%", height: 25, backgroundColor: "white", borderTopLeftRadius: 20, borderTopRightRadius: 20, }}></View>
                </ImageBackground>
                <View style={styles.container}>
                    <View style={{ width: "90%", maxHeight: 80, flexDirection: "row", marginHorizontal: "5%", }}>
                        <View style={{ width: "20%" }}>
                            <TouchableOpacity
                                style={{ width: "100%", alignItems: "center" }}
                            >
                                <Image source={require('../../../sources/img/informacion.png')} style={{ width: 30, resizeMode: "stretch", height: 30 }} />
                                <Text style={{ textAlign: "center", color: "#A191B7", fontSize: 11, marginTop: 5 }}>
                                    Infomación
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: "20%", alignItems: "center" }}>
                            <Image source={require('../../../sources/img/favorito.png')} style={{ width: 30, resizeMode: "stretch", maxHeight: 30 }} />
                            <Text style={{ textAlign: "center", color: "#A191B7", fontSize: 11, marginTop: 5 }}>
                                Favoritos
                            </Text>
                        </View>
                        <View style={{ width: "20%" }}>
                            <TouchableOpacity
                                style={{ alignItems: "center" }}
                            >
                                <Image source={require('../../../sources/img/mensajes.png')} style={{ width: 30, resizeMode: "stretch", maxHeight: 30 }} />
                                <Text style={{ textAlign: "center", color: "#A191B7", fontSize: 11, marginTop: 5 }}>
                                    Mensajes
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: "20%" }}>
                            <TouchableOpacity
                                style={{ alignItems: "center", width: "100%" }}
                                onPress={() => {
                                    goToScreen('CreateCategoriasBusiness', params.business)
                                }}
                            >
                                <Image source={require('../../../sources/img/aggcategoria.png')} style={{ width: 30, resizeMode: "stretch", maxHeight: 30 }} />
                                <Text style={{ textAlign: "center", color: "#A191B7", fontSize: 11, marginTop: 5 }}>
                                    Categorias
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: "20%" }}>
                            <TouchableOpacity
                                style={{ alignItems: "center" }}
                                onPress={() => {
                                    goToScreen('CreateProductScreen', params.business)
                                }}
                            >
                                <Image
                                    source={require('../../../sources/img/aggproducto.png')}
                                    style={{ width: 30, resizeMode: "stretch", maxHeight: 30, }}
                                />
                                <Text style={{ textAlign: "center", color: "#A191B7", fontSize: 11, marginTop: 5 }}>
                                    Productos
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ width: "90%", flexDirection: "row", marginHorizontal: "5%" }}>
                        <Text style={{ color: "#453091", fontSize: 20 }}>
                            PRODUCTOS
                        </Text>
                    </View>
                    <View style={[styles.ContainerAdd, { maxHeight: 40 }]}>
                        <FlatList
                            horizontal={true}
                            data={params.business.categorias}
                            renderItem={renderItem}
                            keyExtractor={(item: any) => item.id}
                        />
                    </View>

                    <View style={[{ width: '90%', flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: "5%", justifyContent: "flex-start" }, {}]}>

                        {
                            params.business.productos.map((n: any) =>

                                <View key={n.id} style={{ width: '30%', marginBottom: '1%', backgroundColor: "#9DCFFB", borderRadius: 20, marginRight: "3.3%" }}>
                                    <TouchableOpacity
                                        style={{ height: 100, justifyContent: "center", alignItems: "center" }}
                                        onPress={
                                            () => { setDescripcionFoto(n.id), handleAlertClick() }
                                        }
                                    >
                                        <Image
                                            source={(n.url_imagen == '') ? require('../../../sources/img/Captura.jpg') : { uri: n.url_imagen }}
                                            style={{ width: 60, height: 60 }}
                                        />
                                        {descripcionFoto ? (

                                            descripcionFoto == n.id ?
                                                <View>

                                                </View>
                                                : <>
                                                </>
                                        ) : <View style={{ position: "absolute", bottom: 10, right: 7, width: 30, height: 30, backgroundColor: "#453091", borderRadius: 7, justifyContent: "center", alignItems: "center" }}>
                                            <Text style={{ color: "#fff", fontSize: 10 }}>
                                                ${n.precio}
                                            </Text>
                                        </View>}
                                    </TouchableOpacity>
                                    {descripcionFoto ? (

                                        descripcionFoto === n.id ?
                                            <View style={styles.Containerdescripcionfoto}>
                                                <Text numberOfLines={2} style={{ color: "#fff", fontWeight: "bold" }}>
                                                    {
                                                        n.producto
                                                    }
                                                </Text>
                                                <Text style={{ color: "#fff" }}>
                                                    ${n.precio}
                                                </Text>
                                                <TouchableOpacity
                                                    style={{ backgroundColor: "#fff", borderRadius: 10, position: "absolute", bottom: 10, width: "100%", marginLeft: 10 }}
                                                    onPress={
                                                        () => setModalDescripcion(n.id)
                                                    }
                                                >
                                                    <Text style={styles.Textoinfo}>
                                                        Info
                                                    </Text>
                                                </TouchableOpacity>
                                            </View> : <>
                                            </>

                                    ) : null}
                                    {modalDescripcion ? (

                                        modalDescripcion === n.id ?
                                            <Modal
                                                animationType="slide"
                                                transparent={true}
                                                visible={true}
                                            >
                                                <View style={styles.Modalcarrito}>
                                                    <View style={styles.Containermodal}>


                                                    {sliderModal ? (

<View style={styles.ContainerSlider}>

    <Swiper
        activeDotStyle={{ backgroundColor: '#453091' }}
        dotStyle={{ backgroundColor: '#fff' }}
    >
        {
            console.log(n.slider)
        }
        {
            n.slider.map((e: any) => {

                return (
                    <View key={e.id} style={{ width: 300, height: 170, justifyContent: 'center', alignItems: 'center', }}>
                        <Image
                            source={{ uri: e.url }}
                            style={{ width: 300, height: 170, resizeMode: "stretch" }}
                        />
                        <Text style={{color:"red"}}>
                            {e.url}
                        </Text>
                    </View>
                )
            })
        }
    </Swiper>
</View>
) : []}


                                                        <View style={styles.ContainerDescripcion}>
                                                            <Text style={styles.TextTitulo}>
                                                                {n.producto}
                                                            </Text>
                                                            <Text style={styles.TextoDescripcion}>
                                                                {n.descripcion}
                                                            </Text>
                                                        </View>

                                                        <View style={{ width: "90%", marginHorizontal: "5%", flexDirection: "row", justifyContent: "space-between", marginTop:20 }}>
                                                            <TouchableOpacity
                                                                style={styles.BotonCarrito}
                                                                onPress={
                                                                    () => { setModalDescripcion('') }
                                                                }
                                                            >
                                                                <Text style={styles.TextBotonCarrito}>
                                                                    Cancelar
                                                                </Text>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity
                                                                onPress={
                                                                    () => { }
                                                                }
                                                                style={{ backgroundColor: "red", height: 45, borderRadius: 50, width: "20%", justifyContent: "center", alignItems: "center" }}
                                                            >
                                                                <Icon name='trash' size={20} color='#fff' />
                                                            </TouchableOpacity>
                                                            <TouchableOpacity
                                                                style={styles.BotonCarrito}
                                                                onPress={
                                                                    () => {
                                                                        setModalDescripcion('');
                                                                        goToEditProductScreen('EditProductScreen', params.business.id, params.business, n)
                                                                    }
                                                                }
                                                            >
                                                                <Text style={styles.TextBotonCarrito}>
                                                                    Editar
                                                                </Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </View>
                                            </Modal> : <>
                                            </>

                                    ) : null}
                                </View>

                            )
                        }
                    </View>











                </View>






















            </ScrollView>
        </SafeAreaView>
    )
    function goToBackScreen() {
        navigator.goBack()
    }

    function goToScreen(routeName: any, data: any) {
        navigator.navigate(routeName as never, { data: data } as never);
    }
    function goToEditProductScreen(routeName: any, id: any, business: any, data: any) {
        navigator.navigate(routeName as never, { id: id, business: business, data: data } as never);
    }
}

const styles = StyleSheet.create({
    container: {
        width: "95%",
        backgroundColor: '#fff',
        marginHorizontal: "2.5%",
        minHeight: Dimensions.get("window").height - 183,
    },
    ContainerAdd: {
        width: '90%',
        marginHorizontal: "5%",
        flexDirection: 'row',
    },
    TextoCategorias: {
        color: '#524499',
        marginVertical: 10
    },
    ContainerFotos: {
        width: '100%',
        paddingVertical: 10,
        backgroundColor: '#fff',
        marginTop: 20,
    },
    Containerdescripcionfoto: {
        backgroundColor: '#5e3190e8',
        position: 'absolute',
        width: '100%',
        height: 100,
        padding: 10,
        borderRadius: 20
    },
    Textoprecio: {
        color: '#fff',
        fontSize: 25,
        fontWeight: '700',
        textAlign: 'center'
    },
    Textodescripcion: {
        color: '#fff',
        textAlign: 'justify',
        height: 68,
        marginBottom: 6,
        overflow: 'hidden'
    },
    Textoinfo: {
        textAlign: 'center',
        padding: 3,
        color: '#453091',
        fontSize: 10,
    },
    Modalcarrito: {
        flex: 1,
        backgroundColor: '#0000005c',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Containermodal: {
        backgroundColor: '#fff',
        borderRadius: 20,
        overflow: 'hidden',
        width: 300
    },
    ImagenModal: {
        width: 300,
        height: 150
    },
    ContainerSumaResta: {
        paddingVertical: 20,
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    BotonSumarRestar: {
        backgroundColor: "#1D1D1B",
        width: 80,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    TextBotonSumarRestar: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '800'
    },
    CajaSumaResta: {
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    CajaCantidad: {
        width: 50,
        height: 50,
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ContainerBotonesCarrito: {
        borderTopWidth: 2,
        flexDirection: 'row'
    },
    BotonCarrito: {
        height: 45,
        justifyContent: 'center',
        width: '35%',
        alignItems: 'center',
        backgroundColor: "#453091",
        borderRadius: 25,
        marginBottom: 20
    },
    TextBotonCarrito: {
        color: '#fff'
    },
    ContainerDescripcion: {
        width: '90%',
        marginHorizontal: "5%"
    },
    TextoDescripcion: {
        color: '#453091',
        textAlign: 'justify',
    },
    TextTitulo: {
        color: '#453091',
        paddingTop: 15,
        fontSize: 24,
        fontWeight: '700',
        paddingBottom: 5
    },
    ContainerPrecio: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10
    },
    TextoPrecio: {
        color: '#000',
        fontSize: 25,
        fontWeight: '900'
    },
    ContainerIconcarrito: {
        width: '100%',
        alignItems: 'flex-end',
        paddingBottom: 10,
        paddingHorizontal: 15
    },
    ImagenIconcarrito: {
        width: 40,
        height: 40,
        marginTop: 10
    },
    Badge: {
        backgroundColor: '#000',
        width: 25,
        height: 25,
        borderRadius: 20,
        position: 'absolute',
        right: 5,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    TextoBadge: {
        color: '#fff',
        fontSize: 10
    },
    ContaierPagar: {
        borderRadius: 25,
        padding: 20,
        backgroundColor: '#fff'
    },
    ContainerSlider: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000d9'
    },
    BannerTitulo: {
        width: '100%',
        height: 183,
        backgroundColor: '#000',
        alignItems: 'center',
        paddingTop: 30,
    },
});

export default DetalleNegocioScreen;

AppRegistry.registerComponent('myproject', () => DetalleNegocioScreen)
