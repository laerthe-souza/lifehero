import React, { useCallback, useRef } from 'react';
import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useHistory, useParams } from 'react-router-dom';
import Input from '../../components/Input';

import { Container } from './styles';
import getValidationError from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import { useLoading } from '../../hooks/loading';

interface FormData {
  password: string;
  confirmPassoword: string;
}

interface RouteParams {
  token: string;
}

const RecoveryPassoword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { callingLoadingFunction } = useLoading();
  const history = useHistory();
  const { token }: RouteParams = useParams();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (formData: FormData) => {
      formRef.current?.setErrors({});

      callingLoadingFunction(true);
      try {
        const schema = Yup.object().shape({
          password: Yup.string().test('text-name', '', function (value = '') {
            const { createError, path } = this;

            if (!value) {
              return createError({ path, message: 'A senha é obrigatória' });
            }

            if (/\s/g.test(value)) {
              return createError({
                path,
                message: 'Não são permitidos espaços em brancos!',
              });
            }

            if (value.length < 8) {
              return createError({
                path,
                message: 'Digite no mínimo 8 caracteres',
              });
            }

            return true;
          }),
          confirmPassword: Yup.string().test('text-name', '', function (
            value = '',
          ) {
            const { createError, path } = this;

            if (!value) {
              return createError({ path, message: 'Este campo é obrigatório' });
            }

            if (value !== formData.password) {
              return createError({
                path,
                message: 'As senhas não coincidem',
              });
            }

            return true;
          }),
        });

        await schema.validate(formData, { abortEarly: false });

        await api.post('authentications/recoveryPassword', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        addToast({
          type: 'success',
          title: 'Senha alterada com sucesso',
          description:
            'Sua senha foi alterada com sucesso, você já pode fazer seu logon!!!',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationError(err);

          formRef.current?.setErrors(errors);
        } else {
          addToast({
            type: 'error',
            title: 'Não foi possível recuperar sua senha',
            description: err.response.data.message,
          });
        }
      }

      callingLoadingFunction(false);
    },
    [addToast, history, token, callingLoadingFunction],
  );

  return (
    <Container>
      <main>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Insira sua nova senha</h1>

          <Input
            icon={FiLock}
            type="password"
            name="password"
            placeholder="Digite a senha nova"
          />
          <Input
            icon={FiLock}
            type="password"
            name="confirmPassword"
            placeholder="Confirme a senha nova"
          />

          <button type="submit">Confirmar</button>
        </Form>
      </main>
    </Container>
  );
};

export default RecoveryPassoword;
