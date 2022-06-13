import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ShowInfoIcon = (props: any) => (
  <Svg
    width={28}
    height={28}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <Path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M0 14c0 7.732 6.268 14 14 14s14-6.268 14-14S21.732 0 14 0 0 6.268 0 14Zm25.273 0c0 6.226-5.047 11.273-11.273 11.273S2.727 20.226 2.727 14 7.774 2.727 14 2.727 25.273 7.774 25.273 14Zm-11.555-3.945a1.409 1.409 0 1 1 0-2.818 1.409 1.409 0 0 1 0 2.818Zm-1.973 10.709v.563h4.51v-.563h-1.128v-9.019H11.745v.564h1.128v8.455h-1.128Z'
      fill='#424242'
    />
  </Svg>
);

export default ShowInfoIcon;
