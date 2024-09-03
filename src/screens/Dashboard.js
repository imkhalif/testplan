import React, { useState, useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  FlatList,
  StyleSheet,
  Animated,
  ImageBackground,
  ScrollView,
  Alert
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchData } from '../redux/actions';
import Card from '../components/Card';
import H1 from '../components/Typo/h1';
import H2 from '../components/Typo/h2';

const Header_Max_Height = 240;
const Header_Min_Height = 90;
const Scroll_Distance = Header_Max_Height - Header_Min_Height;

const Header = ({value}) => {
    const animatedHeaderHeight = value.interpolate({
      inputRange: [0, Scroll_Distance],
      outputRange: [Header_Max_Height, Header_Min_Height],
      extrapolate: 'clamp',
    });
  
    const animatedHeaderColor = value.interpolate({
      inputRange: [0, Scroll_Distance],
      outputRange: ['#181D31', '#678983'],
      extrapolate: 'clamp',
    });
    
    return (
      <Animated.View
        style={[
          styles.header,
          styles.shadow,
          {
            height: animatedHeaderHeight,
            backgroundColor: animatedHeaderColor,
          },
        ]}>
            <ImageBackground source={require('../assets/images/header.jpg')} resizeMode="cover" style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <H1>Historical places</H1>
            </ImageBackground>
      </Animated.View>
    );
};

function Dashboard({navigation}) {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.data);
  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  const [suggested, setSuggested]=useState([])
  
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('last-interest');
      if (value !== null) {
        const filtered = data.filter(el => el.category === value);
        setSuggested(filtered)
      }
    } catch (e) {
      console.log(e)
    }
  };

  useEffect(()=> {
    getData()
  },[data])

  if (loading) {
    return (
      <View style={styles.exception}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.exception}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => <Card navigation={navigation} item={item} />;

  return (
    <>
        <Header value={scrollOffsetY} />
        <ScrollView 
            style={{ paddingHorizontal: 5, paddingTop: 30 }}
            scrollEventThrottle={5}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollOffsetY}}}],
            {
                useNativeDriver: false,
            },
            )}>
            {suggested && <View style={{ paddingHorizontal: 10}}>
                <H2>Suggested</H2>
            </View>}
            
            {suggested && <ScrollView 
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginBottom: 20 }}>
                {suggested.map(item => (
                    <Card navigation={navigation} key={item.id} item={item} mark={false} horizontal />
                ))}
            </ScrollView>}
            <View style={{ paddingHorizontal: 10}}>
                <H2>Popular</H2>
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-evenly' }}
                contentContainerStyle={{ paddingBottom: 60 }}
            />
        </ScrollView>
    </>
  );
}

export default Dashboard;

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    header: {
      justifyContent: 'center',
      alignItems: 'center',
      left: 0,
      right: 0,
    },
    title: {
      color: '#ffff',
      fontWeight: 'bold',
      fontSize: 24,
      fontFamily: 'Cochin',
    },
    exception: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
  });