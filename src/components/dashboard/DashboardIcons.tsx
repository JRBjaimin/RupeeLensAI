import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const DashboardMiniIcon = () => (
  <Svg width={14} height={14} viewBox="0 0 18 18" fill="none">
    <Path
      d="M0 8V0H8V8H0V8M0 18V10H8V18H0V18M10 8V0H18V8H10V8M10 18V10H18V18H10V18M2 6H6V2H2V6V6M12 6H16V2H12V6V6M12 16H16V12H12V16V16M2 16H6V12H2V16V16"
      fill="#B1A6FF"
    />
  </Svg>
);

export const BellIcon = ({ color = '#B8BCCB' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 20 20" fill="none">
    <Path
      d="M10 20C11.1 20 12 19.1 12 18H8C8 19.1 8.9 20 10 20ZM16 14V9C16 5.9 14.4 3.2 11.5 2.5V2C11.5 1.2 10.8 0.5 10 0.5C9.2 0.5 8.5 1.2 8.5 2V2.5C5.6 3.2 4 5.9 4 9V14L2.5 15.5V16H17.5V15.5L16 14Z"
      fill={color}
    />
  </Svg>
);

export const UpTrendIcon = ({ color = '#B1A6FF' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Path
      d="M3 11L7 7L9.5 9.5L13 6"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.5 6H13V8.5"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const LightningIcon = ({ color = '#2DE0FF' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Path d="M9.4 1.5L3.2 9.2H7.1L6.6 14.5L12.8 6.8H8.9L9.4 1.5Z" fill={color} />
  </Svg>
);

export const ForkMiniIcon = ({ color = '#2DE0FF' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Path
      d="M6 2V7M9 2V7M12 2V7M6 7C6 8.7 7.3 10 9 10C10.7 10 12 8.7 12 7M9 10V16"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </Svg>
);

export const BagMiniIcon = ({ color = '#B1A6FF' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Path
      d="M4 6H14L13 16H5L4 6Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <Path
      d="M6.5 6V5C6.5 3.6 7.6 2.5 9 2.5C10.4 2.5 11.5 3.6 11.5 5V6"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </Svg>
);

export const CashMiniIcon = ({ color = '#FF9ED5' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Path
      d="M3 5H15V13H3V5Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <Path d="M6 9H12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <Path d="M6 7H8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </Svg>
);

export const SearchIcon = ({ color = '#9AA1B8' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Path
      d="M7.5 2C10.5376 2 13 4.46243 13 7.5C13 8.74803 12.5797 9.90048 11.8722 10.8249L15.3536 14.3063L14.3063 15.3536L10.8249 11.8722C9.90048 12.5797 8.74803 13 7.5 13C4.46243 13 2 10.5376 2 7.5C2 4.46243 4.46243 2 7.5 2ZM7.5 3.5C5.29086 3.5 3.5 5.29086 3.5 7.5C3.5 9.70914 5.29086 11.5 7.5 11.5C9.70914 11.5 11.5 9.70914 11.5 7.5C11.5 5.29086 9.70914 3.5 7.5 3.5Z"
      fill={color}
    />
  </Svg>
);
