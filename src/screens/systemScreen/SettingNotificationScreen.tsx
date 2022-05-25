import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, Switch, StyleSheet, Text } from 'react-native'
import { DataTable } from 'react-native-paper';
import ToggleSwitch from 'toggle-switch-react-native'
import ToolBar from '../../components/Toolbar'


function SettingNotificacion(props:any) {
    const navigator = useNavigation()
    const [isEnabled, setIsEnabled] = useState(false);
    const [isEnabled2, setIsEnabled2] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);

    return (
        <View>
            <ToolBar titulo='Configuracion De Notificaciones'
                onPressLeft={() => navigator.goBack()}
                iconLeft={require('../../sources/img/back.png')} />
            <DataTable>

                <DataTable.Row style={{ height: 70, padding: 10 }}>
                    <DataTable.Cell style={{ flex: 4 }}>
                        <Text style={{ fontSize: 15 }}>Mostrar Numero</Text>
                        <Text style={{ fontSize: 15 }}>Telefonico En notificaciones</Text>
                    </DataTable.Cell>

                    <DataTable.Cell style={{ flex: 1 }}>
                    <ToggleSwitch
                            isOn={isEnabled}
                            onColor="#377bff"
                            offColor="grey"
                            size="medium"
                            onToggle={toggleSwitch}
                        />
                    </DataTable.Cell>

                </DataTable.Row>

                <DataTable.Row style={{ height: 70, padding: 10 }}>
                    <DataTable.Cell style={{ flex: 4 }}>
                        <Text style={{ fontSize: 15 }}>Mostrar Datos</Text>
                        <Text style={{ fontSize: 15 }}>Familiares En notificaciones</Text>
                    </DataTable.Cell>

                    <DataTable.Cell style={{ flex: 1 }}>
                        <ToggleSwitch
                            isOn={isEnabled2}
                            onColor="#377bff"
                            offColor="grey"
                            size="medium"
                            onToggle={toggleSwitch2}
                        />

                    </DataTable.Cell>

                </DataTable.Row>

            </DataTable>
        </View>
    )

};
const styles = StyleSheet.create({
    container: {
        marginTop: "5%",
        flexDirection: 'row',
        marginLeft: '-5%',
        alignItems: "center",
        justifyContent: "center"
    },
    touch: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 10,

    },
    buttons: {
        alignItems: "center",
        backgroundColor: "#C9C3C3",
        padding: 5,
        borderRadius: 10
    }

});


export default SettingNotificacion;
