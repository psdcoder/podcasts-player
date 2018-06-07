import styled from 'react-emotion';
import { toPx, vars } from 'helpers/styled';

export default styled.section`
  flex-grow: 1;
  font-family: ${vars.fontFamilies.main};
  font-size: ${toPx(vars.fontSizes.m)};
  line-height: 1.4;
  background-color: ${vars.colors.bg};
  color: ${vars.colors.light};
  color: ${vars.texts.main};
  padding: ${toPx(vars.spaces.l)};
`;
