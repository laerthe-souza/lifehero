import React, { useCallback, useRef } from 'react';
import { FiAlertCircle, FiLock, FiMail, FiUser, FiX } from 'react-icons/fi';
import { FaQuestionCircle } from 'react-icons/fa';
import { useTransition } from 'react-spring';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import { useDialogoBox } from '../../hooks/dialogBox';
import Input from '../Input';
import getValidationError from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';

import { Container, DialogBoxContainer } from './styles';

interface DialogBoxProps {
  data: {
    type: 'confirm' | 'prompt' | 'alert';
    title: string;
    description?: string;
    to?: string;
  };
  show: boolean;
}

interface FormData {
  username: string;
  password: string;
  email: string;
}

const DialogBox: React.FC<DialogBoxProps> = ({ data, show }) => {
  const { buttonPressed } = useDialogoBox();
  const { addToast } = useToast();

  const formRef = useRef<FormHandles>(null);

  const handleButtonClicked = useCallback(
    (value: string) => {
      buttonPressed(value);
    },
    [buttonPressed],
  );

  const handleSubmitPermission = useCallback(
    async (formData: FormData) => {
      formRef.current?.setErrors({});

      try {
        const schema = Yup.object().shape({
          username: Yup.string()
            .trim()
            .test('text-name', '', function (value) {
              const { createError, path } = this;

              if (!value) {
                return createError({
                  path,
                  message: 'O nome de usuário é obrigatório',
                });
              }

              if (value !== process.env.REACT_APP_ADM_USERNAME) {
                return createError({
                  path,
                  message: 'Nome de usuário incorreto',
                });
              }

              return true;
            }),
          password: Yup.string()
            .trim()
            .test('text-name', '', function (value) {
              const { createError, path } = this;

              if (!value) {
                return createError({
                  path,
                  message: 'A senha é obrigatória',
                });
              }

              if (value !== process.env.REACT_APP_ADM_PASSWORD) {
                return createError({ path, message: 'Senha incorreta' });
              }

              return true;
            }),
        });

        await schema.validate(formData, { abortEarly: false });

        buttonPressed('yes');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationError(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [buttonPressed],
  );

  const handleSubmitForgotPassword = useCallback(
    async (formData: FormData) => {
      formRef.current?.setErrors({});

      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .trim()
            .email('Insira um formato de e-mail válido')
            .required('O e-mail é obrigatório'),
        });

        await schema.validate(formData, { abortEarly: false });

        await api.post('authentications/forgotPassword', formData);

        addToast({
          type: 'success',
          title: 'E-mail enviado com sucesso',
          description: `Um e-mail de recuperação foi enviado para ${formData.email}`,
        });

        buttonPressed('yes');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationError(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [buttonPressed, addToast],
  );

  const opacityStyle = useTransition(show, null, {
    config: { duration: 200 },
    from: { top: '-30%', opacity: 0 },
    enter: { top: '0%', opacity: 1 },
    leave: { top: '-30%', opacity: 0 },
  });

  return (
    <>
      {opacityStyle.map(({ item, key, props }) => (
        <Container display={item} key={key} style={props}>
          {data.type !== 'prompt' ? (
            <DialogBoxContainer className="alert-container">
              <header>
                <img src={logoImg} alt="Life Hero" />

                <p>{data.title}</p>

                <button
                  onClick={() => {
                    handleButtonClicked('no');
                  }}
                  type="button"
                >
                  <FiX size={24} color="#c53030" />
                </button>
              </header>

              <main>
                <p>{data.description}</p>

                {data.type === 'alert' ? (
                  <FiAlertCircle size={80} color="#1ac92c" />
                ) : (
                  <FaQuestionCircle size={80} color="#1ac92c" />
                )}
              </main>

              <footer>
                {data.type === 'alert' ? (
                  <button type="button">OK</button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        handleButtonClicked('yes');
                      }}
                      type="button"
                    >
                      Sim
                    </button>
                    <button
                      onClick={() => {
                        handleButtonClicked('no');
                      }}
                      type="button"
                    >
                      Não
                    </button>
                  </>
                )}
              </footer>
            </DialogBoxContainer>
          ) : (
            <DialogBoxContainer className="alert-container">
              <header>
                <img src={logoImg} alt="Life Hero" />

                <p>{data.title}</p>

                <button
                  onClick={() => {
                    data.to === 'activeOrRejectOng'
                      ? window.close()
                      : handleButtonClicked('no');
                  }}
                  type="button"
                >
                  <FiX size={24} color="#c53030" />
                </button>
              </header>

              <main>
                <Form
                  ref={formRef}
                  onSubmit={
                    data.to === 'activeOrRejectOng'
                      ? handleSubmitPermission
                      : handleSubmitForgotPassword
                  }
                >
                  {data.to === 'activeOrRejectOng' ? (
                    <>
                      <Input
                        icon={FiUser}
                        type="text"
                        name="username"
                        placeholder="Nome do usuário"
                      />
                      <Input
                        icon={FiLock}
                        type="password"
                        name="password"
                        placeholder="Senha"
                      />
                    </>
                  ) : (
                    <Input
                      icon={FiMail}
                      type="text"
                      name="email"
                      placeholder="Digite seu e=mail"
                    />
                  )}
                  <button type="submit">Confirmar</button>
                </Form>
              </main>
            </DialogBoxContainer>
          )}
        </Container>
      ))}
    </>
  );
};

export default DialogBox;
