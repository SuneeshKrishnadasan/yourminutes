import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, CameraRoll,Alert, PermissionsAndroid } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Pop from '../cam/pop'
import Viewplate from '../../../viewPlate'
export default class App extends PureComponent {
  constructor(props){
    super(props)
    this.state={Imagedata:null,buttonDiasable:false,cam:false,pop:false,whitebalance:RNCamera.Constants.WhiteBalance.auto,istaken:false,
      
    }
  }

  
  

  render() {
console.log(this.state
  
)
    return (
      <View style={[styles.container,]}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          whiteBalance={this.state.whitebalance}
         
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          ratio="16:9"
          style={styles.preview}
         type={this.state.cam?RNCamera.Constants.Type.front:RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          
          <TouchableOpacity onPress={()=>this.setState({cam:!this.state.cam})} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> {this.state.cam?"back":"fornt"} </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.setState({pop:!this.state.pop})} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
         {!this.state.buttonDiasable&& <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> YourMoment </Text>
          </TouchableOpacity>}

          <TouchableOpacity onPress={()=>{let numberOfCameras = RNCamera.getNumberOfCameras();
          console.log('object',numberOfCameras)}} style={styles.capture}>
            <Text style={{ fontSize: 14 }}>camera list </Text>
          </TouchableOpacity>
         
        </View>
       {this.state.pop&&<Pop setWhite={(data)=>this.setState({whitebalance:data,pop:!this.state.pop})} ></Pop>}
      
     {this.state.istaken&&<Viewplate goback={()=>this.setState(
       {istaken:false,buttonDiasable:false}
     )} imageCode={this.state.Imagedata&&this.state.Imagedata.uri?this.state.Imagedata.uri:null}></Viewplate>}
      </View>
    );
  }


  takePicture = async () => {
 this.setState({buttonDiasable:true})

 if(this.camera){
    const options = { quality: 1, base64: true };
    const data = await this.camera.takePictureAsync(options);
    //  eslint-disable-next-line
    if(data){
    this.setState({Imagedata:data,})

      this.props.navigation.navigate("ImgView",{imgData:data})
      this.setState({buttonDiasable:false})
   }
 
  }}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
