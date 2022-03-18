import React from "react";
import { Text, View } from "react-native";
import { Datum } from '../interfaces/categoriaInterface';

interface Props{
    data: Datum;
}

export const Categoriascom = ({data}: Props) => {

    console.log(data)

    return(
        <View>
            <Text>
                {data.name}
            </Text>
        </View>
    )

}