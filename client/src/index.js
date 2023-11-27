import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import UserStore from './store/UserStore';
import App from './App';

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    user: new UserStore(),
    loginPage : {
      login: true,
    },
  }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>
);

