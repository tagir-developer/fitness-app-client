import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const CheckIcon = (props: any) => (
  <Svg
    width={32}
    height={32}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <Path
      d='M30.88 1.617c-5.886 7.642-13.912 21.57-18.3 29.65a1 1 0 0 1-1.7.094L.186 16.143c-.51-.726.102-1.673.96-1.446 3.515.929 6.936 2.51 8.88 3.553a1.04 1.04 0 0 0 1.325-.292C18.066 8.918 24.949 3.224 29.715.162c.928-.596 1.838.582 1.165 1.455Z'
      fill='#000'
    />
  </Svg>
);

export default CheckIcon;
