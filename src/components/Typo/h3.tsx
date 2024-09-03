import React, { ReactNode } from 'react';
import {Text, StyleSheet, TextStyle} from 'react-native';


interface H3Props {
  children: ReactNode;
  style?: TextStyle;
}

const H3: React.FC<H3Props> = ({ children, style }) => {
    return (
        <Text style={[styles.baseText, style]}>{children}</Text>
    );
  };

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#000'
  },
});

export default H3;