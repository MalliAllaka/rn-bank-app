import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import { Text, Heading } from 'native-base';
import Icon from '../components/CustomIcon';
import { setUserToken, setLoginDetails } from '../reducers/auth';
import { useAppDispatch } from '../app/store';

export default function DrawerContent(props) {
  const { state, descriptors, navigation } = props;
  const dispatch = useAppDispatch();

  const onPress = (route, params) => {
    console.log('onPress');
    let options = {};
    if (params) {
      options = { ...params };
    }
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!event.defaultPrevented) {
      navigation.navigate(route.name, { options });
    }
  };
  return (
    <DrawerContentScrollView {...props}>
      <View style={{}}>
        <Heading style={{ textAlign: 'center' }}>Online Bank</Heading>
      </View>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const { icon, pack } = options;

        return (
          <View style={styles.drawerItemContainer} key={`DrawerItem${index}`}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={() => onPress(route)}
              style={[styles.tabBar]}
            >
              <RenderDrawerItem
                label={label}
                isFocused={isFocused}
                iconName={icon}
                iconPack={pack}
              />
            </TouchableOpacity>
          </View>
        );
      })}
      <View style={styles.drawerItemContainer}>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => {
            dispatch(setUserToken(''));
            dispatch(setLoginDetails({}));
          }}
          style={styles.tabBar}
        >
          <RenderDrawerItem
            label="Logout"
            isFocused={false}
            iconName="logout"
            iconPack="material"
          />
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const RenderDrawerItem = ({ label, isFocused, iconName, iconPack }) => {
  let itemStyle = {};
  let fill = isFocused ? 'primary.500' : 'black';

  return (
    <View style={[styles.drawerItem]}>
      {iconName ? (
        <Icon
          style={styles.icon}
          fill={fill}
          name={iconName}
          iconPack={iconPack ? iconPack : ''}
        />
      ) : null}
      <Text
        color={fill}
        style={[
          styles.drawerItemText,
          {
            paddingLeft: 10,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  drawerItemContainer: {
    marginHorizontal: 10,
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: 'transparent',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 12,
    margin: 3,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerItemText: {
    fontSize: 16,
    fontWeight: '300',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 45,
    resizeMode: 'contain',
  },
  icon: {
    width: 20,
    height: 20,
  },
});
