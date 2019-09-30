import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { TouchableOpacity, StyleSheet, Text, View, DatePickerAndroid, Image, ActivityIndicator  } from 'react-native';
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
        const { arrInfoImage } = this.state;
        const ref = firebaseApp.database().ref('InfoImage');
        await ref.once('value', snapshot => {
            const val = snapshot.val();
            this.setState({ arrInfoImage: val });
            //alert(this.state.arrInfoImage[this.state.arrInfoImage.length - 1].NameUri);
            //alert(this.state.arrInfoImage.length);
        })
        .catch((error)=>{
            console.log(error)
        });
        //await alert(this.state.arrInfoImage[this.state.arrInfoImage.length - 1].Status);
        if(this.state.arrInfoImage[this.state.arrInfoImage.length - 1].Status === 'NoCheck'){
            this.setState({check: true});
        }else{
            this.setState({check: false});
        }
        
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //////                                                                                                                  /////
        //////  anh Sieu cho em hoi lam sao de em check duoc cai Status trong arrInfoImage de show View theo nó vậy anh         /////
        //////            em thử làm như thế này nhưng lỗi ạ                                                                    /////
        //////            render(){                                                                                             /////
        //////            if(this.state.arrInfoImage[this.state.arrInfoImage.length - 1].Status === 'NoCheck'){                 /////
        //////                <View>                                                                                            /////
        //////                    <ActivityIndicator/>                                                                          /////
        //////                </View>                                                                                           /////
        //////            }else{                                                                                                /////
        //////                <View>abcxyz</View>                                                                               /////
        //////            }                                                                                                     /////
        //////        }                                                                                                         /////
        //////                                                                                                                  /////
        //////            render(){                                                                                             /////
        //////            if(this.state.check){                                                                                 /////
        //////                <View>                                                                                            /////
        //////                    <ActivityIndicator/>                                                                          /////
        //////                </View>                                                                                           /////
        //////            }else{                                                                                                /////
        //////                <View>abcxyz</View>                                                                               /////
        //////            }                                                                                                     /////
        //////        }       
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        
    }
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
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
        PhotoSelfie: state.PhotoSelfie,
        PhotoCMND: state.PhotoCMND,
        NameImageFirebase: state.NameImageFirebase,
    }
})(FinishScreen);