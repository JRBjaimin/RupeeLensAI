import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const BagIcon = ({ color = '#35C9FF' }: { color?: string }) => (
  <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
    <Path
      d="M6 7H16L15 19H7L6 7Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <Path
      d="M8 7V6C8 4.34315 9.34315 3 11 3C12.6569 3 14 4.34315 14 6V7"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </Svg>
);

export const ForkIcon = ({ color = '#9A7BFF' }: { color?: string }) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M7 3V8M10 3V8M13 3V8M7 8C7 9.65685 8.34315 11 10 11C11.6569 11 13 9.65685 13 8M10 11V17"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </Svg>
);

export const BoltIcon = ({ color = '#FF7DA8' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Path
      d="M10.6 1.5L4 9.5H8.1L7.5 16.5L14 8.5H9.9L10.6 1.5Z"
      fill={color}
    />
  </Svg>
);

export const MoneyNoteIcon = ({ color = '#35C9FF' }: { color?: string }) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M3 5H17V15H3V5Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <Path
      d="M6 10H14"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <Path
      d="M6 8H8"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </Svg>
);

export const CashIcon = ({ color = '#3FE0FF' }: { color?: string }) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M2.5 6H17.5V14H2.5V6Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <Path
      d="M6.5 10H13.5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </Svg>
);

export const TaxiIcon = ({ color = '#35C9FF' }: { color?: string }) => (
  <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
    <Path
      d="M5 13H17L15.8 8H6.2L5 13Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <Path d="M7 16H7.01" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <Path d="M15 16H15.01" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);

export const ShoppingIcon = ({ color = '#FF7DA8' }: { color?: string }) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M4 6H16L15 17H5L4 6Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <Path
      d="M7 6V5C7 3.34315 8.34315 2 10 2C11.6569 2 13 3.34315 13 5V6"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </Svg>
);

export const CarIcon = ({
  color = '#35C9FF',
  small,
  ghost,
}: {
  color?: string;
  small?: boolean;
  ghost?: boolean;
}) => (
  <Svg
    width={small ? 18 : 22}
    height={small ? 18 : 22}
    viewBox="0 0 22 22"
    fill="none"
    opacity={ghost ? 0.4 : 1}
  >
    <Path
      d="M5 13H17L15.5 8H6.5L5 13Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <Path d="M7 16H7.01" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <Path d="M15 16H15.01" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);

export const PlayIcon = ({
  color = '#35C9FF',
  small,
  ghost,
}: {
  color?: string;
  small?: boolean;
  ghost?: boolean;
}) => (
  <Svg
    width={small ? 18 : 22}
    height={small ? 18 : 22}
    viewBox="0 0 22 22"
    fill="none"
    opacity={ghost ? 0.4 : 1}
  >
    <Path d="M7 5L17 11L7 17V5Z" fill={color} />
  </Svg>
);

export const DashboardIcon = ({ color = '#A7AABA' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Path
      d="M0 8V0H8V8H0V8M0 18V10H8V18H0V18M10 8V0H18V8H10V8M10 18V10H18V18H10V18M2 6H6V2H2V6V6M12 6H16V2H12V6V6M12 16H16V12H12V16V16M2 16H6V12H2V16V16M12 6V6V6V6V6V6M12 12V12V12V12V12V12M6 12V12V12V12V12V12M6 6V6V6V6V6V6"
      fill={color}
    />
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
