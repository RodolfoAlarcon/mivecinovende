import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';

export default class Listnegocios extends Component{

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
            <TouchableOpacity>
                <View style={{alignItems:'flex-end'}}>
                    <View style={{flexDirection:'row',height:70,backgroundColor:'#e4e5e4',marginBottom:5,width:'95%',}}>
                        <View style={{width:'3%',backgroundColor:'#f979ae'}}>

                        </View>
                        <View style={{width:'70%',flexDirection:'row'}}>
                            <Image 
                                source={require('../sources/img/restaurante.png')}
                                style={{width:50,height:50,marginVertical:12,marginHorizontal:10,borderRadius: 50}} 
                            />
                            <Text style={{color:'#000',fontWeight:'bold',fontSize:16,marginVertical:26}}>
                                Comidas "Victor"
                            </Text>
                        </View>
                        <View style={{width:'27%',flexDirection:'row'}}>
                            <Image 
                                source={require('../sources/img/delivery.png')}
                                style={{width:30,height:30,resizeMode:'contain',marginVertical:23,marginHorizontal:7}} 
                            />
                            <Image 
                                source={require('../sources/img/llamar.png')}
                                style={{width:30,height:30,resizeMode:'contain',marginVertical:23,marginHorizontal:7}} 
                            />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}
