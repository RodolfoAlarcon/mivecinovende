/*

/---- cerrar secion nicio ----/
 vista 
             <View style={{ alignItems: 'center' }}>

                <TouchableOpacity
                    onPress={() => { cerrarSesion() }}
                    style={styles.button}
                >
                    <Text style={styles.textboton}>
                        Cerrar Session
                </Text>
                </TouchableOpacity>
            </View>


la funcion
function cerrarSesion() {
    Alert.alert("Salir", "Seguro de \n Salir de La Sesion?",
        [
            {
                text: "Si", onPress: () => {
                    logOut()
                    //,goToScreen('LoginScreen')
                }
            },
            {
                text: "No", onPress: () => { }, style: 'cancel'
            }
        ]
    )
}


*/