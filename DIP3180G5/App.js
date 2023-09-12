import { registerRootComponent } from 'expo';

import CreateListingScreen from './frontend/listings-page/create-listings-screen';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(CreateListingScreen);