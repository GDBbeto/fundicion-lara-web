import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import api from 'services/api';
import { AUTH_STATUS_ENDPOINT } from 'services/apiRoutes';

type BackendStatus = 'checking' | 'ready' | 'waking';

interface BackendStatusContextValue {
  status: BackendStatus;
  /** Fuerza un intento inmediato (ej. cuando el usuario le da "Reintentar") */
  retryNow: () => void;
}

const BackendStatusContext = createContext<BackendStatusContextValue>({
  status: 'checking',
  retryNow: () => {},
});

// Mientras el backend no responde: reintenta seguido (arranque en frío puede
// tardar 30-90s entre Render + Aiven despertando).
const WAKING_INTERVAL_MS = 5 * 60 * 1000; // 10 min

// Una vez que ya respondió: solo mantenerlo vivo, sin abusar de las horas gratis.
const KEEP_ALIVE_INTERVAL_MS = 10 * 60 * 1000; // 10 min

export const BackendStatusProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [status, setStatus] = useState<BackendStatus>('checking');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const attemptsRef = useRef(0);

  const scheduleNext = (delay: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(ping, delay); // eslint-disable-line @typescript-eslint/no-use-before-define
  };

  const ping = async () => {
    try {
      await api.get(AUTH_STATUS_ENDPOINT);
      attemptsRef.current = 0;
      setStatus('ready');
      scheduleNext(KEEP_ALIVE_INTERVAL_MS); // ya despierto: bajar frecuencia
    } catch {
      attemptsRef.current += 1;
      setStatus('waking');
      scheduleNext(WAKING_INTERVAL_MS); // sigue dormido: reintentar seguido
    }
  };

  useEffect(() => {
    ping(); // primer intento inmediato al cargar la app

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const retryNow = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    ping();
  };

  return (
    <BackendStatusContext.Provider value={{ status, retryNow }}>
      {children}
    </BackendStatusContext.Provider>
  );
};

export const useBackendStatus = () => useContext(BackendStatusContext);
