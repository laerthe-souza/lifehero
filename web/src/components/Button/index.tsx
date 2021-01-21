import React, { ButtonHTMLAttributes } from 'react';

import { StyleButton } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <StyleButton {...rest}>{children}</StyleButton>
);

export default Button;
