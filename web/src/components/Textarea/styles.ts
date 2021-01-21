import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 18rem;
  padding-right: 2rem;

  display: flex;
  align-items: flex-start;

  border: 2px solid #dcdce6;
  border-radius: 0.8rem;
  background-color: #fff;
  color: #a8a8b3;

  ${props =>
    props.isErrored &&
    css`
      border: 2px solid #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border: 2px solid #1ac92c;
      color: #1ac92c;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #1ac92c;
    `}

  & + div {
    margin-top: 0.8rem;
  }

  > svg {
    margin: 2rem;
  }

  textarea {
    flex: 1;
    border: 0;
    border-radius: 0.8rem;
    padding: 2rem 0;
    font: normal 1.8rem Roboto, sans-serif;
    color: #41414d;
    outline: 0;
    resize: none;
    min-height: 17.5rem;

    &::placeholder {
      font: normal 1.8rem Roboto, sans-serif;
      color: #a8a8b3;
    }

    & + input {
      margin-top: 0.8rem;
    }
  }
`;

export const Error = styled(Tooltip)`
  height: 3rem;
  margin-left: 2rem;

  display: flex;
  align-items: center;

  svg {
    margin: 3rem 0 0 0;
  }

  span {
    bottom: 3rem;
    background-color: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
