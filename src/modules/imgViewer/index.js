import React, { Component } from 'react'
import { Text, View ,Dimensions,Animated,Image,PanResponder,TouchableOpacity,CameraRoll,PermissionsAndroid} from 'react-native'
import { throwStatement } from '@babel/types'
 const SCREEN_HEIGHT=Dimensions.get('window').height
 const SCREEN_WIDTH=Dimensions.get('window').width
 const User=[
   {id:"1",},
   {id:"2",},
   {id:"3",},
   {id:"4",},
   {id:"5",},
 
  ]

export class ImgView extends Component {
  constructor(props) {
    super(props)
    this.position=new Animated.ValueXY()
  //  this.onPressLeft = this.onPressLeft.bind(this)
    this.state = {
       currentIndex:0
    }
    this.rotate= this.position.x.interpolate({
      inputRange:[(-SCREEN_WIDTH/2),0,SCREEN_WIDTH/2],
      outputRange: ['-10deg','0deg','10deg'],
      excdtrapolate:'clamp'
    })
    this.rotateAndTranslate={
      transform:[{
        rotate:this.rotate
      },
    ...this.position.getTranslateTransform()]
    }
    this.nextCardOpacity=this.position.x.interpolate({
     inputRange: [(-SCREEN_WIDTH/2),0,SCREEN_WIDTH/2],
     outputRange:[1,0,1],extrapolate:"clamp"
    })
    this.nextCardScale=this.position.x.interpolate({
      inputRange: [(-SCREEN_WIDTH/2),0,SCREEN_WIDTH/2],
      outputRange:[1,0.8,1],extrapolate:"clamp"
     })
  }
  componentWillMount(){
    this.PanResponder=PanResponder.create(
      {
        onStartShouldSetPanResponder:(evt,gestureState)=>true,
        onPanResponderMove:(evt,gestureState)=>{ 
        // console.log('gestureState.dy::', gestureState.dy,",>><<<>gestureState.dx::::::",gestureState.dx)
        
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
      },
      onPanResponderRelease: (evt, gestureState) => {

        if (gestureState.dx > 120) {
         
          
         this.rightSwipe(this.props.navigation.state.params.imgData)
        }
        else if (gestureState.dx < -120) {
          this.props.navigation.pop()
        }
        else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4
          }).start()
        }
      }
    })
  }
  rightHandler(){

  }
  renderview=()=>{
    
return User.map((item,i)=>{
  if(i<this.state.currentIndex){
    return null

  }else if(i==this.state.currentIndex){
    return(<Animated.View 
      {...this.PanResponder.panHandlers} key={item.id} style={[this.rotateAndTranslate,{width:SCREEN_WIDTH,height:SCREEN_HEIGHT-120,padding:  20,position:"absolute"}]}>
     <View style={{flex:1,padding:20,paddingBottom:80,backgroundColor:"#FFFFFF",marginBottom:140}}><Image style={{flex:1,resizeMode:"cover",height:null,width:null,}} source={{uri:this.props.navigation.state.params.imgData.uri}}></Image></View>
      </Animated.View>)
  }
  else{
  
  return(<Animated.View 
 key={item.id} style={[{opacity:this.nextCardOpacity,transform:[{scale:this.nextCardScale}]},
   {width:SCREEN_WIDTH,height:SCREEN_HEIGHT-120,padding:  20,position:"absolute"}]}>
 <View style={{flex:1,padding:20,paddingBottom:80,backgroundColor:"#FFFFFF",marginBottom:140}}><Image style={{flex:1,resizeMode:"cover",height:null,width:null}} source={item.uri}></Image></View>
</Animated.View>)}

}).reverse()
  }
  
  render() {
    console.log("object",this.props
    )
    return (
      <View style={{flex:1}}>
       <View style={{height:60,backgroundColor:
      "skyblue"}}>
       
       </View><View style={{flex:1,backgroundColor:"#666666"}}>
      { this.renderview()}
       
       
       
       
       
       </View>
       
       <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
         <TouchableOpacity style={{height:40,width:800}} onPress={()=>{
           Animated.spring(this.position,{
            toValue:{x:-SCREEN_WIDTH-100,y:0},
            }).start(()=>{this.setState({currentIndex:this.state.currentIndex+1},()=>{this.position.setValue({y:0,x:0})})})
           
         }} 
         style={{backgroundColor:"red",width: 200,height: 40,borderRadius:8,alignItems:"center",justifyContent:"center"}}
         ><Text>Left</Text></TouchableOpacity>
       </View>
       <View style={{height:60,backgroundColor:
      "skyblue"}}>
       
       </View>
      </View>
    )
  }

  async rightSwipe(data){ try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        'title': 'Cool Photo App Camera Permission',
        'message': 'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.'
      }
    )
    if (granted) {
      // console.log("You can use the camera",data)
      CameraRoll.saveToCameraRoll(data.uri, "photo").then(res=>{
   
       this.props.navigation.pop()
      }).catch(err=>{console.log('err', err)})
    } else {
  console.log("Camera permission denied")
  this.props.navigation.pop()
    }
  } catch (err) {
    console.warn(err)
  }}

}

export default ImgView
