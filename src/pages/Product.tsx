import React from 'react'
import { WebView } from 'react-native-webview'
import { NavigationScreenProp, NavigationState } from 'react-navigation'

interface NavigationParams {
  product: {
    url: string
    title: string
  }
}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>

const Product = ({ navigation }: { navigation: Navigation }) => (
  <WebView source={{uri: navigation.state.params ? navigation.state.params.product.url : ''}} />
)

Product.navigationOptions = ({ navigation }: { navigation: Navigation }) => ({
  title: navigation.state.params ? navigation.state.params.product.title : ''
})

export { Product }
