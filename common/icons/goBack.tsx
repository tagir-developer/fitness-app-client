import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const GoBackIcon = (props: any) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    width={33}
    height={28}
    fill='none'
    {...props}
  >
    <Path
      fill='#000'
      d='M16.502 17.508c7.491.239 12.785 5.773 15.178 9.552.265.418.944.278.977-.216.984-14.657-9.954-18.962-16.173-19.323A.51.51 0 0 1 16 7.013V1.025a.5.5 0 0 0-.808-.394L.468 12.134a.5.5 0 0 0-.028.765l14.724 13.344a.5.5 0 0 0 .836-.37V18c0-.276.226-.5.502-.492z'
    />
  </Svg>
);

export default GoBackIcon;
