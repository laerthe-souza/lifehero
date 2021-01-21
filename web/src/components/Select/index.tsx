import React, {
  SelectHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IconBaseProps } from 'react-icons/lib';
import { useField } from '@unform/core';

import { FiAlertCircle } from 'react-icons/fi';
import { ClipLoader } from 'react-spinners';
import { Container, Error } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  ufs?: Array<{
    id: number;
    sigla: string;
  }>;
  cities?: Array<{
    id: number;
    nome: string;
  }>;
  icon: React.ComponentType<IconBaseProps>;
  isLoading: boolean;
}

const Select: React.FC<SelectProps> = ({
  icon: Icon,
  name,
  ufs,
  cities,
  isLoading,
  children,
  ...rest
}) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  const { fieldName, registerField, defaultValue, error } = useField(name);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(() => {
    if (defaultValue) {
      return true;
    }
    
    return false;
  });

  const handleSelectFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleSelectBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(selectRef.current?.value !== 'selecione');
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled}>
      {Icon && <Icon size={20} />}

      <select
        onFocus={handleSelectFocus}
        onBlur={handleSelectBlur}
        defaultValue={defaultValue}
        ref={selectRef}
        {...rest}
      >
        {children}
        {ufs &&
          ufs.map(uf => (
            <option
              key={uf.id}
              selected={uf.sigla.includes(defaultValue)}
              value={uf.sigla}
            >
              {uf.sigla}
            </option>
          ))}
        {cities &&
          cities.map(city => (
            <option
              key={city.id}
              selected={city.nome.includes(defaultValue)}
              value={city.nome}
            >
              {city.nome}
            </option>
          ))}
      </select>

      {isLoading && <ClipLoader loading={isLoading} size={20} />}

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Select;
