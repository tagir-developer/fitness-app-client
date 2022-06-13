import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const DeleteCardIcon = (props: any) => (
  <Svg
    width={17}
    height={25}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <Path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M4.3 2.95a2 2 0 0 1 2-2h4.4a2 2 0 0 1 2 2v.1h3.15c.58 0 1.05.47 1.05 1.05H.1c0-.58.47-1.05 1.05-1.05H4.3v-.1ZM1.095 5.067l.773 17.66s.278 1.323 1.326 1.323h10.611c1.049 0 1.327-1.323 1.327-1.323l.737-17.66H1.095Zm10.45 2.183-.525 15.16h1.05l.525-15.16h-1.05Zm-5.67 15.16L5.35 7.25H4.3l.525 15.16h1.05Zm2.1-15.16h1.05v15.16h-1.05V7.25Z'
      fill='#fff'
    />
  </Svg>
);

export default DeleteCardIcon;
