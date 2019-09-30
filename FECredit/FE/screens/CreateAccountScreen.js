import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    DatePickerAndroid,
    Image,
    ActivityIndicator,
    TextInput,
    Alert,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';
import firebaseApp from '../FirebaseIndex';
import '@firebase/firestore';
class CreateAccountScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            pass1: '',
            pass2: '',
        }
    }
    componentDidMount = async () => {

    }
    onPressOK = () => {
        if (this.state.pass1 === this.state.pass2) {
            firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass1)
                .then(() => {
                    alert("Dang nhap thanh cong")
                    this.props.navigation.navigate('Home');
                })
                .catch((error) => {
                    // Handle Errors here.
                    //Alert.alert('Khong dang nhap dc')
                    // ...
                    console.log(error)
                });
        } else {
            Alert.alert("Mat khau khong trung khop")
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView  style = {{flex:1, backgroundColor: 'white'}} ref = 'scroll'>
                    <KeyboardAvoidingView behavior='position' style={{ backgroundColor: 'white', flex: 1 }}>
                        <View style={{ flex: 0.6, justifyContent: 'center', marginTop: '20%' }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={{ uri: 'https://logodownload.org/wp-content/uploads/2014/09/facebook-logo-1-1.png' }}
                                    style={{ width: '60%', height: 50, resizeMode: 'stretch' }} />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={{ uri: 'https://cdn.itviec.com/employers/coderschool/logo/social/8p67H9qvrjNV5FNxB5ZEuPoM/Logo-full@2x-1024x800.png' }}
                                    style={{ width: '15%', height: 50, resizeMode: 'stretch' }} />

                                <Image source={{ uri: 'https://vaytien15phut.com/wp-content/uploads/2019/07/fe-1.png' }}
                                    style={{ width: '30%', height: 100, resizeMode: 'stretch' }} />
                            </View>
                        </View>
                        <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>Tên đăng nhập: </Text>
                            <TextInput
                                style={styles.textInputStyle}
                                onChangeText={(email) => this.setState({ email })}
                                value={this.state.email}
                                placeholder={'abcd@gmail.com'}
                            />

                            <Text>Mật Khẩu</Text>
                            <TextInput
                                style={styles.textInputStyle}
                                onChangeText={(pass1) => this.setState({ pass1 })}
                                value={this.state.pass1}
                                placeholder={'1234567890'}
                            />
                            <Text>Xác nhận mật khẩu</Text>
                            <TextInput
                                style={styles.textInputStyle}
                                onChangeText={(pass2) => this.setState({ pass2 })}
                                value={this.state.pass2}
                                placeholder={'1234567890'}
                            />
                            <View style={{ flexDirection: 'row', marginTop: 30 }}>
                                <TouchableOpacity style={styles.buttonStyle} onPress={() => { this.onPressOK() }}>
                                    <Text>OK</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flex: 0.2 }}>

                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInputStyle: { width: '50%', height: 30, borderColor: 'black', borderWidth: 1 },
    buttonStyle: {
        width: "50%",
        height: 40,
        backgroundColor: "#EECFA1",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    }
});

export default connect(state => {
    return {
    }
})(CreateAccountScreen);
