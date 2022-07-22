import { ThemeProvider } from '@mui/material';
import type { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { AppRoutes } from './router';
import { MATheme } from './theme';

const App: FC = () => (
  <Router>
    <ThemeProvider theme={MATheme}>
      <AppRoutes />
    </ThemeProvider>
  </Router>
);

export default App;
