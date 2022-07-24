import { ThemeProvider } from '@mui/material';
import type { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { AppProvider } from './App.context';
import { AppRoutes } from './router';
import { MATheme } from './theme';

const App: FC = () => (
  <Router>
    <ThemeProvider theme={MATheme}>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </ThemeProvider>
  </Router>
);

export default App;
