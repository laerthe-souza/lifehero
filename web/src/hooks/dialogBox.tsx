import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';

import DialogBox from '../components/DialogBox';

interface DiaolgBoxData {
  type: 'confirm' | 'prompt' | 'alert';
  title: string;
  description?: string;
  to?: string;
}

interface DialogBoxContextData {
  newConfirm({
    title,
    description,
    to,
  }: Omit<DiaolgBoxData, 'type'>): Promise<boolean>;
  newPrompt({
    title,
    description,
    to,
  }: Omit<DiaolgBoxData, 'type'>): Promise<boolean>;
  buttonPressed: (value: string) => void;
}

const DialogBoxContext = createContext<DialogBoxContextData>(
  {} as DialogBoxContextData,
);

export const AlertProvider: React.FC = ({ children }) => {
  const [show, setShow] = useState(false);
  const [dialogBoxData, setDialogBoxData] = useState<DiaolgBoxData>(
    {} as DiaolgBoxData,
  );

  const button = useRef({ clickedValue: 'await' });

  const timeout = async (ms: number) =>
    new Promise(resolve => setTimeout(resolve, ms));

  const newConfirm = useCallback(
    async ({ title, description }: Omit<DiaolgBoxData, 'type'>) => {
      setShow(true);
      setDialogBoxData({ type: 'confirm', title, description });

      while (button.current.clickedValue === 'await') {
        await timeout(50);
      }

      if (button.current.clickedValue === 'yes') {
        button.current.clickedValue = 'await';
        setShow(false);
        return true;
      }

      button.current.clickedValue = 'await';
      setShow(false);
      return false;
    },
    [],
  );

  const newPrompt = useCallback(
    async ({ title, to }: Omit<DiaolgBoxData, 'type'>) => {
      setShow(true);
      setDialogBoxData({ type: 'prompt', title, to });

      while (button.current.clickedValue === 'await') {
        await timeout(50);
      }

      setShow(false);
      button.current.clickedValue = 'await';
      return true;
    },
    [],
  );

  const buttonPressed = useCallback((value: string) => {
    button.current.clickedValue = value;
  }, []);

  return (
    <DialogBoxContext.Provider value={{ newConfirm, newPrompt, buttonPressed }}>
      {children}
      <DialogBox show={show} data={dialogBoxData} />
    </DialogBoxContext.Provider>
  );
};

export function useDialogoBox(): DialogBoxContextData {
  const context = useContext(DialogBoxContext);

  return context;
}
