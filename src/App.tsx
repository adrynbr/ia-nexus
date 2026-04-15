/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider } from './store/AppContext';
import Layout from './components/Layout';
import Chat from './pages/Chat';
import Breathe from './pages/Breathe';
import Ground from './pages/Ground';
import { AppTab } from './types';

function AppContent() {
  const [activeTab, setActiveTab] = useState<AppTab>('chat');

  const renderPage = () => {
    switch (activeTab) {
      case 'chat': return <Chat />;
      case 'breathe': return <Breathe />;
      case 'ground': return <Ground />;
      default: return <Chat />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderPage()}
    </Layout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
