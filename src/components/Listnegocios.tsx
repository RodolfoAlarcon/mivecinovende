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
        const url = 'https://04.contenedoresnolvis.com/api/negocios/95e7eb7a-634e-45a5-882c-671c11dce54c';
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
            <TouchableOpacity>
                <View>
                    <View style={{flexDirection:'row',height:70,backgroundColor:'#e4e5e4',marginBottom:5,width:'100%',}}>
                        <View style={{width:'3%',backgroundColor:'#f979ae'}}>

                        </View>
                        <View style={{width:'70%',flexDirection:'row'}}>
                            <Image 
                                source={{uri:item.url_logo}}
                                style={{width:50,height:50,marginVertical:12,marginHorizontal:10,borderRadius: 50}} 
                            />
                            <Text style={{color:'#000',fontWeight:'bold',fontSize:16,marginVertical:26}}>
                                {item.name + console.log(item.id)}
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
