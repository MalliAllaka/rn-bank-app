import React from 'react';
import { Icon as NBIcon, Text } from 'native-base';
import {
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
  Entypo,
  Ionicons,
} from '@expo/vector-icons';
import { View } from 'react-native';

export default function Icon({ name, fill, iconPack, size }) {
  const pack = React.useMemo(() => {
    if (iconPack == 'AntDesign') {
      return AntDesign;
    } else if (iconPack == 'material') {
      return MaterialIcons;
    } else if (iconPack == 'ionicons') {
      return Ionicons;
    }
  }, [iconPack]);

  if (!pack) {
    return <Text></Text>;
  }

  return <NBIcon as={pack} name={name} color={fill} size={size || '4'} />;
}
