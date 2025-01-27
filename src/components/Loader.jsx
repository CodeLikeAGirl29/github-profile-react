import styled from "styled-components";

const Loader = ({ text }) => (
  <Container>
    <Spinner />
    <h3>{text}</h3>
  </Container>
);

export const Container = styled.div`
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  h3 {
    font-weight: 100;
    text-align: center;
  }
`;
export const Spinner = styled.div`
  margin-top: 50px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  border-top: 4px solid #fff;
  border-right: 4px solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  ::after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border-left: 4px solid #ff3d00;
    border-bottom: 4px solid transparent;
    animation: rotation 0.5s linear infinite reverse;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
export default Loader;
