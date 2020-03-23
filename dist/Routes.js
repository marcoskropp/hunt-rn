import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Main } from './pages/Main';
import { Product } from './pages/Product';
const RootStack = createStackNavigator({
    Main,
    Product
}, {
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#DA552F'
        },
        headerTitleColor: '#FFF'
    }
});
export default createAppContainer(RootStack);
