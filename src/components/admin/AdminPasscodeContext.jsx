'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AdminPasscodeContext = createContext({
  passcode: '',
  setPasscode: () => {},
  clearPasscode: () => {},
  isAuthenticated: false,
});

export function AdminPasscodeProvider({ children }) {
  const [passcode, setPasscodeState] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('tbs_admin_passcode');
      if (stored) {
        setPasscodeState(stored);
      }
    } catch {
      // ignore
    }
    setIsLoaded(true);
  }, []);

  const setPasscode = (code) => {
    setPasscodeState(code);
    try {
      if (code) {
        sessionStorage.setItem('tbs_admin_passcode', code);
      } else {
        sessionStorage.removeItem('tbs_admin_passcode');
      }
    } catch {
      // ignore
    }
  };

  const clearPasscode = () => {
    setPasscodeState('');
    try {
      sessionStorage.removeItem('tbs_admin_passcode');
    } catch {
      // ignore
    }
  };

  return (
    <AdminPasscodeContext.Provider
      value={{
        passcode,
        setPasscode,
        clearPasscode,
        isAuthenticated: !!passcode,
        isLoaded,
      }}
    >
      {children}
    </AdminPasscodeContext.Provider>
  );
}

export function useAdminPasscode() {
  return useContext(AdminPasscodeContext);
}
