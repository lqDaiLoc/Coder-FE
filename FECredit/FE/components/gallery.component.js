import React from 'react';
import { View, Image, ScrollView } from 'react-native';

import styles from './styles';

export default ({ captures }) => (
    <ScrollView
        horizontal={true}
        style={[styles.bottomToolbar, styles.galleryContainer]}>
        {captures.map(({ uri }) => (
            <View style={styles.galleryImageContainer} key={uri}>
                <Image source={{ uri }} style={styles.galleryImage} />
            </View>
        ))}
    </ScrollView>
);

// {captures.map(({ uri }) => (
//     <View style={styles.galleryImageContainer} key={uri}>
//         <Image source={{ uri }} style={styles.galleryImage} />
//     </View>
// ))}
// {
//     captures.forEach(element => {
//       if(element == captures[captures.length - 1]){
//         (<View style={styles.galleryImageContainer} key={element}>
//                 <Image source={{ element }} style={styles.galleryImage} />
//         </View>)
//     }})

// }