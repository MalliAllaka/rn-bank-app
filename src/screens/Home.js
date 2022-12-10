import * as React from 'react';
import { StyleSheet } from 'react-native';

import Container from '../components/Container';
import AccountCard from '../components/AccountCard';
import LastTransactions from '../components/LastTransactions';

export default function Home() {
  return (
    <Container>
      <AccountCard />
      <LastTransactions />
    </Container>
  );
}

const styles = StyleSheet.create({});
