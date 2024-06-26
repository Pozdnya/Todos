import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Navigate, Route, Routes } from "react-router-dom"
import App from './App';
import Todos from './pages/Todos/Todos';
import DeletedTodos from './pages/DeletedTodos/DeletedTodos';
import NotFound from './pages/NotFound/NotFound';
import { Provider } from 'react-redux';
import { store } from './store/store';

const Root = () => (
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route path='/' element={<Navigate to='/todos' replace />} />
            <Route path='todos' element={<Todos />} />
            <Route path='deleted' element={<DeletedTodos />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);

export default Root;