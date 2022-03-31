import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';

export default class Categoria extends Component<{},any>{

    constructor(props:any){
        super(props);
        this.state = {
            dataBanner:[]
        }
    }
    
    componentDidMount(){
        const url = 'https://04.contenedoresnolvis.com/api/categorias';
        return fetch(url)
        .then((response) => response.json())
        .then((responseJson)=> {       
            this.setState({
                isLoading:false,
                dataBanner: responseJson.data
            })
        })
        .catch((error:any)=> {
            console.log(error)
        })
    }


    render(){
        return(
            <View>
                <FlatList
                    numColumns={2}
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
            <TouchableOpacity 
                style={[styles.botoncaja, styles.alimentos]} 
            >
            <View style={styles.contenidoboton}>
                <Image 
                source={{uri:item.url_imagen}}
                    style={{width:60,height:50,resizeMode:'contain'}} 
                />
            </View>
            <View style={styles.contenidobotontext}>
              <Text style={styles.textboton}>
                  {item.name}
                </Text>
            </View>
        </TouchableOpacity>
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
    container: {
      flex: 1,
      flexDirection: 'row'
    },
    buscador:{
        height:60,
        backgroundColor:'#dfa71b',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    botoncaja:{
        width:'48%',
        height:100,
        marginVertical:7,
        marginHorizontal:4,
        flexDirection:'row',
        padding:10
    },
    contenidoboton:{
        width:'35%',
        justifyContent:'center',
        alignItems: 'center'
    },
    contenidobotontext:{
        width:'65%',
        justifyContent:'center',
        alignItems:'center'
    },
    textboton:{
        fontSize:17,
        fontWeight:'bold',
        color:'#000',
        textAlign:'center',
    },
    alimentos:{
        backgroundColor:'#fed1e5'
    },
    oficios:{
        backgroundColor:'#f8ebd1'
    },
    locales:{
        backgroundColor:'#dbe9d9'
    },
    propiedades:{
        backgroundColor:'#fdebdc'
    },
    servicios:{
        backgroundColor:'#dcf0d7'
    },
    cursos:{
        backgroundColor:'#e1e6f1'
    },
    venta:{
        backgroundColor:'#baf2e6'
    },
    transporte:{
        backgroundColor:'#ededc9'
    }
  });