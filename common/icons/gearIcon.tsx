import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const GearIcon = (props: SvgProps) => (
  <Svg width={37} height={38} fill='none' {...props}>
    <Path
      fill='#000'
      d='M34.305 10.43h1.325c.752 0 1.37.63 1.37 1.41v2.333a1.38 1.38 0 0 1-1.37 1.397h-1.327c-.246.998-.63 1.94-1.13 2.796l.95 1c.258.269.4.625.4 1.003a1.442 1.442 0 0 1-.4 1.003l-1.587 1.65a1.332 1.332 0 0 1-1.93-.002l-.988-1.025a9.655 9.655 0 0 1-2.648 1.118v1.474c0 .782-.6 1.412-1.353 1.412h-2.245c-.752 0-1.343-.63-1.343-1.412v-1.473a9.713 9.713 0 0 1-2.653-1.119l-.997 1.027a1.33 1.33 0 0 1-1.928 0l-1.587-1.65a1.443 1.443 0 0 1-.4-1.005c0-.379.142-.737.4-1.004l.952-.997a10.52 10.52 0 0 1-1.13-2.796H13.36c-.753 0-1.36-.615-1.36-1.397V11.84c0-.78.607-1.41 1.36-1.41h1.326a10.47 10.47 0 0 1 1.131-2.79l-.952-.995a1.435 1.435 0 0 1-.399-1.002c0-.373.145-.739.4-1.003l1.587-1.65a1.361 1.361 0 0 1 1.93.001l.993 1.027A9.678 9.678 0 0 1 22.029 2.9V1.425C22.029.643 22.62 0 23.372 0h2.245c.752 0 1.353.643 1.353 1.425V2.9a9.656 9.656 0 0 1 2.647 1.118l.993-1.027a1.357 1.357 0 0 1 1.928 0l1.588 1.65c.256.267.398.625.398 1.003 0 .38-.141.736-.398 1.003l-.953.994c.501.855.886 1.79 1.132 2.79zm-14.122 2.577c0 2.451 1.93 4.44 4.311 4.44 2.381 0 4.313-1.988 4.313-4.44 0-2.454-1.931-4.44-4.313-4.44-2.38 0-4.311 1.986-4.311 4.44zm-4.042 16.377.863.23a.92.92 0 0 1 .655 1.122l-.391 1.461a.913.913 0 0 1-1.128.637l-.863-.232a6.705 6.705 0 0 1-1.206 1.554l.452.793a.916.916 0 0 1-.336 1.255l-1.311.756a.916.916 0 0 1-.698.091.913.913 0 0 1-.56-.428l-.47-.814a6.657 6.657 0 0 1-1.913.238l-.247.922a.911.911 0 0 1-1.119.649l-1.462-.392a.906.906 0 0 1-.638-1.12l.247-.921a6.695 6.695 0 0 1-1.54-1.164l-.821.47a.916.916 0 0 1-1.256-.337l-.757-1.311a.916.916 0 0 1-.092-.699.915.915 0 0 1 .429-.56l.788-.457a6.675 6.675 0 0 1-.267-1.948l-.864-.232a.906.906 0 0 1-.651-1.113l.391-1.46a.914.914 0 0 1 1.123-.646l.863.232a6.64 6.64 0 0 1 1.205-1.55l-.453-.79a.912.912 0 0 1-.092-.697.924.924 0 0 1 .429-.558l1.31-.756a.944.944 0 0 1 1.258.337l.474.816a6.666 6.666 0 0 1 1.915-.237l.248-.924a.913.913 0 0 1 1.114-.658l1.462.392c.49.131.774.639.642 1.129l-.247.924c.585.32 1.09.71 1.536 1.161l.82-.47a.941.941 0 0 1 1.255.337l.757 1.31a.916.916 0 0 1 .091.698.915.915 0 0 1-.427.56l-.788.455c.183.623.277 1.276.27 1.945zm-9.63-.852c-.412 1.536.511 3.118 2.062 3.534 1.551.415 3.143-.493 3.554-2.029.412-1.536-.513-3.117-2.064-3.533-1.55-.415-3.141.492-3.553 2.028z'
    />
  </Svg>
);

export default GearIcon;