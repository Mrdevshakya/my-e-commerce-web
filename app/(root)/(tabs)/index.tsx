import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Dimensions, Platform, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';

const { width } = Dimensions.get('window');

export default function Home() {
  const { addItem, state } = useCart();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Electronics', 'Fashion'];
  
  const featuredProducts = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 199.99,
      image: 'https://picsum.photos/200',
      discount: '20% OFF'
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 299.99,
      image: 'https://picsum.photos/201',
      discount: '15% OFF'
    },
    // Add more products as needed
  ];

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const cartItemCount = state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>E-Store</Text>
        <View style={styles.headerRight}>
          {Platform.OS !== 'web' && (
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="search-outline" size={24} color="#333" />
            </TouchableOpacity>
          )}
          {Platform.OS === 'web' && (
            <Link href="/cart" asChild>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="cart-outline" size={24} color="#333" />
                {cartItemCount > 0 && (
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </Link>
          )}
          {Platform.OS === 'web' && (
            <Link href="/profile" asChild>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="person-outline" size={24} color="#333" />
              </TouchableOpacity>
            </Link>
          )}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={[styles.heroSection, Platform.OS === 'web' && styles.heroSectionWeb]}>
          <Image
            source={{ uri: 'https://cms.cloudinary.vpsvc.com/image/upload/c_scale,dpr_auto,f_auto,q_auto:best,t_productPageHeroGalleryTransformation_v2,w_auto/India%20LOB/embroidered-clothing/Sweatshirts/IN_Sweatshirts_001' }}
            style={[styles.heroImage, Platform.OS === 'web' && styles.heroImageWeb]}
          />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Summer Sale</Text>
            <Text style={styles.heroSubtitle}>Up to 50% off</Text>
            <TouchableOpacity style={styles.shopNowButton}>
              <Text style={styles.shopNowText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                activeCategory === category && styles.activeCategoryButton
              ]}
              onPress={() => setActiveCategory(category)}
            >
              <Text style={[
                styles.categoryText,
                activeCategory === category && styles.activeCategoryText
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured Products */}
        <View style={styles.productsSection}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.productsContainer}
          >
            {featuredProducts.map((product) => (
              <TouchableOpacity key={product.id} style={styles.productCard}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                {product.discount && (
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{product.discount}</Text>
                  </View>
                )}
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>${product.price}</Text>
                <TouchableOpacity 
                  style={styles.addToCartButton}
                  onPress={() => handleAddToCart(product)}
                >
                  <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  } as ViewStyle,
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    backgroundColor: '#fff',
  } as ViewStyle,
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
  } as TextStyle,
  headerRight: {
    flexDirection: 'row',
    gap: 15,
  } as ViewStyle,
  iconButton: {
    padding: 8,
  } as ViewStyle,
  heroSection: {
    position: 'relative',
    height: 300,
  } as ViewStyle,
  heroSectionWeb: {
    height: 500,
    width: '100%',
    overflow: 'hidden',
  } as ViewStyle,
  heroImage: {
    width: '100%',
    height: '100%',
  } as ImageStyle,
  heroImageWeb: Platform.select({
    web: {
      objectFit: 'cover',
      width: '100vw',
      maxWidth: '100%',
    } as any,
    default: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
  }) as ImageStyle,
  heroContent: {
    position: 'absolute',
    bottom: 40,
    left: 20,
  } as ViewStyle,
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  } as TextStyle,
  heroSubtitle: {
    fontSize: 24,
    color: '#fff',
    marginTop: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  } as TextStyle,
  shopNowButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginTop: 15,
  } as ViewStyle,
  shopNowText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  } as TextStyle,
  categoriesContainer: {
    paddingHorizontal: 15,
    marginTop: 20,
  } as ViewStyle,
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  } as ViewStyle,
  activeCategoryButton: {
    backgroundColor: '#333',
  } as ViewStyle,
  categoryText: {
    fontSize: 16,
    color: '#333',
  } as TextStyle,
  activeCategoryText: {
    color: '#fff',
  } as TextStyle,
  productsSection: {
    paddingHorizontal: 20,
    marginTop: 30,
  } as ViewStyle,
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  } as TextStyle,
  productsContainer: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  } as ViewStyle,
  productCard: {
    width: width * 0.6,
    marginRight: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  } as ViewStyle,
  productImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  } as ImageStyle,
  discountBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ff3b30',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  } as ViewStyle,
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  } as TextStyle,
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    paddingHorizontal: 10,
  } as TextStyle,
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  } as TextStyle,
  addToCartButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  cartBadge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: '#FF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
