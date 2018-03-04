import { css } from 'react-emotion';

export const breakpoints = {
  phone: 768,
  tablet: 992,
  desktop: 1440,
  desktopLarge: 1980,
};

const toPx = value => `${value}px`;

const calculateBreakpoint = (breakpoint) => {
  if (breakpoints[breakpoint]) {
    return toPx(breakpoints[breakpoint]);
  }

  switch (typeof breakpoint) {
    case 'string':
      return breakpoint;
    case 'number':
      return toPx(breakpoint);
    default:
      throw new Error(`Incorrect value of breakpoint: ${breakpoint}`);
  }
};

export const lt = breakpoint => (...args) => css`
  @media (max-width: ${calculateBreakpoint(breakpoint)}) {
    ${css(...args)}
  }
`;

export const gt = breakpoint => (...args) => css`
  @media (min-width: ${calculateBreakpoint(breakpoint)}) {
    ${css(...args)}
  }
`;

export const between = (left, right) => (...args) => css`
  @media (min-width: ${calculateBreakpoint(left)}) and (max-width: ${calculateBreakpoint(right)}) {
    ${css(...args)}
  }
`;

export default Object.keys(breakpoints).reduce(
  (acc, label) => {
    acc[label] = lt(label);
    return acc;
  },
  {},
);
