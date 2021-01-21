import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 7rem;
  padding-right: 2rem;

  display: flex;
  align-items: center;

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

  > div {
    align-items: center;
  }

  & + div {
    margin-top: 0.8rem;
  }

  > svg {
    margin: 2rem;
  }

  select {
    flex: 1;
    height: 6rem;
    background-color: transparent;
    border: 0;
    font: normal 1.8rem Roboto, sans-serif;

    ::-webkit-scrollbar-track {
      background-color: #f4f4f4;
    }
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-thumb {
      background: #1ac92c;
      border-radius: 8px;
    }

    option {
      font: 500 1.8rem Roboto, sans-serif;
    }
  }
`;

export const Error = styled(Tooltip)`
  height: 3rem;
  margin-left: 2rem;

  display: flex;
  align-items: center;

  svg {
    margin: 0;
  }

  span {
    background-color: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
