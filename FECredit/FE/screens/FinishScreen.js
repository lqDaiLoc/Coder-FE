import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { TouchableOpacity, StyleSheet, Text, View, Image, ActivityIndicator, Alert, ImageBackground } from 'react-native';
import firebaseApp from '../FirebaseIndex';
//import * as firebase from 'firebase'
import '@firebase/firestore';
class FinishScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            arrInfoImage: [],
            check: true,
        }
    }
    componentDidMount = async () => {
        // alert(this.props.NameImageFirebase)
        // this.props.navigation.navigate('CreateAccount');
        setTimeout(async () => {
            const ref = firebaseApp.database().ref('InfoImage');
            await ref.once('value', snapshot => {
                const val = snapshot.val();
                this.setState({ arrInfoImage: val });
            })
                .catch((error) => {
                    console.log(error)
                });
            if (this.state.arrInfoImage[this.state.arrInfoImage.length - 1].Status == 'Check') {
                if (this.state.arrInfoImage[this.state.arrInfoImage.length - 1].allow === 'true') {
                    this.props.navigation.navigate('DongY');
                } else {
                    this.props.navigation.navigate('ThatBai');
                }
            }
        }, 90000);
        //await alert(this.state.arrInfoImage[this.state.arrInfoImage.length - 1].Status);
        
    }
    async Tuchay() {
        const ref = firebaseApp.database().ref('InfoImage');
        await ref.on('value', snapshot => {
            const val = snapshot.val();
            this.setState({ arrInfoImage: val });
        })
            .catch((error) => {
                console.log(error)
            });
    }
    render() {
        return (
            <ImageBackground source={require('../assets/images/wait1.jpg')} style={{ flex: 1, width: '100%', height: '100%', flexDirection: 'row' }}>
                <View style={{flex: 0.4}}></View>
                <View style={{flex: 0.6,marginTop: 50, alignItems: "center"}}>
                    <Text style={{ fontSize: 30, color: '#CD950C' }}>WAIT</Text>
                    <Text>Xin đợi trong giây lát</Text>
                    <Text>Hồ sơ của bạn đang được sử lý</Text>
                    <ActivityIndicator size = 'large' style={{ marginTop: 20 }}/>
                </View>
            </ImageBackground>
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
        PhotoSelfie: state.PhotoSelfie,
        PhotoCMND: state.PhotoCMND,
        NameImageFirebase: state.NameImageFirebase,
    }
})(FinishScreen);