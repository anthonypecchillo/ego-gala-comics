import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: #574177;
  background-color: #333;
  bottom: 0;
  padding: 45px;

  @media (max-width: 480px) {
    padding: 20px;
    position: sticky;
  }
`;

const FooterLink = styled.a`
  color: #fff;
  margin: 0 10px;
  text-decoration: none;
  &:hover {
    color: #ccc;
    color: #73e10a;
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterLink href="#">Link 1</FooterLink>
      <FooterLink href="#">Link 2</FooterLink>
      <FooterLink href="#">Link 3</FooterLink>
    </FooterContainer>
  );
};

export default Footer;
