import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { TouchableOpacity, StyleSheet, Text, View, DatePickerAndroid, Image, ActivityIndicator, ImageBackground  } from 'react-native';
import firebaseApp from '../FirebaseIndex';
//import * as firebase from 'firebase'
import '@firebase/firestore';
class DongYScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            arrInfoImage: [],
            check: true,
        }
    }
    componentDidMount = async () => {
        
    }
    render() {
        return (
            <ImageBackground source={require('../assets/images/Success1.jpg')} style={{ width: '100%', height: '100%' }}>
                <View style={{justifyContent: 'center', alignItems: "center"}}>
                    <Text style={{fontSize: 30, color: '#CD950C'}}>Thành Công</Text>
                    <Text>Chúc mừng bạn</Text>
                    <Text>Khoản vay của bạn đã được duyệt</Text>
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
    }
})(DongYScreen);