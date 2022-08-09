import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList,ActivityIndicator,Dimensions } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';


export default class TituloCategoria extends Component<{id:any},any>{

    constructor(props:any){
        super(props);
        this.state = {
            isLoading:true,
            dataBanner:[]
        }
    }
    
    componentDidMount(){
        const id = this.props.id;
        const url = `https://14.sdcecuador.com/api/categorias/${id}`;
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
            <View 
                style={styles.banner}
            >
                <Text 
                    style={styles.Titulo}
                >
                    {
                        this.state.dataBanner
                    }
                </Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    Titulo:{
        color:'#ffffff',
        fontSize:17, 
        fontWeight:'bold',
        textAlign:'center',
        marginVertical:13,
    },
    banner:{
        height:50,
        backgroundColor: '#007ba4',
    },
  });