// src/camera.page.js file
import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';   
import firebaseApp from '../FirebaseIndex'; 
import Toolbar  from './toolbar.component';
import Gallery from './gallery.component';
import { Provider, connect } from 'react-redux';

//import styles from './styles';
const { width: winWidth, height: winHeight } = Dimensions.get('window');
const { FlashMode: CameraFlashModes, Type: CameraTypes } = Camera.Constants;
class CameraTuSuong extends React.Component {
    camera = null;
    state = {
        ratio: '16:9',
        captures: [],
        capturing: null,
        hasCameraPermission: null,
        cameraType: Camera.Constants.Type.back,
        flashMode: Camera.Constants.FlashMode.off,
        PhotoSelfie : null,
        arrInfoImage: [],
        nameImage: '',
    };
    setFlashMode = async (flashMode) => {
        if(this.state.PhotoSelfie != null){
            await this.props.dispatch({ type: 'setSelfie', value: this.state.PhotoSelfie.uri })
            
            this.setState({ flashMode });
            //getArrInfoImage
            await this.getArrInfoImage();
            //upInfoImageToFirebase
            await this.upInfoImageToFirebase();
            //await alert(this.state.nameImage);
            this.props.navigation.navigate('CameraCMND');
        }
        else{
            alert("Hãy chụp một bức ảnh.")
        }
        
    }
    getArrInfoImage = async () => {
        const ref = firebaseApp.database().ref('InfoImage');
        await ref.once('value', snapshot => {
            const val = snapshot.val();
            this.setState({ arrInfoImage: val });
            //alert(this.state.arrInfoImage.length);
        });
    }
    setLenght = async () => {
        
    }
    upImageToStorage = async (uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        var ref = firebaseApp.storage().ref().child("ImageSelfie/" + imageName);
        return ref.put(blob);
    }
    upInfoImageToFirebase = async () => {
        let name = await new Date().getTime() + "-media.jpg"
        this.setState({nameImage: name});
        await this.props.dispatch({ type: 'setNameImageFirebase', value: this.state.nameImage })
        this.upImageToStorage(this.state.PhotoSelfie.uri, name)
        .catch((error) => {
        alert("Khong up dc anh");
        })
        
        count = this.state.arrInfoImage.length;
        firebaseApp.database().ref('InfoImage/' + count).set({
            LocaltionX: 123,
            LocaltionY: 123,
            Status: "NoCheck",
            NameUri: name,
            allow: "False"     
        })
        .catch((error) => {
            alert("khong up dc real time")
        })
        
    }
    setCameraType = (cameraType) => {
        this.setState({ cameraType });
    }
    handleCaptureIn = () => this.setState({ capturing: true });

    // handleCaptureOut = () => {
    //     if (this.state.capturing)
    //         this.camera.stopRecording();
    // };

    handleShortCapture = async () => {
        const photoData = await this.camera.takePictureAsync();
        this.setState({ 
            capturing: false, 
            captures: [photoData, ...this.state.captures] ,
            PhotoSelfie : photoData,
        })
    };

    async componentDidMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const hasCameraPermission = (camera.status === 'granted');
        this.setState({ hasCameraPermission });
    };

    render() {
        const { hasCameraPermission, flashMode, cameraType, capturing, captures } = this.state;

        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>Access to camera has been denied.</Text>;
        }

        return (
            <React.Fragment>
                <View>
                    <Camera
                        type = {this.state.cameraType}
                        style={styles.preview}
                        ref={camera => this.camera = camera}
                        ratio = {this.state.ratio}
                    />
                </View>               
                    {captures.length > 0 && <Gallery captures={captures}/>}
                    <Toolbar 
                    capturing={capturing}
                    flashMode={flashMode}
                    cameraType={cameraType}
                    setFlashMode={this.setFlashMode}
                    setCameraType={this.setCameraType}
                    onCaptureIn={this.handleCaptureIn}
                    onCaptureOut={this.handleCaptureOut}
                    onShortCapture={this.handleShortCapture}/>
            </React.Fragment>
        );
    };
};

CameraTuSuong.navigationOptions = {
    header: null,
  };

const styles = StyleSheet.create({
    preview: {
        height: winHeight,
        width: winWidth,
        position: 'relative',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
  });
 export default connect(state => {
    return {
        PhotoSelfie: state.PhotoSelfie,
        NameImageFirebase: state.NameImageFirebase,
    }
})(CameraTuSuong);
