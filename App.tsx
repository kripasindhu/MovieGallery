import { Provider } from 'react-native-paper';
import App from './src';
import { theme } from './src/utils/theme';

const Main = () => (
  <Provider theme= {theme}>
    <App />
  </Provider>
);

export default Main;