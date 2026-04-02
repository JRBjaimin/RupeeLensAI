import React from 'react';
import Svg, { Path } from 'react-native-svg';

const CalendarIcon = ({ color = '#E8EAFB' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Path
      d="M4 2V4M12 2V4M2.5 6H13.5M3 4H13C13.828 4 14.5 4.672 14.5 5.5V13C14.5 13.828 13.828 14.5 13 14.5H3C2.172 14.5 1.5 13.828 1.5 13V5.5C1.5 4.672 2.172 4 3 4Z"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default CalendarIcon;
