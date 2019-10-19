import React, { PureComponent } from 'react'
import { Text, View ,Image,TouchableOpacity} from 'react-native'

export class ViewPlate extends PureComponent {
    constructor(props){
        super(props)
        this.state={
          
        }
      }


    render() {
        return (
            <TouchableOpacity onPress={()=>{this.props.goback();console.log("the data",this.props)}} style={{width:"100%",height:"100%",position:"absolute",}}>
{/* <TouchableOpacity ><Text style={{fontSize:60,margin:60}}>{`<`}</Text></TouchableOpacity> */}
<Image source={{
    uri:this.props.imageCode?this.props.imageCode:null
}}  style={{flex:1,resizeMode:"contain"}} ></Image>
            </TouchableOpacity>
        )
    }
}

export default ViewPlate
