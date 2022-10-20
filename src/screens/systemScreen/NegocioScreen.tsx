import React, { useState, useContext, useEffect } from 'react';
import { ImageBackground, View, AppRegistry, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Linking, ScrollView, FlatList, Modal, BackHandler } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import ToolBar from '../../components/Toolbar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper'
import { BusinessCategory } from '../../interfaces/BusinessCategoryInterface';
import { AuthContex } from '../../context/UsuarioContext'
import { getCart } from '../../storage/CartAsyncStorage';
import { io } from 'socket.io-client';
import { FadeInLeft } from 'react-native-reanimated';
import Textarea from 'react-native-textarea';
import { Rating, AirbnbRating } from 'react-native-ratings';

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
        "reviews": []
    });

    useEffect(() => {
        const url = `https://14.sdcecuador.com/api/data-negocio/${params.id}`;
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                if (typeof responseJson.data === 'object') {
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
                        "reviews": [],
                    })
                }
            })
            .catch((error: any) => {
                console.log(error)
            })
    }, [])
    const { modifiedCart, cart, emptyCart, user, unFollowBussiness, followBussiness, favorites, sendReview } = useContext(AuthContex)


    var cartNow = cart.filter((n: any) => n.id_negocio == business.id);

    var favorite = favorites.filter((n: any) => n.id_business == business.id && n.id_user == user.id);

    if (cartNow.length !== 0) {
        cartNow = cartNow[0]
    } else {
        cartNow = {
            'id_negocio': business.id,
            'productos': []
        };
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

    //============================encontrar review existente===================================================
    var review = business.reviews.filter((n: any) => n.user_id == user.id);
   
    if (review.length !== 0){
        
        review = review[0]
    } else {
        console.log('entro 2')
        review = {
            'descripcion': '',
            'puntuacion': 1,
            'id': ''
        };
    }
    const [reviewState, setReviewState] = useState(review.puntuacion)
    const [reviewTexArea, setReviewTexArea] = useState(review.descripcion)
    
    
    //=========================================================================================================

    const baseUrl = `https://vecinovendechat.herokuapp.com`;
    const socket = io(baseUrl, { transports: ['websocket'] })

    setTimeout(() => {
        setSliderModal(true)
    }, 1000);

    function handleAlertClick() {
        setTimeout(() => {
            setDescripcionFoto('')
        }, 7000);
    }
    function handlePrecioProducto(item, itemm) {
        if (descripcionFoto == '') {
            return (
                <View key={itemm} style={{ position: "absolute", bottom: 10, right: 7, width: 30, height: 30, backgroundColor: "#453091", borderRadius: 7, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "#fff", fontSize: 10 }}>
                        ${item}
                    </Text>
                </View>
            )
        }
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


    async function handleAceptar(id: string, title: string, precios: number, foto: string, descripcion: string) {
        const obj = {
            id: id,
            nombre: title,
            cantidad: numeropedido,
            descripcion: descripcion,
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

    const [modalreferencia, setModalreferencia] = useState(false);

    //funcion de las estrellas
    async function ratingCompleted() {

        let data = {
            'bussiness_id' : business.id,
            'user_id' : user.id,
            'descripcion' : reviewTexArea,
            'puntuacion' : reviewState,
            'id': review.id,
        }
        let responseReview =  await sendReview(data);

        console.log(responseReview.review)

        if (responseReview.response == true){
            if(review.id == ""){
                responseReview.review.url_imagen = user.url_imagen
                responseReview.review.name = user.name
                business.reviews.push(responseReview.review)
                setBusiness(business)
            }else{

                business.reviews.forEach((data, key) => {
                    if(data['id'] == responseReview.review.id){
                        business.reviews[key].descripcion = responseReview.review.descripcion; 
                        business.reviews[key].puntuacion =  responseReview.review.puntuacion;
                    }
                })
                setBusiness(business)
            }
        }
    }

    const [modalmensaje, setModalmensaje] = useState(false);
    
    const [modalinformacion, setModalinformacion] = useState(false);


    const renderItem = ({ item }: BusinessCategory) => (
        <View style={{ marginRight: 5 }}>
            <Text style={styles.TextoCategorias}>
                {item.name}
            </Text>
        </View>
    );

    const renderReferencia = ({ item }: BusinessCategory) => (
        <View style={{ width: 120, marginRight: 20, backgroundColor: "#9175DC", padding: 10, flexWrap: 'wrap', borderRadius: 20 }}>
            <View style={{ flexDirection: "row" }}>
                <View style={{ width: "34%" }}>
                    <Image
                        source={{ uri: item.url_imagen }}
                        style={{ width: 33, height: 33, resizeMode: "cover", borderRadius: 200 }}
                    />
                </View>
                <View style={{ width: "2%" }}></View>
                <View style={{ width: "64%" }}>
                    <Text numberOfLines={2} style={{ color: "#fff" }}>
                        {item.name}
                    </Text>
                </View>
            </View>
            <View style={{ paddingVertical: 5, flexDirection: "row" }}>
                <Text style={{ color: "#fff" }}>{item.puntuacion}</Text>
                <Icon style={{ marginLeft: 7, marginTop: 3 }} name='star' size={10} color='#fff' />
            </View>
            <View>
                <Text style={{ color: "#fff" }} numberOfLines={1}>
                    {item.descripcion}
                </Text>
            </View>
        </View>
    );

    // y aqui finaliza
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#453091" }}>
            <ImageBackground source={require('../../sources/img/Background.jpg')} resizeMode="cover" style={styles.BannerTitulo}>
                <View style={{ flexDirection: "row", width: "95%" }}>
                    <View style={{ width: "25%" }}>
                        <View style={{ borderWidth: 2, padding: 3, borderRadius: 100, borderColor: "#fff", width: 70 }}>
                            <Image
                                source={(business.url_logo == null || business.url_logo == '') ? require('../../sources/img/url_default.png') : { uri: business.url_logo }}
                                style={{ width: 60, height: 60, borderRadius: 200, }}
                            />
                        </View>
                    </View>
                    <View style={{ width: "70%" }}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ color: "#fff", marginTop: 5, fontSize: 20 }}>
                                {business.name}
                            </Text>
                            <Image
                                source={require('../../sources/img/verificado.png')}
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
                        <Text style={{ color: "#fff", textAlign: "center", fontSize: 10 }}>CLIENTES FAVORITOS</Text>
                    </View>
                    <View style={{ width: "32%" }}>
                        <Text style={{ color: "#fff", textAlign: "center", fontSize: 10 }}>198</Text>
                        <Text style={{ color: "#fff", textAlign: "center", fontSize: 10 }}>RESEÑAS DE CLIENTES SATISFECHOS</Text>
                    </View>
                    <View style={{ width: "32%" }}>
                        <Text style={{ color: "#fff", textAlign: "center", fontSize: 10 }}>4.5</Text>
                        <Text style={{ color: "#fff", textAlign: "center", fontSize: 10 }}>ESTRELLLAS DE PUNTUACION</Text>
                    </View>
                </View>
                <View style={{ width: "95%", height: 25, backgroundColor: "white", borderTopLeftRadius: 20, borderTopRightRadius: 20, }}></View>
            </ImageBackground>
            <ScrollView style={styles.container}>
                { //favorite.length == 0 ?
                    //<TouchableOpacity onPress={() => followBussiness(user.id, business.id)} style={[styles.Seguidores, { backgroundColor: 'white', maxHeight: '40%', borderColor: 'gold', borderWidth: 1 }]}>
                    //<Icon name={"star"} style={[styles.TextoSeguidores, { fontSize: 20, marginTop: 0, color: 'gold' }]} />
                    //</TouchableOpacity>
                    //:
                    //<TouchableOpacity onPress={() => unFollowBussiness(user.id, business.id)} style={[styles.Seguidores, { backgroundColor: 'gold', maxHeight: '40%' }]}>
                    //<Icon name={"star"} style={[styles.TextoSeguidores, { fontSize: 20, marginTop: 0, color: 'white' }]} />
                    //</TouchableOpacity>
                }
                <View style={styles.ContainerFotos}>

                    <View style={{ width: "90%", flexDirection: "row", marginHorizontal: "5%" }}>
                        <View style={{ width: "20%"}}>
                            <TouchableOpacity
                                style={{ width: "100%", alignItems: "center" }}   
                                onPress={ () => setModalinformacion(!modalinformacion) }                   
                            >
                            <Image source={require('../../sources/img/informacion.png')} style={{ width: 35, resizeMode: "stretch", height: 35 }} />
                            <Text style={{ textAlign: "center", color: "#A191B7", fontSize: 11, marginTop: 5 }}>
                                Infomación
                            </Text>
                            </TouchableOpacity>
                            {modalinformacion ? (
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={true}
                                >
                                    <View style={{ backgroundColor: "#0000005c", flex: 1, justifyContent: "center", alignItems: "center" }}>
                                        <View style={{ width: 300, paddingTop: 20, padding: 15, backgroundColor: "#fff", borderRadius: 15 }}>
                                            <Text style={{ color: "#000", textAlign: "center", fontWeight: "900", marginBottom: 10 }}>
                                                Mi Información
                                            </Text>
                                            <Text style={{color:"#000", marginBottom: 10}}>
                                                {business.description}
                                            </Text>
                                            <Text style={{ color: "#000", textAlign: "center", fontWeight: "900", marginBottom: 10 }}>
                                                Mi Ubicación
                                            </Text>
                                            <Text style={{color:"#000", marginBottom: 10}}>
                                                {business.direccion}
                                            </Text>
                                            <Text style={{ color: "#000", textAlign: "center", fontWeight: "900", marginBottom: 10 }}>
                                                Mi Teléfono
                                            </Text>
                                            <Text style={{color:"#000", marginBottom: 10}}>
                                                {business.phone}
                                            </Text>
                                            <View style={{ width: "100%", flexDirection: "row", justifyContent: "center" }}>
                                                <TouchableOpacity
                                                    style={{ width: '70%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#453091', height: 45, borderRadius: 50 }}
                                                    onPress={() => { setModalinformacion(!modalinformacion) }}
                                                >
                                                    <Text style={{ color: "#fff", fontWeight: "800" }}>
                                                        Regresar
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </Modal>

                            ) : null}
                        </View>
                        <View style={{ width: "20%", alignItems: "center" }}>
                            <Image source={require('../../sources/img/favorito.png')} style={{ width: 35, resizeMode: "stretch", maxHeight: 35 }} />
                            <Text style={{ textAlign: "center", color: "#A191B7", fontSize: 11, marginTop: 5 }}>
                                Favoritos
                            </Text>
                        </View>
                        <View style={{ width: "20%" }}>
                            <TouchableOpacity
                                style={{ alignItems: "center" }}
                                onPress={() => setModalmensaje(!modalmensaje)}
                            >
                                <Image source={require('../../sources/img/mensajes.png')} style={{ width: 35, resizeMode: "stretch", maxHeight: 35 }} />
                                <Text style={{ textAlign: "center", color: "#A191B7", fontSize: 11, marginTop: 5 }}>
                                    Mensajes
                                </Text>
                            </TouchableOpacity>
                            {modalmensaje ? (
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={true}
                                >
                                    <View style={{ backgroundColor: "#0000005c", flex: 1, justifyContent: "center", alignItems: "center" }}>
                                        <View style={{ width: 300, paddingTop: 20, padding: 15, backgroundColor: "#fff", borderRadius: 15 }}>
                                            <TouchableOpacity
                                                style={{ position: "absolute", right: 5, top: 5 }}
                                                onPress={() => { setModalmensaje(!modalmensaje) }}
                                            >
                                                <Icon name='x' color='#453091' size={25} />
                                            </TouchableOpacity>
                                            <Text style={{ color: "#000", textAlign: "center", fontWeight: "900", marginBottom: 10 }}>
                                                Déjame un mensaje aquí
                                            </Text>
                                            <Textarea
                                                containerStyle={{ backgroundColor: '#F0F0F0', paddingHorizontal: 7, borderRadius: 15 }}
                                                maxLength={120}
                                                placeholder={'Escribir mensaje aquí'}
                                                placeholderTextColor={'#565656'}
                                                underlineColorAndroid={'transparent'}
                                            />
                                            <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                                                <TouchableOpacity
                                                    style={{ width: '48%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#9175DC', height: 45, borderRadius: 50 }}
                                                >
                                                    <Text style={{ color: "#fff", fontWeight: "800" }}>
                                                        Vaciar
                                                    </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={{ width: '48%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#453091', height: 45, borderRadius: 50 }}
                                                >
                                                    <Text style={{ color: "#fff", fontWeight: "800" }}>
                                                        Apectar
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </Modal>

                            ) : null}
                        </View>
                        <View style={{ width: "20%", alignItems: "center" }}>
                            <TouchableOpacity
                                onPress={
                                    () => { setModalPrecioFinal(!modalPrecioFinal), handleSumaPago() }
                                }
                            >
                                <View style={styles.Badge}>
                                    <Text style={styles.TextoBadge}>
                                        {
                                            contadorcarrito
                                        }
                                    </Text>
                                </View>
                                <Image
                                    source={require('../../sources/img/pedir.png')}
                                    style={{ width: 35, resizeMode: "stretch", maxHeight: 35, zIndex: -99 }}
                                />
                                <Text style={{ textAlign: "center", color: "#A191B7", fontSize: 11, marginTop: 5 }}>
                                    Pedir
                                </Text>
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
                                                style={{ position: 'absolute', right: 10, top: 5 }}
                                                onPress={
                                                    () => setModalPrecioFinal(!modalPrecioFinal)
                                                }
                                            >
                                                <Icon name='x' size={25} color='#453091' style={{ fontWeight: "900" }} />
                                            </TouchableOpacity>
                                            <View style={{ width: 280, flexDirection: 'row', backgroundColor: '#453091', borderTopLeftRadius: 20, borderTopRightRadius: 20, height: 40 }}>
                                                <View style={{ width: '33.33%', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ color: '#fff' }}>
                                                        Titulo
                                                    </Text>
                                                </View>
                                                <View style={{ width: '33.33%', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ color: '#fff' }}>
                                                        Cantidad
                                                    </Text>
                                                </View>
                                                <View style={{ width: '33.33%', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ color: '#fff' }}>
                                                        Precios
                                                    </Text>
                                                </View>
                                            </View>
                                            {
                                                carrito.productos.map((n: any, index: any) =>
                                                    <View style={[{ width: 280, flexDirection: 'row', height: 40 }, { backgroundColor: index % 2 === 0 ? '#E5E5E5' : '#EFEFEF' }]}
                                                        key={n.id}
                                                    >
                                                        <View style={{ width: '33.33%', justifyContent: 'center', alignItems: 'center' }}>
                                                            <Text numberOfLines={1} style={{ color: '#000' }}>
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
                                            <View style={[{ width: 280, flexDirection: 'row', height: 40, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, }, { backgroundColor: carrito.productos.length % 2 === 0 ? '#E5E5E5' : '#EFEFEF' }]}
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
                                            <View style={{ flexDirection: 'row', marginVertical: 20, justifyContent: "space-between" }}
                                            >
                                                <TouchableOpacity onPress={() => vaciarCarro()} style={{ width: '48%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#9175DC', height: 45, borderRadius: 50 }}>
                                                    <View >
                                                        <Text style={{ color: '#ffff', fontWeight: '800' }}>
                                                            Vaciar
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>

                                                <TouchableOpacity onPress={() => { sendMessage(carrito.productos) }} style={{ width: '48%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#453091', height: 45, borderRadius: 50 }}>
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
                        <View style={{ width: "20%" }}>
                            <TouchableOpacity
                                style={{ alignItems: "center", width: "100%" }}
                                onPress={() => { setModalreferencia(!modalreferencia) }}
                            >
                                <Image source={require('../../sources/img/referencias.png')} style={{ width: 35, resizeMode: "stretch", maxHeight: 35 }} />
                                <Text style={{ textAlign: "center", color: "#A191B7", fontSize: 11, marginTop: 5 }}>
                                    Referencias
                                </Text>
                            </TouchableOpacity>
                            {modalreferencia ? (
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={true}
                                >
                                    <View style={{ backgroundColor: "#0000005c", flex: 1, justifyContent: "center", alignItems: "center" }}>
                                        <View style={{ width: 300, paddingTop: 20, padding: 15, backgroundColor: "#fff", borderRadius: 15 }}>
                                            <TouchableOpacity
                                                style={{ position: "absolute", right: 5, top: 5 }}
                                                onPress={() => { setModalreferencia(!modalreferencia) }}
                                            >
                                                <Icon name='x' color='#453091' size={25} />
                                            </TouchableOpacity>
                                            <Text style={{ color: "#000", textAlign: "center", fontWeight: "900", marginBottom: 10 }}>
                                                Déjame una refencia aquí
                                            </Text>
                                            <Rating
                                                startingValue={reviewState}
                                                onFinishRating={(e:any) => {setReviewState(e)}}
                                                type='custom'
                                                tintColor="white"
                                                ratingColor="#453091"
                                                ratingBackgroundColor="#9175dc38"
                                                imageSize={30}
                                                fractions={2}
                                                style={{marginBottom:10}}
                                            />
                                            <Textarea
                                                containerStyle={{ backgroundColor: '#F0F0F0', paddingHorizontal: 7, borderRadius: 15 }}
                                                maxLength={120}
                                                placeholder={'Escribir referencia aquí'}
                                                placeholderTextColor={'#565656'}
                                                underlineColorAndroid={'transparent'}
                                                onChangeText={(e:any) => { setReviewTexArea(e)}}
                                                defaultValue={reviewTexArea}
                                            />
                                            <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                                                <TouchableOpacity onPress={() => { setModalreferencia(!modalreferencia) }}
                                                    style={{ width: '48%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#9175DC', height: 45, borderRadius: 50 }}
                                                >
                                                    <Text style={{ color: "#fff", fontWeight: "800" }}>
                                                        Cancelar
                                                    </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => {ratingCompleted()}}
                                                    style={{ width: '48%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#453091', height: 45, borderRadius: 50 }}
                                                >
                                                    <Text style={{ color: "#fff", fontWeight: "800" }}>
                                                        Apectar
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </Modal>

                            ) : null}
                        </View>
                    </View>
                    <View style={{ width: "90%", flexDirection: "row", marginHorizontal: "5%" }}>
                        <Text style={{ color: "#453091", fontSize: 20 }}>
                            PRODUCTOS
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
                    <View style={{ width: '90%', flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: "5%", justifyContent: "space-between" }}>

                        {
                            business.productos.map((n: any) =>

                                <View key={n.id} style={{ width: '30%', marginBottom: '1%', backgroundColor: "#9DCFFB", borderRadius: 20 }}>
                                    <TouchableOpacity
                                        style={{ height: 100, justifyContent: "center", alignItems: "center" }}
                                        onPress={
                                            () => { setDescripcionFoto(n.id), handleAlertClick() }
                                        }
                                    >
                                        <Image
                                            source={(n.url_imagen == '') ? require('../../sources/img/Captura.jpg') : { uri: n.url_imagen }}
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
                                                        {
                                                            console.log(n.slider)
                                                        }
                                                        {sliderModal ? (

                                                            <View style={styles.ContainerSlider}>

                                                                <Swiper
                                                                    activeDotStyle={{ backgroundColor: '#453091' }}
                                                                    dotStyle={{ backgroundColor: '#fff' }}
                                                                >
                                                                    {
                                                                        JSON.parse(n.slider).map((e: any) => {

                                                                            return (
                                                                                <View key={e.id} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                                                                    <Image
                                                                                        source={{ uri: e.url }}
                                                                                        style={{ width: 300, height: 170, resizeMode: "stretch" }}
                                                                                    />
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
                                                        <View style={{ width: "90%", marginHorizontal: "5%", flexDirection: "row", marginVertical: 20 }}>
                                                            <View style={styles.ContainerPrecio}>
                                                                <Text style={styles.TextoPrecio}>
                                                                    ${n.precio * numeropedido}
                                                                </Text>
                                                            </View>
                                                            <View style={styles.ContainerSumaResta}>
                                                                <View style={{ width: "35%", alignItems: "center", justifyContent: "center" }}>
                                                                    <TouchableOpacity
                                                                        onPress={
                                                                            () => handleRestar()
                                                                        }
                                                                    >
                                                                        <Text style={styles.TextBotonSumarRestar}>
                                                                            -
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                                <View style={{ width: "30%", backgroundColor: "#ae9dc4", justifyContent: "center", alignItems: "center" }}>
                                                                    <Text style={{ color: '#fff' }}>
                                                                        {numeropedido}
                                                                    </Text>
                                                                </View>
                                                                <View style={{ width: "35%", alignItems: "center", justifyContent: "center" }}>
                                                                    <TouchableOpacity
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
                                                        </View>
                                                        <View style={styles.ContainerBotonesCarrito}>
                                                            <TouchableOpacity
                                                                style={styles.BotonCarrito}
                                                                onPress={
                                                                    () => { setModalDescripcion(''), handleCancelar() }
                                                                }
                                                            >
                                                                <Text style={styles.TextBotonCarrito}>
                                                                    Cancelar
                                                                </Text>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity
                                                                style={styles.BotonCarrito}
                                                                onPress={
                                                                    () => {
                                                                        const id = n.id;
                                                                        const title = n.producto;
                                                                        const precios = n.precio * numeropedido;
                                                                        const foto = n.url_imagen;
                                                                        const descripcion = n.descripcion;
                                                                        handleAceptar(id, title, precios, foto, descripcion)
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
                    <View style={{ width: "90%", flexDirection: "row", marginHorizontal: "5%", marginTop: 20, marginBottom: 10 }}>
                        <Text style={{ color: "#453091", fontSize: 18 }}>
                            Reseñas de Clientes Satisfechos
                        </Text>
                    </View>
                    <View style={styles.ContainerAdd}>
                        <FlatList
                            horizontal={true}
                            data={business.reviews}
                            renderItem={renderReferencia}
                            keyExtractor={(item: any) => item.id}
                        />
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginHorizontal: "2.5%",
        width: "95%"
    },
    Seguidores: {
        width: '22%',
        alignItems: 'center',
        paddingTop: 10,
        marginRight: 8
    },
    ContainerAdd: {
        width: '90%',
        marginHorizontal: "5%",
        flexDirection: 'row',
        flex: 1
    },
    TextoCategorias: {
        color: '#524499',
        marginVertical: 10
    },
    ContainerFotos: {
        width: '100%',
        paddingVertical: 5,
        backgroundColor: '#fff',
        paddingBottom: 20,
        alignItems: "flex-start"
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
        width: '70%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: "#f1f1f1",
        height: 45,
        borderRadius: 20,
        marginLeft: "7%"
    },
    TextBotonSumarRestar: {
        fontSize: 20,
        color: '#453091',
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
        width: "90%",
        marginHorizontal: "5%",
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    BotonCarrito: {
        height: 45,
        justifyContent: 'center',
        width: '45%',
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
        width: '23%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#f1f1f1",
        height: 45,
        borderRadius: 20,
    },
    TextoPrecio: {
        color: '#453091',
        fontWeight: '900'
    },
    ImagenIconcarrito: {
        width: 40,
        height: 40,
        marginTop: 10
    },
    Badge: {
        backgroundColor: '#786DAF',
        width: 25,
        height: 25,
        borderRadius: 20,
        position: 'absolute',
        right: -13,
        top: -5,
        zIndex: 9,
        justifyContent: 'center',
        alignItems: 'center'
    },
    TextoBadge: {
        color: '#fff',
        fontSize: 10
    },
    ContaierPagar: {
        borderRadius: 25,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        width: 320,
        paddingTop: 30
    },
    ContainerSlider: {
        width: 300,
        height: 170,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000d9',
        zIndex: 99,
        position: "relative"
    },
    BannerTitulo: {
        width: '100%',
        height: 195,
        backgroundColor: '#000',
        alignItems: 'center',
        paddingTop: 30,
    },
});

export default DetalleNegocioScreen;

AppRegistry.registerComponent('myproject', () => DetalleNegocioScreen)