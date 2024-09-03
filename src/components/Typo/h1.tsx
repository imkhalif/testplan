import React, { ReactNode } from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';

interface H1Props {
  children: ReactNode;
  style?: TextStyle;
}

const H1: React.FC<H1Props> = ({ children, style }) => {
  return (
    <Text style={[styles.baseText, style]}>{children}</Text>
  );
};

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Inter-Black',
    fontSize: 24,
    color: '#fff'
  },
});

export default H1;
