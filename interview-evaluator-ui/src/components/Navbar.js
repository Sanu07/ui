import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function CustomNavbar() {
  return (
    <Navbar expand="lg" style={{ backgroundColor: '#47d7ac' }} className="fixed-top">
      <Container fluid>
        <Navbar.Brand href="#home" style={{ color: 'white' }}><b>AI Powered</b> Interview Evaluator App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
