import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import './App.css';
import reactLogo from './assets/react.svg';
import { api } from './config/api';
import viteLogo from '/vite.svg';
import { env } from '../env';

function App() {
  const [count, setCount] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ['test'],
    queryFn: () => api.get<string>('/'),
  });

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h3>{isLoading ? 'Loading...' : data?.data}</h3>
      <h4>{env.BASE_BACKEND_URL}</h4>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
