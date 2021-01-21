import React from 'react';

import { Container } from './styles';

interface ContainerProps {
  src: string;
}

const BackgroundImage: React.FC<ContainerProps> = ({ src, children }) => {
  return <Container src={src}>{children}</Container>;
};

export default BackgroundImage;
