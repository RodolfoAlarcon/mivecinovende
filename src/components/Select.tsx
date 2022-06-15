import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { useCiudades } from '../hook/useCiudades';
import { Datum } from '../interfaces/CiudadesInterface';



function Select(props:any){



  const { CiudadesActuales } = useCiudades();
  console.log(CiudadesActuales)  



   return (

    <SearchableDropdown
    onTextChange={(items: any) => console.log({items})}
    // Listner on the searchable input
    onItemSelect={(items: any) => { (items) }}
      // Called after the selection
      containerStyle={{ padding: 5 }}
      // Suggestion container style
      textInputStyle={{
        // Inserted text style
        paddingHorizontal: 20,
        paddingVertical:10,
        borderWidth: 5,
        borderColor: '#007ba4',
        backgroundColor: '#fff',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
      }}
      itemStyle={{
        // Single dropdown item style
        padding: 10,
        marginTop: 2,
      }}
      itemTextStyle={{
        // Text style of a single dropdown item
        color: '#222',
      }}
      itemsContainerStyle={{
        // Items container style you can pass maxHeight
        // To restrict the items dropdown hieght
        maxHeight: 200,
        backgroundColor: '#fff',
        position:'absolute',
        zIndex:9,
        top:65,
        width:'100%',
        left:7,
        borderColor: '#007ba4',
        borderWidth:1,
      }}
      nestedScrollEnabled={true}
      items={CiudadesActuales}
      // Mapping of item array
      defaultIndex={2}
      // Default selected item index
      placeholder="Ciudad"
      // place holder for the search input
      resPtValue={false}
      // Reset textInput Value with true and false state
      underlineColorAndroid="transparent"
      // To remove the underline from the android input
      istProps={{ 
        nestedScrollEnabled: true,
       }}
       listProps={
        {
          nestedScrollEnabled: true,
        }
      }
    />

  );
};
export default Select
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  titleText: {
    padding: 8,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  headingText: {
    padding: 8,
  },
});
