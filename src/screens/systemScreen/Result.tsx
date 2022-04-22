import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Image,TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import CardBusquedad from '../../components/CardBusquedad'
import { isDeepStrictEqual } from 'util';

export const Result = (props: any) => {

    const navigator = useNavigation() 
    const { params } = props.route;
    const paramsid = params.id


  return (
        <ScrollView>
            <CardBusquedad
                id={paramsid}
            />
        </ScrollView>
  )
    function goToScreen(routeName: any, id : any) {
        navigator.navigate(routeName as never, {id:id} as never);
    }

}