import AsyncStorage from '@react-native-community/async-storage'

const CART_KEY = '@cart:key'


async function saveCart(cart:any){
    try {
        await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart))
        return JSON.stringify(cart)
    } catch (error) {
        //Error
        console.log('error al guardar: ' + error.message)
        return 'Error de sintaxis'
    }
}

async function getCart(){
    try {
        const item:any = await AsyncStorage.getItem(CART_KEY)
        return JSON.parse(item)
    } catch (error) {
        // Error retrieving data
        console.log("Error al recuperar:" + error.message)
        return null
    }
}

async function deleteCart(){
    try {
        await AsyncStorage.removeItem(CART_KEY)
        const item:any = await AsyncStorage.getItem(CART_KEY)
        return (item == null?"usuario removido":"usuario no removido")
    } catch (error) {
        console.log("Error al eliminar" + error.message)
        return "Error de sintaxis"
    }
}

export {saveCart, getCart, deleteCart}