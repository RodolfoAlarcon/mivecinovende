import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView, Linking,ActivityIndicator, Dimensions, _ScrollView, Alert } from 'react-native';
import apiApp from '../../api/api';
import { Searchbar } from 'react-native-paper';
import RedSocial from '../../components/RedSocial';
import { AuthContex } from '../../context/UsuarioContext'
import Snackbar from 'react-native-snackbar'

export default class NegocioScreen extends Component<{},any>{

    static contextType = AuthContex
    constructor(props:any){
        super(props);
        this.state= {
            isLoading:true,
            dataBanner:[],
            informacionShow: false,
            serviciosShow:false,
            productosShow:false,
            contactenosShow:false,
            facebook:""
        }
    }
    componentHideAndoShowInfomacion = () => {
        this.setState((previousState:any) => ({informacionShow: !previousState.informacionShow}))
    }
    componentHideAndoShowServicios = () => {
        this.setState((previousState:any) => ({serviciosShow: !previousState.serviciosShow}))
    }
    componentHideAndoShowProductos = () => {
        this.setState((previousState:any) => ({productosShow: !previousState.productosShow}))
    }
    componentHideAndoShowContactenos = () => {
        this.setState((previousState:any) => ({contactenosShow: !previousState.contactenosShow}))
    }
    
    componentDidMount(){
        const { id } = this.props.route.params;
        const url = `https://04.contenedoresnolvis.com/api/data-negocio/${id}`;
        return fetch(url)
        .then((response) => response.json())
        .then((responseJson)=> {  
            if(typeof responseJson.data === 'object'){ 
                this.setState({
                    isLoading:false,
                    dataBanner: responseJson.data
                })
            }else{
                this.setState({
                    isLoading:false,
                    dataBanner: []
                })
            }    
        })
        .catch((error:any)=> {
            console.log(error)
        })
    }

    _RedesSocialesWeb(item:any){
        const redsocial = item.redes_sociales.filter((n:any) => n.red_social == "web")
        let link = ""
        if(redsocial.length > 0){
            const url = item.redes_sociales.filter((n:any) => {
                if(n.red_social == "facebook"){
                    link = n.redsocial_url
                }
            })
            return(
                <TouchableOpacity
                    onPress={
                        () => Linking.openURL('https://'+link)
                    }
                >
                    <Image 
                        source={require('../../sources/img/web.png')}
                        style={{width:50,height:50,borderRadius:50}} 
                    />
                </TouchableOpacity>
            )
        }else{
            return(
                <TouchableOpacity>
                    <Image 
                        source={require('../../sources/img/webfalse.png')}
                        style={{width:50,height:50,borderRadius:50}} 
                    />
                </TouchableOpacity>
            )
        }
    }
    _RedesSocialesFacebook(item:any){
        const redsocial = item.redes_sociales.filter((n:any) => n.red_social == "facebook")
        let link = ""
        if(redsocial.length > 0){
            const url = item.redes_sociales.filter((n:any) => {
                if(n.red_social == "facebook"){
                    link = n.redsocial_url
                }
            })
            return(
                <TouchableOpacity
                    onPress={
                        () => Linking.openURL('https://'+link)
                    }
                >
                    <Image 
                        source={require('../../sources/img/facebook.png')}
                        style={{width:50,height:50,borderRadius:50}} 
                    />
                </TouchableOpacity>
            )
        }else{
            return(
                <TouchableOpacity>
                    <Image 
                        source={require('../../sources/img/facebookfalse.png')}
                        style={{width:50,height:50,borderRadius:50}} 
                    />
                </TouchableOpacity>
            )
        }
    }
    _RedesSocialesInstagram(item:any){
        const redsocial = item.redes_sociales.filter((n:any) => n.red_social == "instagram")
        let link = ""
        if(redsocial.length > 0){
            const url = item.redes_sociales.filter((n:any) => {
                if(n.red_social == "facebook"){
                    link = n.redsocial_url
                }
            })
            return(
                <TouchableOpacity
                    onPress={
                        () => Linking.openURL('https://'+link)
                    }
                >
                    <Image 
                        source={require('../../sources/img/instagram.png')}
                        style={{width:50,height:50,borderRadius:50}} 
                    />
                </TouchableOpacity>
            )
        }else{
            return(
                <TouchableOpacity>
                    <Image 
                        source={require('../../sources/img/instagramfalse.png')}
                        style={{width:50,height:50,borderRadius:50}} 
                    />
                </TouchableOpacity>
            )
        }
    }
    _RedesSocialesYoutube(item:any){
        const redsocial = item.redes_sociales.filter((n:any) => n.red_social == "youtube")
        let link = ""
        if(redsocial.length > 0){
            const url = item.redes_sociales.filter((n:any) => {
                if(n.red_social == "facebook"){
                    link = n.redsocial_url
                }
            })
            return(
                <TouchableOpacity
                    onPress={
                        () => Linking.openURL('https://'+link)
                    }
                >
                    <Image 
                        source={require('../../sources/img/youtube.png')}
                        style={{width:50,height:50,borderRadius:50}} 
                    />
                </TouchableOpacity>
            )
        }else{
            return(
                <TouchableOpacity>
                    <Image 
                        source={require('../../sources/img/youtubefalse.png')}
                        style={{width:50,height:50,borderRadius:50}} 
                    />
                </TouchableOpacity>
            )
        }
    }
    _RedesSocialesTiktok(item:any){
        const redsocial = item.redes_sociales.filter((n:any) => n.red_social == "tiktok")
        let link = ""
        if(redsocial.length > 0){
            const url = item.redes_sociales.filter((n:any) => {
                if(n.red_social == "facebook"){
                    link = n.redsocial_url
                }
            })
            return(
                <TouchableOpacity
                    onPress={
                        () => Linking.openURL('https://'+link)
                    }
                >
                    <Image 
                        source={require('../../sources/img/tiktok.png')}
                        style={{width:50,height:50,borderRadius:50}} 
                    />
                </TouchableOpacity>
            )
        }else{
            return(
                <TouchableOpacity>
                    <Image 
                        source={require('../../sources/img/tiktokfalse.png')}
                        style={{width:50,height:50,borderRadius:50}} 
                    />
                </TouchableOpacity>
            )
        }
    }




    render(){ 
        let ScreenHeight = Dimensions.get("window").height;

        if (this.state.isLoading) {
            return(
                <View 
                    style={{
                        justifyContent:"center",
                        alignItems:"center",
                        height: ScreenHeight,
                        width:"100%",
                        backgroundColor:"white"
                    }}
                >
                    <Image
                        source={require('../../sources/img/icono.png')}
                    />
                </View>
            )
        }else{
            return(
                <View style={{flex:1,backgroundColor:'#e5e7ea'}}>
                    <FlatList  
                        numColumns={1}
                        data={this.state.dataBanner}
                        renderItem={({item})=>this._renderItem(item)}
                        keyExtractor ={(item:any,index)=>index.toString()}
                        style={{width:'100%',paddingVertical:15}}
                    />
                </View>
            )
        }
    }


    

    _renderItem(item:any){ 
        return(
            <ScrollView style={{flex:1,backgroundColor:'#e5e7ea'}}>
            <View style={{width:'100%',justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
                <Image 
                    source={{uri:item.url_logo}}
                    style={{width:100,height:100,borderRadius:200,marginHorizontal:20,marginVertical:20}} 
                />
                <Text style={{fontSize:20,color:'black',paddingVertical:10}}>
                    {item.name}
                </Text>
                <Text style={{paddingBottom:10,color:"#000"}}>
                    Lunes a Viernes 9:00 - 18:00
                </Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'white',paddingBottom:10,marginBottom:5}}>
            <View style={{width:'40%', alignItems:'center', justifyContent:'center'}}>
                <TouchableOpacity
                    onPress={
                        () => Linking.openURL(item.url_catalogo)
                    }
                >
                    <Image 
                        source={require('../../sources/img/pdf.png')}
                        style={{width:110,height:55, resizeMode:'contain',marginVertical:4}} 
                    />
                </TouchableOpacity>
            </View>
            <View style={{width:'40%', alignItems:'center', justifyContent:'center'}}>
                <TouchableOpacity
                    onPress={
                        () => Linking.openURL('https://api.whatsapp.com/send?phone=+593'+item.phone)
                    }
                >
                    <Image 
                        source={require('../../sources/img/whatsapp.png')}
                        style={{width:110,height:55, resizeMode:'contain',marginVertical:4}} 
                    />
                </TouchableOpacity>
            </View>
            </View>
            <View>
                <TouchableOpacity
                    style={{backgroundColor:'white',marginVertical:7,width:'100%',paddingVertical:15,paddingLeft:10}}
                    onPress={
                         this.componentHideAndoShowInfomacion
                    }
                >
                    <Text style={{color:'black',fontSize:18}}>
                        Informacion
                    </Text>
                </TouchableOpacity>
                { this.state.informacionShow? (
                    <View style={{backgroundColor:'white',padding:10,marginTop:-8}}>
                        <Text style={{textAlign:'justify',color:"#000"}}>
                            {item.description}
                        </Text>
                    </View>
                ):null
                }
            </View>


            <View>
                <TouchableOpacity
                    style={{backgroundColor:'white',marginVertical:7,width:'100%',paddingVertical:15,paddingLeft:10}}
                    onPress={
                        this.componentHideAndoShowServicios
                   }
                >
                    <Text style={{color:'black',fontSize:18}}>
                        Servicios
                    </Text>
                </TouchableOpacity>
                { this.state.serviciosShow? (
                    <View style={{backgroundColor:'white',padding:10,marginTop:-8,flexDirection:'row',flexWrap:'wrap'}}>

                        {
                            item.servicios.map((n:any) => 

                            <View
                                key={
                                    n.id
                                } 
                                style={{width:'33.3%'}}
                            >
                                <Text
                                    style={{fontSize:17,marginBottom:5,color:"#000"}}
                                >
                                    • {n.servicio}
                                </Text>
                            </View>

                            )
                        }
                    </View>
                ):null
                }
            </View>



            <View>
                <TouchableOpacity
                    style={{backgroundColor:'white',marginVertical:7,width:'100%',paddingVertical:15,paddingLeft:10}}
                    onPress={
                        this.componentHideAndoShowProductos
                   }
                >
                    <Text style={{color:'black',fontSize:18}}>
                        Productos
                    </Text>
                </TouchableOpacity>
                { this.state.productosShow? (
                    <View style={{backgroundColor:'white',padding:10,marginTop:-8}}>
                        <Text style={{textAlign:'justify',color:"#000"}}>

                        </Text>
                    </View>
                ):null
                }
            </View>



            <View>
                <TouchableOpacity
                    style={{backgroundColor:'white',marginVertical:7,width:'100%',paddingVertical:15,paddingLeft:10}}
                    onPress={
                        this.componentHideAndoShowContactenos
                   }
                >
                    <Text style={{color:'black',fontSize:18}}>
                        Contáctanos
                    </Text>
                </TouchableOpacity>
                { this.state.contactenosShow? (
                    <View style={{backgroundColor:'white',padding:10,marginTop:-8}}>
                        <Text style={{textAlign:'justify',fontWeight:'bold',color:"#000"}}>
                            Dirección:
                        </Text>
                        <Text style={{textAlign:'justify',marginBottom:10,color:"#000"}}>
                            {item.direccion}
                        </Text>
                        <Text style={{textAlign:'justify',fontWeight:'bold',color:"#000"}}>
                            Teléfono:
                        </Text>
                        <Text style={{textAlign:'justify',marginBottom:10,color:"#000"}}>
                            {item.phone}
                        </Text>
                        <Text style={{textAlign:'justify',fontWeight:'bold',color:"#000"}}>
                            Email:
                        </Text>
                        <Text style={{textAlign:'justify',marginBottom:10,color:"#000"}}>
                            {item.email}
                        </Text>
                        <Text style={{textAlign:'justify',fontWeight:'bold',color:"#000"}}>
                            Sitio Web:
                        </Text>
                        <Text style={{textAlign:'justify',marginBottom:10,color:"#000"}}>
                            {item.sitio_web}
                        </Text>
                    </View>
                ):null
                }
            </View>
            <View style={{backgroundColor:"white",marginVertical:7,width:'100%',paddingVertical:15,paddingHorizontal:20,justifyContent:'space-between',flexDirection:'row',marginBottom:14}}>
                {
                    this._RedesSocialesWeb(item)
                }
                {
                    this._RedesSocialesFacebook(item)
                }
                {
                    this._RedesSocialesInstagram(item)
                }
                {
                    this._RedesSocialesYoutube(item)
                }
                {
                    this._RedesSocialesTiktok(item)
                }
            </View>
            <View
            
            >
                <TouchableOpacity
                style={{backgroundColor:'blue',marginVertical:7,width:'100%',paddingVertical:15,paddingLeft:10}}
                onPress={()=>confirmToque(item.id, this.context.user )  }><Text style={{fontSize:20, textAlign:'center', color: "#fff"}} >Dar un Toque</Text></TouchableOpacity>
            </View>

         

    </ScrollView>
        )
    }
}

function confirmToque(id: any, user:any) {
    Alert.alert("Dar un Toque", "Seguro de \n enviar un toque?",
            [
                {
                    text: "Si", onPress: () => {
                        getNotificationsApi(id, user)
                        
                    }
                },
                {
                    text: "No", onPress: () => { }, style: 'cancel'
                }
            ]
        )
}

async function getNotificationsApi(id: any, user:any){


    const datas = {
        
            business_id: id,
            name: user.name,
            phone: user.phone,
            email: user.email,
            address: user.direccion,
        
    }


        try {
            const resp = await apiApp.post('/create-notification', datas)
    
            Snackbar.show({
                text: resp.data.message,
                duration: Snackbar.LENGTH_LONG,
            })
    
        } catch (error) {
            Snackbar.show({
                text: error.response.data.message,
                duration: Snackbar.LENGTH_LONG,
            })
        }

}
const styles = StyleSheet.create({
    banner:{
        height:50,
        backgroundColor: '#007ba4',
    },
    textbanner:{
        color:'#ffffff',
        fontSize:17, 
        fontWeight:'bold',
        textAlign:'center',
        marginVertical:13
    },
    buscador:{
        height:45,
        backgroundColor:'#dfa71b',
        width:'100%'
    },
    titulo:{
        height:100,
        width:'100%',
        backgroundColor:'#fed1e5',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    texttitulo:{
        fontSize:17,
        fontWeight:'bold',
        color:'#000'
    },
    textbotones:{
        textAlign:'center',
        fontSize:17
    },
  });