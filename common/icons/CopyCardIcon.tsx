import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const CopyCardIcon = (props: any) => (
  <Svg
    width={23}
    height={23}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <Path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M0 2.418A2.418 2.418 0 0 1 2.418 0h13.905c1.233 0 2.25.923 2.4 2.116H4.837a2.418 2.418 0 0 0-2.419 2.418v14.207A2.418 2.418 0 0 1 0 16.323V2.418ZM6.65 3.93A2.418 2.418 0 0 0 4.23 6.348v13.905A2.418 2.418 0 0 0 6.65 22.67h13.905a2.418 2.418 0 0 0 2.418-2.418V6.348a2.418 2.418 0 0 0-2.418-2.418H6.65Z'
      fill='#fff'
    />
  </Svg>
);

export default CopyCardIcon;
