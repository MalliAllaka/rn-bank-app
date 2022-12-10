import React from 'react';
import { Text } from 'native-base';

export default function ErrorMessage({ data }) {
  return <Text color="red.400">{`${data}`}</Text>;
}
