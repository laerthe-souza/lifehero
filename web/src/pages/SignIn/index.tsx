import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiUser, FiLock } from 'react-icons/fi';
import { FaUnlockAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import logoImg from '../../assets/logo.svg';
import landingImg from '../../assets/landing.png';

import Input from '../../components/Input/index';
import Button from '../../components/Button/index';

import { Container, Content, Background } from './styles';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationError from '../../utils/getValidationErrors';
import { useLoading } from '../../hooks/loading';
import { useDialogoBox } from '../../hooks/dialogBox';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const { addToast } = useToast();
  const { callingLoadingFunction } = useLoading();
  const { newPrompt } = useDialogoBox();

  const formRef = useRef<FormHandles>(null);

  const handleLogin = useCallback(
    async (formData: SignInFormData) => {
      callingLoadingFunction(true);

      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Insira um formato de e-mail válido')
            .required('O e-mail é obrigatório'),
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
        });

        await schema.validate(formData, {
          abortEarly: false,
        });

        await signIn(formData);

        callingLoadingFunction(false);
      } catch (err) {
        callingLoadingFunction(false);

        if (err instanceof Yup.ValidationError) {
          const error = getValidationError(err);

          formRef.current?.setErrors(error);
        } else {
          addToast({
            type: 'error',
            title: 'Não foi possível fazer login',
            description:
              err.response.data.message || 'Erro interno no servidor',
          });
        }
      }
    },
    [signIn, addToast, callingLoadingFunction],
  );

  return (
    <Container>
      <Content>
        <div id="container-content">
          <img src={logoImg} alt="Life Hero" />

          <Form ref={formRef} onSubmit={handleLogin}>
            <h1>Faça seu logon</h1>

            <Input
              icon={FiUser}
              type="text"
              name="email"
              placeholder="E-mail"
            />
            <Input
              icon={FiLock}
              type="password"
              name="password"
              placeholder="Senha"
            />

            <Button type="submit">Entrar</Button>
          </Form>

          <footer>
            <button
              onClick={() => {
                newPrompt({
                  title: 'INFORME SEUS DADOS',
                  to: 'forgotPassword',
                });
              }}
              className="helpers"
              type="button"
            >
              <FaUnlockAlt size={18} color="1AC92C" />
              Esqueci minha senha
            </button>

            <Link to="/signup">
              <button className="helpers" type="button">
                <FiLogIn size={20} color="1AC92C" />
                Não tenho cadastro
              </button>
            </Link>
          </footer>
        </div>
      </Content>

      <Background src={landingImg} />
    </Container>
  );
};
export default SignIn;
