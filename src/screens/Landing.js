import React from 'react';
import { ImageBackground, StyleSheet, View, Pressable, Image, Dimensions, Text } from 'react-native';
import P from '../components/Typo/para';

const windowWidth = Dimensions.get('window').width;

const LandingScreen = ({ navigation }) => {

    return (
        <View style={ styles.container }>
            <ImageBackground source={require('../assets/images/header.jpg')} style={styles.backgroundImage}>
                <View style={ styles.content }>
                    <Text style={[styles.text, {fontFamily: 'Inter-Thin'}]}>Explore</Text>
                    <Text style={styles.text}>Historical Place</Text>
                    <Text style={styles.text}>of India</Text>
                    
                    
                </View>
                <Pressable style={{ position: 'absolute', right: '25%', bottom: '33%' }} onPress={() => navigation.navigate('Dashboard')}>
                        <Image
                            style={{ width: 48, height: 48 }}
                            source={require('../assets/images/arrow_circle_navigation_icon.png')}
                        />
                    </Pressable>
            </ImageBackground>
        </View>
    );
};

export default LandingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', 
    },
    content: {
        position: 'absolute',
        bottom: '30%',
        left: '5%',
        right: 0,
    },
    text: {
        color: '#fff',
        fontSize: 26
    }
});