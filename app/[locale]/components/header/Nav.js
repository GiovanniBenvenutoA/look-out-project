"use client";
import Link from "next-intl/link";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import LanguageDropdown from "./LanguageDropdown";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";

const MyNav = ({ t }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <Navbar className="navbar-dark bg-primary" expand="lg">
        {" "}
        {/* Agrega las clases "navbar-dark bg-primary" */}
        <Container className="d-flex justify-content-center align-items-center">
          {" "}
          {/* Utilizamos el componente Container para centrar el contenido */}
          <Navbar.Brand>
            <Link href={"/"} className="navbar-brand">
              KPAZ
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarSupportedContent" />
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="me-auto">
              {/* Dropdown Component */}
              <NavDropdown
                title={t.namesMenu.account.title}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item>
                  <Link href={"/ficha"} className="dropdown-item">
                    {t.namesMenu.account.file}
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link href={"/account"} className="dropdown-item">
                    {t.namesMenu.account.create}
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link href={"/relations"} className="dropdown-item">
                    {t.namesMenu.account.accountRelationship}
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
              {/* End of Dropdown Component */}
              <LanguageDropdown t={t} />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default MyNav;
