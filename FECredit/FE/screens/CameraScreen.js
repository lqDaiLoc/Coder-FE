import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import Option from '../components/Option';

export default class CameraScreen extends React.Component{
  constructor(props){
    super(props);

  }
  componentDidMount(){
    
  }
  nextCameraTuSuong = () => {
    this.props.navigation.navigate('CameraTuSuong');
  }
  nextCameraCMND = () => {
    this.props.navigation.navigate('CameraCMND');
  }
  nextKiemTraHS = () => {
    Alert.alert(
    'Hãy chắc chắn là bạn đã chụp ảnh.',
    ' ',
    [
      {
        text: 'Chưa chụp',
        onPress: () => {this.props.navigation.navigate('CameraTuSuong');},
        style: 'cancel',
      },
      { text: 'Đã chụp', onPress: () => {this.props.navigation.navigate('KiemTraHoSo');}},
    ],
    { cancelable: false }
  );
    
  }
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.logoStyle}>
          <Image source={require('../assets/images/logo.png')} 
            style={{ width: '100%', height: "100%"}}/>
        </View>
        <View style={styles.bodyStyle}>
          <TouchableOpacity style={styles.optionStyle} onPress={this.nextCameraTuSuong}> 
            <Option nameOption ='Chụp ảnh tự sướng' sourceIMG = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7j3f2mAVlo5A9inebUXU-yq8VC49l6hQnzJHBQzKzzgM98r9fPA'></Option>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionStyle} onPress={this.nextCameraCMND}>
            <Option nameOption ='Chụp CMND/Thẻ căn cước' sourceIMG = 'https://banner2.kisspng.com/20180624/wuy/kisspng-smart-card-electronic-identification-computer-icon-5b2f69c1e2d9b5.4842458815298339219292.jpg'></Option>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionStyle} onPress={this.nextKiemTraHS}>
            <Option nameOption ='Kiem Tra Hồ Sơ' sourceIMG = 'https://quocluat.vn/photos/blog/ho-so-thanh-lap.jpg'></Option>
          </TouchableOpacity>
        </View>
      </View>
    );
}}

// CameraScreen.navigationOptions = {
//   header: null,
//   footer: null,
// };


const styles = StyleSheet.create({
  container: {
    flex: 0.9,
  },
  logoStyle: {
    flex: 0.2,
    backgroundColor: "red",
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyStyle: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionStyle: {
    width: '90%',
    height: '30%',
    marginTop: 20,
    justifyContent: 'center',
  }
  
});
