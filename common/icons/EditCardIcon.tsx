import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const EditCardIcon = (props: any) => (
  <Svg
    width={27}
    height={27}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <Path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M26.672 1.128c.437.43.438 1.137.003 1.57l-.004.005c-.435.435-.78.79-.78.79l-2.4-2.376s.346-.355.779-.788l.002-.002a1.13 1.13 0 0 1 1.585-.004l.815.805ZM10.378 14.173l-.865 3.22 3.264-.847L25.086 4.281l-2.399-2.376-12.31 12.268Zm11.058-2.566v12.025c0 .62-.506 1.123-1.128 1.123H3.385a1.126 1.126 0 0 1-1.128-1.123V6.8c0-.618.505-1.122 1.128-1.122h11.77l2.273-2.245H3.385C1.52 3.433 0 4.943 0 6.8v16.832C0 25.49 1.519 27 3.385 27h16.923c1.866 0 3.384-1.51 3.384-3.367V9.38l-2.256 2.227Z'
      fill='#fff'
    />
  </Svg>
);

export default EditCardIcon;
