import { registerRootComponent } from 'expo';

import LoginScreen from './frontend/login-page/login-screen';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(LoginScreen);
