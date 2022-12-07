import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

export default function DrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
