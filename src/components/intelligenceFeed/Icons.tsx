import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const BackIcon = ({ color = '#B1A6FF' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Path
      d="M10.5 3L6 8L10.5 13"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const SparkIcon = ({ color = '#2DE0FF' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Path
      d="M8 1.5L6.6 5.2L2.9 6.6L6.6 8L8 11.7L9.4 8L13.1 6.6L9.4 5.2L8 1.5Z"
      fill={color}
    />
  </Svg>
);

export const ClockIcon = ({ color = '#2DE0FF' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Path
      d="M8 1.5C4.4 1.5 1.5 4.4 1.5 8C1.5 11.6 4.4 14.5 8 14.5C11.6 14.5 14.5 11.6 14.5 8C14.5 4.4 11.6 1.5 8 1.5Z"
      stroke={color}
      strokeWidth="1.4"
    />
    <Path
      d="M8 4.5V8.2L10.6 9.7"
      stroke={color}
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </Svg>
);

export const SubIcon = ({ color = '#B1A6FF' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Path
      d="M3 5H13V12H3V5Z"
      stroke={color}
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <Path d="M5 4V3H11V4" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </Svg>
);

export const FamilyIcon = ({ color = '#FF9ED5' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Path
      d="M5.2 7.2C6.3 7.2 7.2 6.3 7.2 5.2C7.2 4.1 6.3 3.2 5.2 3.2C4.1 3.2 3.2 4.1 3.2 5.2C3.2 6.3 4.1 7.2 5.2 7.2ZM10.8 7.2C11.9 7.2 12.8 6.3 12.8 5.2C12.8 4.1 11.9 3.2 10.8 3.2C9.7 3.2 8.8 4.1 8.8 5.2C8.8 6.3 9.7 7.2 10.8 7.2ZM2.5 12.8C2.5 10.9 4.2 9.4 6.2 9.4H9.8C11.8 9.4 13.5 10.9 13.5 12.8"
      stroke={color}
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </Svg>
);

export const WifiIcon = ({ color = '#35C9FF' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Path d="M2.2 6.6C6 3.2 10 3.2 13.8 6.6" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <Path d="M4.4 9C6.7 7 9.3 7 11.6 9" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <Path d="M6.7 11.3C7.6 10.6 8.4 10.6 9.3 11.3" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <Path d="M8 13.6H8.01" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
  </Svg>
);

export const CardIcon = ({ color = '#B1A6FF' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Path d="M2 5H14V12H2V5Z" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
    <Path d="M2 7H14" stroke={color} strokeWidth="1.4" />
  </Svg>
);

export const BasketIcon = ({ color = '#35C9FF' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Path d="M3 6H13L12 13H4L3 6Z" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
    <Path d="M6 6V4.5C6 3.7 6.7 3 7.5 3H8.5C9.3 3 10 3.7 10 4.5V6" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </Svg>
);

export const PlusIcon = ({ color = '#B1A6FF' }: { color?: string }) => (
  <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
    <Path d="M7 3V11" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <Path d="M3 7H11" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
  </Svg>
);
