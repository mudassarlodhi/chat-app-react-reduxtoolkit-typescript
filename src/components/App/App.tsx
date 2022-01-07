import React from 'react';
import './App.css';
import Layout from '../Layout/Layout';
import ChatArea from '../ChatArea/ChatArea';
import { Route, Routes } from 'react-router-dom';
import ChatDetail from '../ChatArea/ChatDetail/ChatDetail';
import Welcome from '../Welcome/Welcome';
import ChatChoose from '../ChatArea/ChatChoose/ChatChoose';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/:userId" element={<ChatArea />}>
          <Route path="" element={<ChatChoose /> } />
          <Route path=":secondaryUser" element={<ChatDetail />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
