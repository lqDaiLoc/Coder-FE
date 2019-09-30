import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { TouchableOpacity, StyleSheet, Text, View, DatePickerAndroid, Image } from 'react-native';
import firebaseApp from '../FirebaseIndex';
//import * as firebase from 'firebase'
import '@firebase/firestore';
class testScreem extends React.Component {
    
    constructor() {
        super();
        this.state = {
            InfoImage: "",
            tmp: 'https://image.shutterstock.com/image-photo/lonely-sad-teenager-student-cry-260nw-730443565.jpg',
            arrInfoImage: [],
        }
    }
    componentDidMount = async () => {
        const ref = firebaseApp.database().ref('InfoImage');
        await ref.on('value', snapshot => {
        const val = snapshot.val();
        this.setState({arrInfoImage: val});
        alert(this.state.arrInfoImage[this.state.arrInfoImage.length-1].NameUri);
        //alert(this.state.arrInfoImage.length);
    });
    }
    uploadImage = async (uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        var ref = firebaseApp.storage().ref().child("Images/" + imageName);
        return ref.put(blob);
    }
    showImage = () => {
        let name = new Date().getTime() + "-media.jpg"
        this.uploadImage(this.state.tmp, name)
        .then(() => {
        alert("OK");
        })
        .catch((error) => {
        alert(error);
        })
        count = this.state.arrInfoImage.length;
        firebaseApp.database().ref('InfoImage/' + count).set({
            LocaltionX: 123,
            LocaltionY: 123,
            Status: "NoCheck",
            NameUri: name,
            allow: "False"     
        });
        
    }
    downloadIamge = async () => {
        firebaseApp.storage().ref().child('Images/1569490425818-media.jpg').getDownloadURL()
        .then((downloadURL) => {
          this.setState({
            tmp: downloadURL,
          })
        })
        .catch(() => {
          alert('deo dc')      
        })
      }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress = {this.showImage} style={{width: 100, height: 30, backgroundColor: 'blue'}}>
                    <Text>{this.props.CMND}</Text>
                </TouchableOpacity>
                <View style={{width: 300, height: 300, backgroundColor: 'black'}}>
                    <Image source={{ uri: this.state.tmp }} style={{width: 200, height: 200}}/>
                </View>
                <TouchableOpacity onPress = {this.downloadIamge} style={{width: 100, height: 30, backgroundColor: 'blue'}}>
                    <Text>downloadIamge</Text>
                </TouchableOpacity>
            </View>
        );
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
        CMND: state.CMND,
        Mounth: state.Mounth,
    }
})(testScreem);