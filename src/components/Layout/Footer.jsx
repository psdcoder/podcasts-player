import styled from 'react-emotion';
import { toPx, vars } from 'helpers/styled';

export default styled.footer`
  padding: ${toPx(vars.spaces.l)};
  font-family: ${vars.fontFamilies.main};
  font-size: ${toPx(vars.fontSizes.s)};
  background-color: ${vars.colors.primary};
  color: ${vars.colors.light};
`;
