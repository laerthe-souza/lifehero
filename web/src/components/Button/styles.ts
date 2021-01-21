import styled from 'styled-components';
import { shade } from 'polished';

export const StyleButton = styled.button`
  margin-top: 2rem;
  padding: 0 4rem;
  display: block;
  height: 7rem;
  border: 0;
  border-radius: 0.8rem;
  background-color: #1ac92c;
  font: bold 1.8rem Roboto, sans-serif;
  color: #fff;
  transition: background-color 0.4s;

  & + button {
    margin-left: 2rem;
  }

  &:hover {
    background-color: ${shade(0.2, '#1ac92c')};
  }
`;
