import React from "react";
import styled from "styled-components";
import { PiCodeSimpleBold } from 'react-icons/pi';

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <Container>
      <small>
        <PiCodeSimpleBold /> with <span className="heart">❤</span> by{" "}
        <a
          href="https://lindseyk.dev/"
          target="_blank"
          rel="noreferrer"
        >
          Lindsey K
        </a>{" "}
        &copy; {date}
      </small>
    </Container>
  );
};

export const Container = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.5rem;
  small {
    .heart {
      color: red;
    }
    a {
      text-decoration: none;
      color: black;
      padding: 0.125rem 0;
      background-color: white;
      cursor: pointer;
      left: -2px;
      top: -2px;
      z-index: 20;
      //box-shadow: 2px 2px black;
      transition: 0.1s ease-in-out;
    }
  }
`;
export default Footer;
