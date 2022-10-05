import React, { useState, useContext, useEffect } from 'react';
import { View, AppRegistry, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Linking, ScrollView, FlatList, Modal } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import ToolBar from '../../components/Toolbar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper'
import { BusinessCategory } from '../../interfaces/BusinessCategoryInterface';
import { AuthContex } from '../../context/UsuarioContext'
import { getCart } from '../../storage/CartAsyncStorage';
import { io } from 'socket.io-client';

const DetalleNegocioScreen = (props: any) => {
    const { params } = props.route;
    const [business, setBusiness] = useState({
        "id": "5646645546645456",
        "subcategory_id": "",
        "sectores_id": "",
        "name": "Cargando",
        "description": "",
        "url_logo": "",
        "sitio_web": null,
        "phone": "",
        "email": "",
        "delivery": 0,
        "direccion": "",
        "url_catalogo": "",
        "redes_sociales": [],
        "productos": [],
        "servicios": [],
        "categorias": [],
        "follows": [],
    });

    useEffect(() => {
        const url = `https://14.sdcecuador.com/api/data-negocio/${params.id}`;
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                if (typeof responseJson.data === 'object') {
                    console.log(responseJson.data)
                    setBusiness(responseJson.data[0])

                } else {
                    setBusiness({
                        "id": "5646645546645456",
                        "subcategory_id": "",
                        "sectores_id": "",
                        "name": "Cargando",
                        "description": "",
                        "url_logo": "",
                        "sitio_web": null,
                        "phone": "",
                        "email": "",
                        "delivery": 0,
                        "direccion": "",
                        "url_catalogo": "",
                        "redes_sociales": [],
                        "productos": [],
                        "servicios": [],
                        "categorias": [],
                        "follows": [],
                    })
                }
            })
            .catch((error: any) => {
                console.log(error)
            })
    }, [])
    console.log(business)
    const { modifiedCart, cart, emptyCart, user, unFollowBussiness, followBussiness, favorites } = useContext(AuthContex)





    var cartNow = cart.filter((n: any) => n.id_negocio == business.id);

    console.log(favorites);
    var favorite = favorites.filter((n: any) => n.id_business == business.id && n.id_user == user.id);

    if (cartNow.length !== 0) {
        cartNow = cartNow[0]
    }
    const navigator = useNavigation()
    const [carrito, setCarrito] = useState(cartNow);

    const [modalPrecioFinal, setModalPrecioFinal] = useState(false)

    const [contadorPrecio, setContadorPrecio] = useState(0)
    const [numeropedido, setNumeropedido] = useState(1)

    const [contadorcarrito, setContadorcarrito] = useState(carrito.length == 0 ? 0 : carrito.productos.length);


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

    function handleRestar() {
        setNumeropedido(numeropedido - 1)
        if (numeropedido <= 1) {
            return (
                setNumeropedido(1)
            )
        }
    }
    function handleSumar() {
        setNumeropedido(numeropedido + 1)
    }

    function handleCancelar() {
        setNumeropedido(1)
    }


    async function handleAceptar(id: string, title: string, precios: number, foto: string) {
        const obj = {
            id: id,
            nombre: title,
            cantidad: numeropedido,
            precios: precios,
            foto: foto
        }
        /*const { hijoarray } = array
        hijoarray.push(boatData)
        setArray({
            ...array,
            hijoarray
        })*/
        setNumeropedido(1)
        setModalDescripcion('')
        modifiedCart(obj, cart, business.id);
        let newCarrito = await getCart();
        newCarrito = newCarrito.filter((n: any) => n.id_negocio == business.id)
        if (newCarrito == null) {
            newCarrito = []
        }
        if (newCarrito.length !== 0) {
            newCarrito = newCarrito[0]
        }
        await setCarrito(newCarrito)

        await setContadorcarrito(newCarrito.productos.length)
        await handleSumaPago();
    }

    async function vaciarCarro() {

        emptyCart(business.id, cart);
        let newCarrito = await getCart();
        newCarrito = newCarrito.filter((n: any) => n.id_negocio == business.id)
        if (newCarrito == null) {
            newCarrito = []
        }
        if (newCarrito.length !== 0) {
            newCarrito = newCarrito[0]
        }
        await setCarrito(newCarrito)

        await setContadorcarrito(0)

        await setContadorPrecio(0)

    }


    function handleSumaPago() {
        let count = 0
        if (carrito.length !== 0) {
            carrito.productos.map((n: any) => {
                const precios: any = n.precios
                count = count + precios;
            })
        } else {
            count = 0
        }

        return setContadorPrecio(count)
    }

    function sendMessage(msg: any) {

        let stateUSer = true;//borrar y cambiar por el status de usuario
        if (stateUSer) {

            socket.emit('newChat', {
                room: '',
                idSender: user.id,
                id_user: user.id,
                msg: JSON.stringify(msg),
                token: user.access_token,
                idBusiness: business.id,
                idProprietor: business.user_id,
            })

            vaciarCarro()

        }

    }


    const renderItem = ({ item }: BusinessCategory) => (
        <View style={{ width: 60, overflow: 'hidden', marginHorizontal: 5 }}>
            <Image
                source={
                    (item.url_imagen == null || item.url_imagen == '') ? require('../../sources/img/interrogation.png') : { uri: item.url_imagen }}
                style={{ width: 60, height: 60, resizeMode: 'contain', borderRadius: 100 / 2 }}
            />

            <Text style={styles.TextoCategorias}>
                {item.name}
            </Text>
        </View>
    );

    // y aqui finaliza

    return (
        <ScrollView style={styles.container}>
            <ToolBar titulo={business.name}
                onPressLeft={() => goToBackScreen()}
                onPressRight={() => {}}
                //onPressRight={() => goToScreen('EditBusinessScreen', business)}
                iconLeft={require('../../sources/img/back.png')}
                iconRight={require('../../sources/img/hamburger.png')}
            />

            <View style={styles.ContainerPerfil}>
                <View style={styles.FotoPerfil}>
                    <Image
                        source={(business.url_logo == null || business.url_logo == '') ? require('../../sources/img/url_default.png') : { uri: business.url_logo }}
                        style={{ width: 100, height: 100, borderRadius: 200, }}
                    />
                </View>
                <View style={styles.Seguidores}>
                    <Text style={styles.TextoSeguidores}>
                        {business.productos.length}
                    </Text>
                    <Text style={styles.TextoSeguidores}>
                        Productos
                    </Text>
                </View>
                <View style={styles.Seguidores}>
                    <Text style={styles.TextoSeguidores}>
                        {business.follows.length}
                    </Text>
                    <Text style={styles.TextoSeguidores}>
                        Seguidores
                    </Text>
                </View>
                {favorite.length == 0 ?
                    <TouchableOpacity onPress={() => followBussiness(user.id, business.id)} style={[styles.Seguidores, { backgroundColor: 'white', maxHeight: '40%', borderColor: 'gold', borderWidth: 1 }]}>
                        <Icon name={"star"} style={[styles.TextoSeguidores, { fontSize: 20, marginTop: 0, color: 'gold' }]} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => unFollowBussiness(user.id, business.id)} style={[styles.Seguidores, { backgroundColor: 'gold', maxHeight: '40%' }]}>
                        <Icon name={"star"} style={[styles.TextoSeguidores, { fontSize: 20, marginTop: 0, color: 'white' }]} />
                    </TouchableOpacity>
                }

            </View>
            <View style={styles.ContainerNombrePerfil}>
                <Text style={styles.NombreTitulo}>
                    {business.name}
                </Text>
                <Text style={styles.DescripcionTexto}>
                    {business.description}
                </Text>
            </View>
            <View style={styles.ContainerAdd}>
                <FlatList
                    horizontal={true}
                    data={business.categorias}
                    renderItem={renderItem}
                    keyExtractor={(item: any) => item.id}
                />
            </View>
            <View style={styles.ContainerFotos}>
                <View style={styles.ContainerIconcarrito}>
                    <View style={styles.Badge}>
                        <Text style={styles.TextoBadge}>
                            {
                                contadorcarrito
                            }
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={{ zIndex: 9 }}
                        onPress={
                            () => { setModalPrecioFinal(!modalPrecioFinal), handleSumaPago() }
                        }
                    >
                        <Image
                            source={require('../../sources/img/carrito.png')}
                            style={styles.ImagenIconcarrito}
                        />
                    </TouchableOpacity>
                    {modalPrecioFinal ? (
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={true}
                        >
                            <View style={styles.Modalcarrito}>
                                <View style={styles.ContaierPagar}>
                                    <TouchableOpacity
                                        style={{ position: 'absolute', right: 10, top: -5 }}
                                        onPress={
                                            () => setModalPrecioFinal(!modalPrecioFinal)
                                        }
                                    >
                                        <Text style={{ color: '#000', fontSize: 30 }}>
                                            x
                                        </Text>
                                    </TouchableOpacity>
                                    <View style={{ width: 300, flexDirection: 'row', marginBottom: 10 }}>
                                        <View style={{ width: '33.33%', justifyContent: 'center', alignItems: 'center', marginBottom: 3 }}>
                                            <Text style={{ color: '#000' }}>
                                                Titulo
                                            </Text>
                                        </View>
                                        <View style={{ width: '33.33%', justifyContent: 'center', alignItems: 'center', marginBottom: 3 }}>
                                            <Text style={{ color: '#000' }}>
                                                Cantidad
                                            </Text>
                                        </View>
                                        <View style={{ width: '33.33%', justifyContent: 'center', alignItems: 'center', marginBottom: 3 }}>
                                            <Text style={{ color: '#000' }}>
                                                Precios
                                            </Text>
                                        </View>
                                    </View>
                                    {
                                        carrito.productos.map((n: any) =>
                                            <View style={{ width: 300, flexDirection: 'row', marginTop: -10, marginBottom: 10 }}
                                                key={n.id}
                                            >
                                                <View style={{ width: '33.33%', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ color: '#000' }}>
                                                        {n.nombre}
                                                    </Text>
                                                </View>
                                                <View style={{ width: '33.33%', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ color: '#000' }}>
                                                        {n.cantidad}
                                                    </Text>
                                                </View>
                                                <View style={{ width: '33.33%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                                    <Text style={{ color: '#000' }}>
                                                        {n.precios}
                                                    </Text>
                                                </View>
                                            </View>
                                        )
                                    }
                                    <View style={{ width: 300, flexDirection: 'row', marginTop: 10, borderTopWidth: 2, marginBottom: 10 }}
                                    >
                                        <View style={{ width: '33.33%', justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: '#000' }}>
                                                Total:
                                            </Text>
                                        </View>
                                        <View style={{ width: '33.33%', justifyContent: 'center', alignItems: 'center' }}>
                                        </View>
                                        <View style={{ width: '33.33%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                            <Text style={{ color: '#000' }}>
                                                {
                                                    contadorPrecio
                                                }
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10, borderTopWidth: 2, marginBottom: 10 }}
                                    >
                                        <TouchableOpacity onPress={() => vaciarCarro()} style={{ width: '50%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', padding: 10 }}>
                                            <View >
                                                <Text style={{ color: '#ffff', fontWeight: '800' }}>
                                                    Vaciar
                                            </Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => { sendMessage(carrito.productos) }} style={{ width: '50%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue', padding: 10 }}>
                                            <View >
                                                <Text style={{ color: '#ffff', fontWeight: '800' }}>
                                                    Enviar
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    ) : null}
                </View>
                <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap' }}>
                    {/*<View style={{ width: '32%', marginHorizontal: '.64%', marginBottom: '1%', zIndex: 9 }}>
                        <TouchableOpacity
                            onPress={() => {
                                goToScreen('CreateProductScreen', business)
                            }}
                        >
                            <Image
                                source={require('../../sources/img/Captura.jpg')}
                                style={{ width: '100%', height: 150 }}
                            />
                        </TouchableOpacity>
                    </View>*/}

                    {
                        business.productos.map((n: any) =>

                            <View key={n.id} style={{ width: '32%', marginHorizontal: '.64%', marginBottom: '1%' }}>
                                <TouchableOpacity
                                    onPress={
                                        () => { setDescripcionFoto(n.id), handleAlertClick() }
                                    }
                                >
                                    <Image
                                        source={(n.url_imagen == '')? require('../../sources/img/Captura.jpg') : {uri:  n.url_imagen }}
                                        style={{ width: '100%', height: 150 }}
                                    />
                                </TouchableOpacity>
                                {descripcionFoto ? (

                                    descripcionFoto === n.id ?
                                        <View style={styles.Containerdescripcionfoto}>
                                            <Text style={styles.Textoprecio}>
                                                ${n.precio}
                                            </Text>
                                            <Text style={styles.Textodescripcion}>
                                                {n.descripcion}
                                            </Text>
                                            <TouchableOpacity
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
                                                    <TouchableOpacity
                                                        onPress={
                                                            () => setSliderModal(!sliderModal)
                                                        }
                                                    >
                                                        <Image
                                                            source={(n.url_imagen == '')? require('../../sources/img/Captura.jpg') : {uri:  n.url_imagen }}
                                                            style={styles.ImagenModal}
                                                        />
                                                    </TouchableOpacity>
                                                    {sliderModal ? (
                                                        <Modal
                                                            animationType="slide"
                                                            transparent={true}
                                                            visible={true}
                                                        >
                                                            <View style={styles.ContainerSlider}>
                                                                <TouchableOpacity
                                                                    onPress={
                                                                        () => setSliderModal(!sliderModal)
                                                                    }
                                                                    style={{ position: 'absolute', top: 0, right: 0, zIndex: 9 }}
                                                                >
                                                                    <Icon
                                                                        name='x'
                                                                        size={50}
                                                                        color='white'
                                                                    />
                                                                </TouchableOpacity>

                                                                <Swiper>
                                                                    {
                                                                        JSON.parse(n.slider).map((e: any) => {

                                                                            return (
                                                                                <View key={e.id} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                                                                    <Image
                                                                                        source={{ uri: e.url }}
                                                                                        style={{ width: 350, height: 350 }}
                                                                                    />
                                                                                </View>
                                                                            )
                                                                        })
                                                                    }
                                                                </Swiper>
                                                            </View>
                                                        </Modal>
                                                    ) : []}
                                                    <View style={styles.ContainerDescripcion}>
                                                        <Text style={styles.TextTitulo}>
                                                            {n.producto}
                                                        </Text>
                                                        <Text style={styles.TextoDescripcion}>
                                                            {n.descripcion}
                                                        </Text>
                                                    </View>
                                                    <View style={styles.ContainerPrecio}>
                                                        <Text style={styles.TextoPrecio}>
                                                            ${n.precio * numeropedido}
                                                        </Text>
                                                    </View>
                                                    <View style={styles.ContainerSumaResta}>
                                                        <View style={styles.CajaSumaResta}>
                                                            <TouchableOpacity
                                                                style={styles.BotonSumarRestar}
                                                                onPress={
                                                                    () => handleRestar()
                                                                }
                                                            >
                                                                <Text style={styles.TextBotonSumarRestar}>
                                                                    -
                                                                </Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                        <View style={styles.CajaSumaResta}>
                                                            <View style={styles.CajaCantidad}>
                                                                <Text style={{ color: '#000' }}>
                                                                    {numeropedido}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                        <View style={styles.CajaSumaResta}>
                                                            <TouchableOpacity
                                                                style={styles.BotonSumarRestar}
                                                                onPress={
                                                                    () => handleSumar()
                                                                }
                                                            >
                                                                <Text style={styles.TextBotonSumarRestar}>
                                                                    +
                                                                </Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                    <View style={styles.ContainerBotonesCarrito}>
                                                        <TouchableOpacity
                                                            style={[styles.BotonCarrito, { borderRightWidth: 1 }]}
                                                            onPress={
                                                                () => { setModalDescripcion(''), handleCancelar() }
                                                            }
                                                        >
                                                            <Text style={styles.TextBotonCarrito}>
                                                                Cancelar
                                                            </Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            style={[styles.BotonCarrito, { borderLeftWidth: 1 }]}
                                                            onPress={
                                                                () => {
                                                                    const id = n.id;
                                                                    const title = n.producto;
                                                                    const precios = n.precio * numeropedido;
                                                                    const foto = n.url_imagen;
                                                                    handleAceptar(id, title, precios, foto)
                                                                }
                                                            }
                                                        >
                                                            <Text style={styles.TextBotonCarrito}>
                                                                Aceptar
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
    )
    function goToBackScreen() {
        navigator.goBack()
    }

    function goToScreen(routeName: any, data: any) {
        navigator.navigate(routeName as never, { data: data } as never);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e5e7ea'
    },
    ContainerPerfil: {
        width: '100%',
        paddingVertical: 20,
        flexDirection: 'row',
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
    FotoPerfil: {
        width: '35%',
    },
    Seguidores: {
        width: '22%',
        alignItems: 'center',
        paddingTop: 10,
        marginRight: 8
    },
    TextoSeguidores: {
        textAlign: 'center',
        color: '#000'
    },
    ContainerNombrePerfil: {
        width: '100%',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        paddingBottom: 20
    },
    NombreTitulo: {
        fontSize: 30,
        fontWeight: '600',
        color: '#000'
    },
    DescripcionTexto: {
        color: '#000'
    },
    ContainerAdd: {
        width: '100%',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingVertical: 20,
    },
    TextoCategorias: {
        color: '#000',
        textAlign: 'center',
        marginTop: 10
    },
    ContainerFotos: {
        width: '100%',
        paddingVertical: 10,
        backgroundColor: '#fff',
        marginTop: 20,
    },
    Containerdescripcionfoto: {
        backgroundColor: '#000',
        position: 'absolute',
        width: '100%',
        height: 150,
        padding: 10
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
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 10,
        color: '#000'
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
        width: 50,
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
        paddingVertical: 20,
        justifyContent: 'center',
        width: '50%',
        alignItems: 'center',

    },
    TextBotonCarrito: {
        color: '#000'
    },
    ContainerDescripcion: {
        width: '100%',
        paddingHorizontal: 20
    },
    TextoDescripcion: {
        color: '#000',
        textAlign: 'justify',
        fontSize: 18
    },
    TextTitulo: {
        color: '#000',
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
    }
});

export default DetalleNegocioScreen;

AppRegistry.registerComponent('myproject', () => DetalleNegocioScreen)