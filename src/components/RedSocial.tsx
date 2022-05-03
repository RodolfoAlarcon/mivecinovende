import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView, Linking,ActivityIndicator, Dimensions } from 'react-native';


export default class RedSocial extends Component<{item:any},any>{


    constructor(props:any){
        super(props);
        this.state= {
            redes:[],
            tiktok:false
        }
    }

    componentDidMount(){
        const item = this.props.item;
        this.setState({
            redes: item
        })
    }
    

    _RedesSocialesTiktok(item:any){
        const redsocial = item.redes_sociales.map((n:any) => n.red_social)

        return(  item.redes_sociales.map((n:any) => {
            if(n.red_social === "tiktok"){

                return(
                    <TouchableOpacity>
                        <Image 
                            source={require('../sources/img/tiktok.png')}
                            style={{width:50,height:50,borderRadius:50}} 
                        />
                    </TouchableOpacity>
                )

            }else{
                console.log("hola")
            }
        })
    )
    }
    _RedesSocialesTiktokFalse(){
        const falso = this.state.tiktok
        console.log(falso)
    }




    render(){ 
        const items = this.state.redes
        
        console.log(items.map((n:any) => n.redes_sociales))
        return(
            <View style={{backgroundColor:"white",marginVertical:7,width:'100%',paddingVertical:15,paddingHorizontal:20,justifyContent:'space-between',flexDirection:'row'}}>


            </View>
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