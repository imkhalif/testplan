import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useDispatch } from 'react-redux';
import Card from '../Card'; 
import { markAsVisited, markAsUnVisited } from '../../redux/slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
}));

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe('Card Component', () => {
  const mockDispatch = jest.fn();
  (useDispatch as jest.Mock).mockReturnValue(mockDispatch);

  const item = {
    id: 1,
    images: 'https://example.com/image.jpg',
    name: 'Sample Item',
    info: 'Sample Info',
    visited: true,
    category: 'Sample Category',
  };

  it('renders correctly', () => {
    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <Card navigation={{ navigate: mockNavigate } as any} item={item} horizontal={false} />
      </NavigationContainer>
    );

    expect(getByText('Sample Item')).toBeTruthy();
    expect(getByText('Sample Info')).toBeTruthy();
    expect(getByText('visited')).toBeTruthy();
  });

  it('handles onPress correctly', async () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <Card navigation={{ navigate: mockNavigate } as any} item={item} horizontal={false} />
      </NavigationContainer>
    );

    fireEvent.press(getByTestId('pressable-card'));

    expect(mockNavigate).toHaveBeenCalledWith('Details', { itemId: item.id });
    expect(mockDispatch).toHaveBeenCalledWith(markAsVisited(item.id));
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('last-interest', item.category);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('detail-data', JSON.stringify(item));
  });

  it('handles markAsUnVisited correctly', () => {
    const { getByText } = render(
      <NavigationContainer>
        <Card navigation={{ navigate: mockNavigate } as any} item={item} horizontal={false} />
      </NavigationContainer>
    );

    fireEvent.press(getByText('visited'));

    expect(mockDispatch).toHaveBeenCalledWith(markAsUnVisited(item.id));
  });
});
