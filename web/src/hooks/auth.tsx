import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface UserData {
  name: string;
  email: string;
  city: string;
  uf: string;
  profile: string;
  contact: {
    whatsapp: string;
    phone: string;
  };
}

interface AuthData {
  token: string;
  ong: UserData;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
  cnpj: string;
  whatsapp: string;
  phone: string;
  city: string;
  uf: string;
}

interface AuthContextData {
  user: UserData;
  token: string;
  signUp(credentials: SignUpCredentials): Promise<void>;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateOng(data: FormData): Promise<void>;
  updateImageProfile(data: FormData): Promise<void>;
  deleteImageProfile(profile: string): Promise<void>;
  deleteOng(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [ongData, setOngData] = useState<AuthData>(() => {
    const token = localStorage.getItem('@LifeHero:token');
    const ong = localStorage.getItem('@LifeHero:user');
    const createdAt = localStorage.getItem('@LifeHero:createdAt');

    if (
      createdAt !== new Date().getDate().toString() &&
      new Date().getHours() >= 5
    ) {
      localStorage.clear();
      return {} as AuthData;
    }

    if (token && ong && createdAt) {
      return { token, ong: JSON.parse(ong), createdAt };
    }

    return {} as AuthData;
  });

  const signUp = useCallback(
    async ({
      name,
      email,
      password,
      cnpj,
      whatsapp,
      phone,
      city,
      uf,
    }: SignUpCredentials) => {
      const signUpData = {
        name,
        email,
        password,
        cnpj,
        whatsapp,
        phone,
        city,
        uf,
      };

      await api.post('ongs', signUpData);
    },
    [],
  );

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('authentications', {
      email,
      password,
    });

    const { ong, token } = response.data;

    const createdAt = new Date().getDate();

    localStorage.setItem('@LifeHero:user', JSON.stringify(ong));
    localStorage.setItem('@LifeHero:token', token);
    localStorage.setItem('@LifeHero:createdAt', createdAt.toString());

    setOngData({ ong, token });
  }, []);

  const signOut = useCallback(async () => {
    localStorage.removeItem('@LifeHero:token');
    localStorage.removeItem('@LifeHero:user');
    localStorage.removeItem('@LifeHero:createdAt');

    setOngData({} as AuthData);
  }, []);

  const updateOng = useCallback(
    async (data: FormData) => {
      const response = await api.put('ongs', data, {
        headers: {
          Authorization: `Bearer ${ongData.token}`,
        },
      });

      const { ong, token } = response.data;

      localStorage.setItem('@LifeHero:user', JSON.stringify(ong));
      localStorage.setItem('@LifeHero:token', token);

      setOngData({ ong, token });
    },
    [ongData.token],
  );

  const updateImageProfile = useCallback(
    async (data: FormData) => {
      const response = await api.patch('ongs/updateOngProfile', data, {
        headers: {
          Authorization: `Bearer ${ongData.token}`,
        },
      });

      const user = localStorage.getItem('@LifeHero:user');
      const token = localStorage.getItem('@LifeHero:token');

      if (user && token) {
        const ong = JSON.parse(user);

        ong.profile = response.data;

        localStorage.setItem('@LifeHero:user', JSON.stringify(ong));

        setOngData({ ong, token });
      }
    },
    [ongData.token],
  );

  const deleteImageProfile = useCallback(
    async (profile: string) => {
      await api.patch(
        'ongs/deleteOngProfile',
        { profile },
        {
          headers: {
            Authorization: `Bearer ${ongData.token}`,
          },
        },
      );

      const user = localStorage.getItem('@LifeHero:user');
      const token = localStorage.getItem('@LifeHero:token');

      if (user && token) {
        const ong = JSON.parse(user);

        ong.profile = '';

        localStorage.setItem('@LifeHero:user', JSON.stringify(ong));

        setOngData({ ong, token });
      }
    },
    [ongData.token],
  );

  const deleteOng = useCallback(async () => {
    localStorage.removeItem('@LifeHero:token');
    localStorage.removeItem('@LifeHero:user');
    localStorage.removeItem('@LifeHero:createdAt');

    setOngData({} as AuthData);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: ongData.ong,
        token: ongData.token,
        signUp,
        signIn,
        signOut,
        updateOng,
        updateImageProfile,
        deleteImageProfile,
        deleteOng,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
