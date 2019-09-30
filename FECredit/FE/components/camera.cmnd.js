// src/camera.page.js file
import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import Toolbar from './toolbar.component';
import Gallery from './gallery.component';
import { Provider, connect } from 'react-redux';


//import styles from './styles';
const { width: winWidth, height: winHeight } = Dimensions.get('window');
const { FlashMode: CameraFlashModes, Type: CameraTypes } = Camera.Constants;
class CameraCMND extends React.Component {
    camera = null;
    state = {
        
        ratio: '16:9',
        captures: [],
        capturing: null,
        hasCameraPermission: null,
        cameraType: Camera.Constants.Type.back,
        flashMode: Camera.Constants.FlashMode.off,
        PhotoCMND : null,
        arrInfoImage: [],
        nameImage: '',
    };
    setFlashMode = async (flashMode) => {
        if(this.state.PhotoCMND != null){
            await this.props.dispatch({ type: 'setSelfie', value: this.state.PhotoCMND.uri })
            this.setState({ flashMode });
            //getArrInfoImage
            await this.getArrInfoImage();
            //upInfoImageToFirebase
            await this.upInfoImageToFirebase();
            
            this.props.navigation.navigate('KiemTraHoSo');
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
            //alert(this.state.arrInfoImage[this.state.arrInfoImage.length - 1].NameUri);
            //alert(this.state.arrInfoImage.length);
        });
    }
    setLenght = async () => {
        
    }
    upImageToStorage = async (uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        var ref = firebaseApp.storage().ref().child("ImageCMND/" + imageName);
        return ref.put(blob);
    }
    upInfoImageToFirebase = async () => {
        //alert(this.state.nameImage);
        //let name = new Date().getTime() + "-media.jpg"
        name = await this.state.nameImage;
        this.upImageToStorage(this.state.PhotoCMND.uri, name)
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
    setCameraType = (cameraType) => this.setState({ cameraType });
    handleCaptureIn = () => this.setState({ capturing: true });

    // handleCaptureOut = () => {
    //     if (this.state.capturing)
    //         this.camera.stopRecording();
    // };

    handleShortCapture = async () => {
        const photoData = await this.camera.takePictureAsync();
        this.setState({ 
            capturing: false, 
            captures: [photoData, ...this.state.captures],
            PhotoCMND: photoData,
        })
    };

    async componentDidMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const hasCameraPermission = (camera.status === 'granted');
        this.setState({ hasCameraPermission });
        // const { navigation } = this.props;
        // const sendName = await navigation.getParam('sendName', 'NO-ID');
        // const tmp = (JSON.stringify(sendName));
        // await this.setState({nameImage: tmp});
        const tmp = await this.props.NameImageFirebase;
        this.setState({nameImage: tmp})
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
                        style={styles.preview}
                        ref={camera => this.camera = camera}
                        ratio = {this.state.ratio}
                    />
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                    <View style={{
                        width: "55%",
                        height: "53%",
                        borderColor: 'red',
                        borderWidth: 3,
                    }}>
                        <Text>cmnd</Text>
                    </View>
                    {captures.length > 0 && <Gallery captures={captures} />}
                    <Toolbar
                        capturing={capturing}
                        flashMode={flashMode}
                        cameraType={cameraType}
                        setFlashMode={this.setFlashMode}
                        setCameraType={this.setCameraType}
                        onCaptureIn={this.handleCaptureIn}
                        onCaptureOut={this.handleCaptureOut}
                        onShortCapture={this.handleShortCapture} />
                </View>

            </React.Fragment>
        );
    };
};
CameraCMND.navigationOptions = {
    header: null,

};

const styles = StyleSheet.create({
    preview: {
        height: winHeight,
        width: winWidth,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
});
export default connect(state => {
    return {
        PhotoCMND: state.PhotoCMND,
        NameImageFirebase: state.NameImageFirebase,
    }
})(CameraCMND);