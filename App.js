import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, CameraRoll, PermissionsAndroid } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Pop from './src/modules/cam/pop'

export default class App extends PureComponent {
  constructor(props){
    super(props)
    this.state={cam:false,pop:false,whitebalance:RNCamera.Constants.WhiteBalance.auto
      
    }
  }

  
  

  render() {

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
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.setState({cam:!this.state.cam})} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> {this.state.cam?"back":"fornt"} </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.setState({pop:!this.state.pop})} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
          
        </View>
       {this.state.pop&&<Pop setWhite={(data)=>this.setState({whitebalance:data,pop:!this.state.pop})} ></Pop>}
      </View>
    );
  }


  takePicture = async () => {
   console.log("object",this.camera.getSupportedRatiosAsync() )
   
   console.log("object",getCameraIds() )

if(this.camera){
    const options = { quality: 1, base64: true };
    const data = await this.camera.takePictureAsync(options);
    //  eslint-disable-next-line
    try {
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
        CameraRoll.saveToCameraRoll(data.uri, "photo").then(res=>{console.log("sucsesss")});
      } else {
        // console.log("Camera permission denied")
      }
    } catch (err) {
      console.warn(err)
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
