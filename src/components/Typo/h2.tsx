import React, { ReactNode } from 'react';
import {Text, StyleSheet, TextStyle} from 'react-native';


interface H2Props {
  children: ReactNode;
  style?: TextStyle;
}

const H2: React.FC<H2Props> = ({ children, style }) => {
    return (
        <Text style={[styles.baseText, style]}>{children}</Text>
    );
  };

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Inter-Black',
    fontWeight: 'black',
    fontSize: 22,
    color: '#000'
  },
});

export default H2;