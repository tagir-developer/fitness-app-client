import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const RightArrow = (props: any) => (
  <Svg
    width={13}
    height={21}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <Path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M1.073 20.05c.553.531 1.426.531 1.979 0L13 10.5 3.052.95a1.428 1.428 0 0 0-1.979 2.06l7.802 7.49-7.802 7.49a1.428 1.428 0 0 0 0 2.06Z'
      fill='#424242'
    />
  </Svg>
);

export default RightArrow;
