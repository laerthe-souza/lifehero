import styled from 'styled-components';

interface ContainerProps {
  src: string;
}

export const Container = styled.div<ContainerProps>`
  position: fixed;
  top: 0;
  z-index: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  background: url(${props => props.src}) no-repeat;
  background-position: 50% 50%;
  background-size: cover;
`;
