import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 50%;
  }

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100vh;
  }

  body {
    font: normal 1.4rem Roboto, sans-serif;
    background: #f0f5f5;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
    overflow-y: overlay;

    ::-webkit-scrollbar-track {
      background-color: transparent;
    }

    ::-webkit-scrollbar {
      width: 14px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 8px;

      &:hover {
        background-color: #f0f5f5;
      }
    }
  }

  input, button, textarea {
    font: normal 1.6rem Roboto, sans-serif;
  }

  a {
    text-decoration: none;
  }

  button {
    outline: 0;
    border: 0;
    cursor: pointer;
  }

  .swal-overlay {
    background-color: rgba(0, 0, 0, 0.9);
  }

  .alert {
    border-radius: 8px;

    .swal-title {
      font: 500 25px Roboto, sans-serif;
    }

    .swal-text {
      text-align: center;
      font: 500 18px Roboto, sans-serif;
    }

    .swal-footer {
      text-align: center;
    }
  }
`;
