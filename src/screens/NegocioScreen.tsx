import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView, Linking } from 'react-native';



export default class NegocioScreen extends Component<{},any>{


    constructor(props:any){
        super(props);
        this.state= {
            dataBanner:[],
            informacionShow: false,
            serviciosShow:false,
            productosShow:false,
            contactenosShow:false,
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
        console.log(id)
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




    render(){ 
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
                <Text style={{paddingBottom:10}}>
                    Lunes a Viernes 9:00 - 18:00
                </Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'white',paddingBottom:10}}>
            <View style={{width:'40%', alignItems:'center', justifyContent:'center'}}>
                <TouchableOpacity
                    onPress={
                        () => Linking.openURL(item.url_catalogo)
                    }
                >
                    <Image 
                        source={require('../sources/img/pdf.png')}
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
                        source={require('../sources/img/whatsapp.png')}
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
                    <View style={{backgroundColor:'white',padding:10,marginTop:-7}}>
                        <Text style={{textAlign:'justify'}}>
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
                    <View style={{backgroundColor:'white',padding:10,marginTop:-7,flexDirection:'row',flexWrap:'wrap'}}>

                        {
                            item.servicios.map((n:any) => 

                            <View
                                key={
                                    n.id
                                } 
                                style={{width:'33.3%'}}
                            >
                                <Text
                                    style={{fontSize:17,marginBottom:5}}
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
                    <View style={{backgroundColor:'white',padding:10,marginTop:-7}}>
                        <Text style={{textAlign:'justify'}}>
                        
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
                    <View style={{backgroundColor:'white',padding:10,marginTop:-7}}>
                        <Text style={{textAlign:'justify',fontWeight:'bold'}}>
                            Dirección:
                        </Text>
                        <Text style={{textAlign:'justify',marginBottom:10}}>
                            {item.direccion}
                        </Text>
                        <Text style={{textAlign:'justify',fontWeight:'bold'}}>
                            Teléfono:
                        </Text>
                        <Text style={{textAlign:'justify',marginBottom:10}}>
                            {item.phone}
                        </Text>
                        <Text style={{textAlign:'justify',fontWeight:'bold'}}>
                            Email:
                        </Text>
                        <Text style={{textAlign:'justify',marginBottom:10}}>
                            {item.email}
                        </Text>
                        <Text style={{textAlign:'justify',fontWeight:'bold'}}>
                            Sitio Web:
                        </Text>
                        <Text style={{textAlign:'justify',marginBottom:10}}>
                            {item.sitio_web}
                        </Text>
                    </View>
                ):null
                }
            </View>
            <View style={{backgroundColor:"white",marginVertical:7,width:'100%',paddingVertical:15,paddingHorizontal:20,justifyContent:'space-between',flexDirection:'row'}}>

            {
                            item.redes_sociales.map((n:any) => 

                            <View
                                key={n.id}
                            >
                                <Text
                                    style={{fontSize:17,marginBottom:5}}
                                >
                                    {n.red_social}
                                </Text>
                            </View>

                            )
                        }

            </View>


            <View style={{backgroundColor:"white",marginVertical:7,width:'100%',paddingVertical:15,paddingHorizontal:20,justifyContent:'space-between',flexDirection:'row'}}>

                <Image 
                    source={require('../sources/img/webfalse.png')}
                    style={{width:50,height:50,borderRadius:50}} 
                />
                <Image 
                    source={require('../sources/img/facebook.png')}
                    style={{width:50,height:50,borderRadius:50}} 
                />

                <Image 
                    source={require('../sources/img/instagramfalse.png')}
                    style={{width:50,height:50,borderRadius:50}} 
                />
                <Image 
                    source={require('../sources/img/youtube.png')}
                    style={{width:50,height:50,borderRadius:50}} 
                />
                <Image 
                    source={require('../sources/img/tiktokfalse.png')}
                    style={{width:50,height:50,borderRadius:50}} 
                />

            </View>

    </ScrollView>
        )
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