import React from 'react';
import { Checkbox } from 'native-base';

const CheckBoxField = () => {
  const [groupValues, setGroupValues] = React.useState([]);
  return (
    <Checkbox.Group onChange={setGroupValues} value={groupValues}>
      <Checkbox value="one">Keep me signed in</Checkbox>
    </Checkbox.Group>
  );
};

export default CheckBoxField;
