import {StyleSheet} from 'react-native'
import {color} from './colors'

const splashStyles = StyleSheet.create({
        image: {
            flex:1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: color.WHITE

        }
    }
   
)
//Estilos para LoginScreen
const loginStyles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 80 
    },

    logo: {
        paddingTop: 40,
        alignItems: 'center',
    },

    btnMain: {
        width: 250,
        backgroundColor: color.SECONDARYCOLOR,
        marginTop:18,
        marginBottom:20,
        padding:5,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
    },

    btnTransparent: {
        backgroundColor: 'rgba(52, 52, 52, 0)',
        borderColor: color.RED,
        width: 280,
        borderWidth: 2,
        marginBottom: 20,
        borderRadius: 5
    },

    btntxt: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight:"bold",
        color: color.PRIMARYCOLOR,
        paddingVertical: 15,
        fontFamily: 'Poppins-Bold',
    },

    txtTransparent: {
        color: color.LIGHTPRIMARYCOLOR,
        fontSize: 14,
        fontFamily: 'Poppins-Light',
    }
})

//Estilos para MainScreen
const mainStyles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: color.WHITE
    },

    containerCenter: {
        paddingTop: 10,
        alignItems: 'center',
        marginBottom: 25,
    },

    titleText: {
        fontSize: 18,
        marginTop: 20,
        color: color.PRIMARYCOLOR,
        fontFamily: "Poppins-SemiBold"
    },

    btnMain: {
        width: 250,
        backgroundColor: color.SECONDARYCOLOR,
        marginTop:18,
        padding:5,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
 
    },

    btnTransparent: {
        backgroundColor: 'rgba(52, 52, 52, 0)',
        borderColor: color.RED,
        width: 280,
        borderWidth: 2,
        marginBottom: 20,

    },

    btntxt: {
        textAlign: 'center',
        fontSize: 18,
        color: color.PRIMARYCOLOR,
        paddingVertical: 15,
        fontFamily: 'Poppins-Bold',
        fontWeight:"bold"
    },

    txtTransparent: {
        color: color.LIGHTPRIMARYCOLOR,
        fontSize: 14,
        fontFamily: 'Poppins-Light',
    }
    
})


//Estilos para RegistroScreen
const registroStyles = StyleSheet.create({

    checkBox: {
        marginLeft: 0,
        marginRight: 0,
        borderWidth: 0,
        backgroundColor: color.WHITE,
    },

    containerSocial: {
        paddingTop: 30,
        alignItems: 'center',
        marginBottom: 10,
    },

    buttonSocialIcon: {
        marginBottom: 10,
        width: 250,
        height: 60,
        alignItems: 'center',
    },
})

const Registro = StyleSheet.create({

    container:{
        justifyContent:"space-between",
        height:"100%",
        paddingTop:30,
        paddingBottom:50    
    },

})

const HomeButton = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
       
    },

    btnMain: {
        width: 250,
        backgroundColor: color.PRIMARYCOLOR,
        marginTop:20,
        padding:5,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,


    },

    btnTransparent: {
        backgroundColor: 'rgba(52, 52, 52, 0)',
        borderColor: color.BLUE,
        width: 280,
        borderWidth: 2,
        borderRadius: 60
    },

    btntxt: {
        textAlign: 'center',
        fontSize: 18,
        color: color.WHITE,
        paddingVertical: 15,
        fontFamily: 'Poppins-Bold',
        fontWeight:"bold",

    },

    txtTransparent: {
        color: color.LIGHTPRIMARYCOLOR,
        fontSize: 14,
        fontFamily: 'Poppins-Light',
    }
})


export { loginStyles, splashStyles, registroStyles, mainStyles, HomeButton, Registro }