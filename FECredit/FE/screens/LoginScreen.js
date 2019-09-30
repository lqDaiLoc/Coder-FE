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
import * as Facebook from 'expo-facebook';
import { AuthSession } from 'expo';
class LoginScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            pass: '',
        }
    }
    componentDidMount = async () => {

    }
    onPressLogin = () => {
        firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.pass)
            .then(() => {
                Alert.alert("Dang nhap thanh cong");
                this.props.navigation.navigate('Home');
            })
            .catch((error) => {
                Alert.alert('Khong dang nhap duoc')
            })
    }
    onPressCreate = () => {
        this.props.navigation.navigate('CreateAccount');
    }
    onPressLoginFB = async () => {
        try {
            const {
                type,
                token,
            } = await Facebook.logInWithReadPermissionsAsync('1413482948820902', {
                permissions: ['public_profile'],
            });
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                //console.log('Logged in!', `Hi ${(await response.json()).name}!`);
                await console.log(response.json());
                await this.props.navigation.navigate('Home');
            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{ flex: 1, backgroundColor: 'white' }} ref='scroll'>
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
                                onChangeText={(pass) => this.setState({ pass })}
                                value={this.state.pass}
                                placeholder={'1234567890'}
                            />
                            <View style={{ flexDirection: 'column', marginTop: 30, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={styles.buttonsStyle}>
                                    <TouchableOpacity style={styles.buttonStyle} onPress={() => { this.onPressLogin() }}>
                                        <Text>Đăng nhập</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.buttonsStyle}>
                                    <TouchableOpacity style={styles.buttonStyle} onPress={() => { this.onPressCreate() }}>
                                        <Text>Đăng ký</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.buttonsStyle}>
                                    <TouchableOpacity style={styles.buttonStyle} onPress={() => { this.onPressLoginFB() }}>
                                        <Text>Login Facebook</Text>
                                    </TouchableOpacity>
                                </View>
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
        margin: 5,
        width: '50%',
        height: 40,
        backgroundColor: '#EECFA1',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    buttonsStyle: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default connect(state => {
    return {
    }
})(LoginScreen);