import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { TouchableOpacity, StyleSheet, Text, View, DatePickerAndroid, Image, ActivityIndicator, ImageBackground  } from 'react-native';
import firebaseApp from '../FirebaseIndex';
//import * as firebase from 'firebase'
import '@firebase/firestore';
class ThatBaiScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            arrInfoImage: [],
            newImage: 'https://ik.imagekit.io/healthcaresuccess/wp-content/uploads/Patient-Waiting-min.jpg',
        }
    }
    componentDidMount = async () => {
        this.downloadIamge();
    }
    downloadIamge = async () => {
        nameImage = await 'Images/'+ this.props.NameImageFirebase;
        //nameImage = await 'ImageSelfie/'+ this.props.NameImageFirebase;
        firebaseApp.storage().ref().child(nameImage).getDownloadURL()
        .then((downloadURL) => {
          this.setState({
            newImage: downloadURL,
          })
        })
        .catch(() => {
            alert('deo dc')
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }} >
                    <Text style={{fontSize: 30, color : '#CD950C'}}>Sorry</Text>
                    <Text>Hồ sơ của bạn không đủ tiêu chuẩn để thực hiện giao dịch</Text>
                </View>
                <View style={{flex: 0.8, width: '100%', height: '100%'}}>
                    <Image source={{
                        uri: this.state.newImage
                        //uri : 'https://ik.imagekit.io/healthcaresuccess/wp-content/uploads/Patient-Waiting-min.jpg'
                    }}
                        style={{ width: '100%', height: '100%' }} />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default connect(state => {
    return {
        NameImageFirebase: state.NameImageFirebase,
    }
})(ThatBaiScreen);