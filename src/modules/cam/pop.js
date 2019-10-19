import React from 'react'
import { View, Text,TouchableOpacity} from 'react-native'
import { RNCamera } from 'react-native-camera';

const Pop = (props) => {
    return (<View style={{position:"absolute",flexDirection:"column",width:"100%",height:"100%",alignContent:"center",justifyContent:"center"}} >
        <View  style={{backgroundColor:"rgb(0,0,0,1)",height:"40%",width:"60%",alignSelf:"center",justifyContent:"space-between",alignItems:"center"}} >
            <TouchableOpacity   onPress={()=>{props.setWhite(RNCamera.Constants.WhiteBalance.sunny)}}>
                <Text  style={{fontSize:20,}} >sunny</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{props.setWhite(RNCamera.Constants.WhiteBalance.cloudy)}}>
                <Text style={{fontSize:20,}} >cloudy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{props.setWhite(RNCamera.Constants.WhiteBalance.shadow)}}>
                <Text style={{fontSize:20,}} >shadow</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>{props.setWhite(RNCamera.Constants.WhiteBalance.incandescent)}}>
                <Text style={{fontSize:20,}} >incandescent</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>{props.setWhite(RNCamera.Constants.WhiteBalance.fluorescent)}}>
                <Text style={{fontSize:20,}} >fluorescent</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>{props.setWhite(RNCamera.Constants.WhiteBalance.auto)}}>
                <Text style={{fontSize:20,}} >Auto</Text>
            </TouchableOpacity>

        </View></View>
    )
}

export default Pop
