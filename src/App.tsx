import { Container } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApolloProvider from './ApolloProvider';
import Chart from './components/Chart/Chart';
import Header from './components/Header';
import LastKnownMeasurement from './components/Measurements/LastKnownMeasurement';
import MultipleSelect from './components/MetricsSelect/Select';
import Wrapper from './components/Wrapper';
import createStore from './store';

const store = createStore();

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'white',
    },
  },
});

const App = () => (
  <ApolloProvider>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <Wrapper>
          <Header />
          <Container>
            <MultipleSelect />
            <LastKnownMeasurement />
            <ToastContainer />
            <Chart />
          </Container>
        </Wrapper>
      </Provider>
    </MuiThemeProvider>
  </ApolloProvider>
);

export default App;
