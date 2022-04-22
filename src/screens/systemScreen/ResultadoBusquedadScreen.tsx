import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Linking, ScrollView, SafeAreaView, VirtualizedList,ActivityIndicator, Dimensions } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ListItem } from 'react-native-elements';
import axios from 'axios'
import CardBusquedad from '../../components/CardBusquedad';

const navigator = useNavigation()

export const ResultadoBusquedadScreen = () => {


    return(
        <View style={{flex:1}}>
        </View>
    )
}
