import * as React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Container from '../components/Container';

export default function Notification() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Container>
        <Text>Notification!</Text>
      </Container>
    </ScrollView>
  );
}
