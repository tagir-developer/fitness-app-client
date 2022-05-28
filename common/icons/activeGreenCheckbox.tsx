import * as React from 'react';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';

const ActiveGreenCheckbox = (props: any) => (
  <Svg
    width={31}
    height={31}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <Circle cx={15.5} cy={15.5} r={15.5} fill='url(#a)' />
    <Defs>
      <RadialGradient
        id='a'
        cx={0}
        cy={0}
        r={1}
        gradientUnits='userSpaceOnUse'
        gradientTransform='rotate(76.551 -1.903 17.785) scale(15.937)'
      >
        <Stop stopColor='#D1FF71' />
        <Stop offset={0.505} stopColor='#3CD905' />
        <Stop offset={1} stopColor='#048D22' />
      </RadialGradient>
    </Defs>
  </Svg>
);

export default ActiveGreenCheckbox;
