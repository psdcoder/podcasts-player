import styled from 'react-emotion';
import { vars } from 'helpers/styled';
import Content from './Content';
import Footer from './Footer';
import Main from './Main';
import Sidebar from './Sidebar';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: ${vars.colors.light};
`;
Layout.Content = Content;
Layout.Footer = Footer;
Layout.Main = Main;
Layout.Sidebar = Sidebar;

export default Layout;
