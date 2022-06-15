import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default class Titulosector extends Component{
    constructor(props:any){
        super(props);
        this.state = {
            dataBanner:[]
        }
    }
    
    componentDidMount(){
        const url = 'https://01.metodolibio.com/api/galeria-de-imagenes-de-sector/95df9f72-2ab4-4d3c-a5ef-7105dec742e0';
        return fetch(url)
        .then((response) => response.json())
        .then((responseJson)=> {
            let newArray:any = [];
            responseJson.data.map((n:any) => (
                
                newArray.push(n.url_imagen)

            ))

            
            this.setState({
                isLoading:false,
                dataBanner: newArray
            })
        })
        .catch((error:any)=> {
            console.log(error)
        })
    }


    render(){
        return(
            <Text>
                Hola mundo
            </Text>
        )
    }
}