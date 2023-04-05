import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faFacebookF, faRedditAlien } from '@fortawesome/free-brands-svg-icons';


const NavbarContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: #A5C565;
  background-color: rebeccapurple;
  background-color: #574177;
  background-color: #333;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(1, 1, 1, 0.4);
  padding: 19px;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavLeft = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const NavRight = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const NavLink = styled.a`
  color: #fff;
  color: #333;
  margin-right: 10px;
  text-decoration: none;
  &:hover {
    color: #ccc;
    color: #A5C565;
    color: #73DC0A;
    color: #73E10A;
  }
`;

const Navbar: React.FC = () => {
  return (
    <NavbarContainer>
      <NavLeft>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/comic">Comic</NavLink>
        <NavLink href="/about">About</NavLink>
      </NavLeft>
      <NavRight>
        <NavLink
          href="https://twitter.com/ego_gala"
          rel="noopener noreferrer"
          target="_blank"
        >
          <FontAwesomeIcon icon={faTwitter} /*size="lg" color="#123456"*//>
        </NavLink>
        <NavLink
          href="https://www.instagram.com/ego_gala/"
          rel="noopener noreferrer"
          target="_blank"
          >
          <FontAwesomeIcon icon={faInstagram} /*size="lg" color="#123456"*//>
        </NavLink>
        <NavLink
          href="https://www.facebook.com/k10.shull"
          rel="noopener noreferrer"
          target="_blank"
        >
          <FontAwesomeIcon icon={faFacebookF} /*size="lg" color="#123456"*//>
        </NavLink>
        <NavLink
          href="https://www.reddit.com/user/ego_gala/"
          rel="noopener noreferrer"
          target="_blank"
          >
          <FontAwesomeIcon icon={faRedditAlien} /*size="lg" color="#123456"*//>
        </NavLink>
      </NavRight>
    </NavbarContainer>
  );
};

export default Navbar;
