import React from 'react';
import { Pressable, Image, View, Text, StyleSheet, Dimensions, Button } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { markAsVisited, markAsUnVisited } from '../../redux/slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import H3 from '../Typo/h3';

interface CardProps {
  navigation: NavigationProp<any>;
  item: {
    id: number;
    images: string;
    name: string;
    info: string;
    visited: boolean;
    category: string;
  };
  horizontal: boolean;
}
const windowWidth = Dimensions.get('window').width;
const Card: React.FC<CardProps> = ({ navigation, item, horizontal }) => {
  const dispatch = useDispatch();

  const handleClick = async () => {
    try {
        navigation.navigate('Details', {
            itemId: item?.id,
        })
        dispatch(markAsVisited(item?.id))
        await AsyncStorage.setItem('last-interest', item?.category);
        const jsonValue = JSON.stringify(item);
        await AsyncStorage.setItem('detail-data', jsonValue);
    } catch (e) {
       console.log(e)
    }
  };
  
  return (
    <Pressable
      style={[styles.card, horizontal?{width:windowWidth*0.5}:{width:'100%'}]}
      onPress={handleClick}
    >
      <Image
        style={{ width: '100%', height: 150, borderRadius: 10 }}
        source={{ uri: item?.images }}
      />
      <View style={{ padding: 10 }}>
        {!horizontal && <Pressable
            onPress={() => dispatch(markAsUnVisited(item?.id))}
            >
                <Text style={styles.visited}>{item?.visited ? 'visited' : ''}</Text>
            </Pressable>}
        <H3>
          {item?.name}
        </H3>
        <Text style={styles.text} numberOfLines={3}>
          {item?.info}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 8,
        borderColor: '#f0f0f0',
        borderWidth: 5,
        flex: 1,
        backgroundColor: '#f0f0f0', 
        marginHorizontal: 6,
        marginVertical: 12,
        paddingBottom: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    text: {
        fontFamily: 'Inter-Regular',
        fontWeight: '400',
        fontSize: 16,
        color: '#000',
        marginTop: 5
    },
    visited: {
        textAlign: 'right', 
        fontFamily: 'Inter-Light', 
        fontSize: 12, 
        textDecorationLine: 'underline' 
    }
});

export default Card;