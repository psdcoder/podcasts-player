import styled from 'react-emotion';
import { toPx, vars } from 'helpers/styled';

export default styled.aside`
  flex-basis: 300px;
  font-family: ${vars.fontFamilies.main};
  font-size: ${toPx(vars.fontSizes.m)};
  line-height: 1.4;
  background-color: ${vars.colors.light};
  color: ${vars.texts.main};
  padding: ${toPx(vars.spaces.l)};
`;
