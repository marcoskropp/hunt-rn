import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native'
import { NavigationScreenProp, NavigationState } from 'react-navigation'

import { api } from '../services/api'

type Navigation = NavigationScreenProp<NavigationState>

interface IDocs {
  _id: string
  title: string
  description: string
  url: string
}

interface IProductInfo {
  total: number
  limit: number
  page: string
  pages: number
}

const Main = ({ navigation }: { navigation: Navigation }) => {
  const [docs, setDocs] = useState<IDocs[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [productInfo, setProductInfo] = useState<IProductInfo>({
    total: 0,
    limit: 0,
    page: '0',
    pages: 0
  })

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = useCallback(async (newPage = 1): Promise<void> => {
    setLoading(true)
    const response = await api.get(`/products?page=${newPage}`)
    setLoading(false)

    const { docs: newDocs, ...newProductInfo } = response.data

    setPage(newPage)
    setDocs([...docs, ...newDocs])
    setProductInfo(newProductInfo)
  }, [])

  const loadMore = () => {
    if (page === productInfo.pages) {
      return
    }

    const newPage = page + 1

    loadProducts(newPage)
  }

  const renderItem = ({ item }: { item: IDocs }) => {
    return (
      <View style={styles.producContainer}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <TouchableOpacity
          style={styles.productButton}
          onPress={() => {
            navigation.navigate('Product', { product: item })
          }}>
          <Text style={styles.productButtonText}>Acessar</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator style={styles.loader} size="large" color="#3fc700" />}
      <FlatList
        contentContainerStyle={styles.list}
        data={docs}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
      />
    </View>
  )
}

Main.navigationOptions = {
  title: 'JSHunt'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  loader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    backgroundColor: 'rgba(99, 99, 99, 0.4)'
  },
  list: {
    padding: 20
  },
  producContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 20,
    marginBottom: 20
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000'
  },
  productDescription: {
    fontSize: 16,
    color: '#999',
    marginTop: 5,
    lineHeight: 24
  },
  productButton: {
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#3fc700',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  productButtonText: {
    fontSize: 16,
    color: '#3fc700',
    fontWeight: 'bold'
  }
})

export { Main }
