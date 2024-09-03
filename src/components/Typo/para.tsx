import React from 'react';
import {Text, StyleSheet} from 'react-native';

const P = ({children, style}) => {
    return (
        <Text style={[styles.baseText, style]}>{children}</Text>
    );
  };

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#000',
    verticalAlign: 'middle',
    letterSpacing: 1,
    lineHeight: 24,
    textAlign: 'justify',
    marginBottom: 10
  },
});

export default P;