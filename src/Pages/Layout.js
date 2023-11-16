import { Outlet } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Layout = () => {
  return (
    <>
      <>

      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">RA Dash</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/export">Exportar dados</Nav.Link>
            <Nav.Link href="/complaints">Reclamações</Nav.Link>
            <Nav.Link href="/dash">Dashboards</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>

      <Outlet />
    </>
  )
};

export default Layout;