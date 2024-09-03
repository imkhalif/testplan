import React, {useEffect, useState, useCallback} from 'react';
import {ActivityIndicator, Image, Text, View, Pressable, Dimensions, ScrollView, Button, Linking, Alert, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import P from '../components/Typo/para';

const windowWidth = Dimensions.get('window').width;

const DetailScreen = ({ route, navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { itemId } = route.params;

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('detail-data');
      if (value !== null) {
        setLoading(false)
        setData(JSON.parse(value));
      }
    } catch (e) {
        setLoading(false)
      Alert.alert("Error")
    }
  };

  useEffect(() => {
    getData();
  });

  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(data?.location);

    if (supported) {
      await Linking.openURL(data?.location);
    } else {
      Alert.alert(`Don't know how to open this URL: ${data?.location}`);
    }
  }, [data?.location]);

  return (
    <View style={{flex: 1, padding: 20}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView 
            contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
            showsVerticalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 6}}>
                <Pressable style={{ padding: 4  }} onPress={() => navigation.goBack()}>
                    <Image
                        style={{ width: 24, height: 18 }}
                        source={require('../assets/images/arrow_back_left_icon.png')}
                    />
                </Pressable>
                <Text style={styles.title}>Detail Screen</Text>
            </View>
            <View style={{ marginVertical: 20 }}>
            {data?.images && <Image
                        style={{ width: windowWidth*0.9, height: 300, borderRadius: 30 }}
                        resizeMode='cover'
                        source={{
                            uri: data?.images,
                          }}
                    />}
                <View style={{ paddingHorizontal: 5, marginVertical: 20 }}>
                    <P>{data?.info}</P>
                    <Button title={'Location'} onPress={handlePress} />
                </View>
            </View>
        </ScrollView>
      )}
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Inter-Light', 
    fontSize: 22, 
    color: '#000', 
    width: '90%', 
    textAlign: 'center'
  }
})