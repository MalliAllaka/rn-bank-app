import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Container from '../components/Container';
import AccountCard from '../components/AccountCard';
import LastTransactions from '../components/LastTransactions';
import { getUser } from '../selector/auth';

export default function Home() {
  const user = useSelector((state) => getUser(state));

  return (
    <Container>
      <AccountCard user={user} />
      <LastTransactions user={user} />
    </Container>
  );
}

const styles = StyleSheet.create({});
