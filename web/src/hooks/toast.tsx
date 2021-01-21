import React, { createContext, useCallback, useState, useContext } from 'react';
import { uuid } from 'uuidv4';
import ToastContainer from '../components/ToastContainer';

export interface ToastMessage {
  id: string;
  type?: 'info' | 'success' | 'error';
  title?: string;
  description: string;
}

interface ToastContextData {
  addToast({ type, title, description }: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

const ToastMessage = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessage, 'id'>) => {
      const id = uuid();

      const toast = {
        id,
        type,
        title,
        description,
      };

      setMessages(oldMessage => [...oldMessage, toast]);
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setMessages(oldMessage => oldMessage.filter(message => message.id !== id));
  }, []);

  return (
    <ToastMessage.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastMessage.Provider>
  );
};

export function useToast(): ToastContextData {
  const context = useContext(ToastMessage);

  return context;
}
