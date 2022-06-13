import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ActiveCardIcon = (props: any) => (
  <Svg
    width={29}
    height={21}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <Path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M.95 9.073a1.428 1.428 0 0 0 0 1.979L10.5 21 27.537 3.49a1.43 1.43 0 0 0-2.048-1.994L10.5 16.876 3.01 9.072a1.428 1.428 0 0 0-2.06 0Z'
      fill='#424242'
    />
  </Svg>
);

export default ActiveCardIcon;
