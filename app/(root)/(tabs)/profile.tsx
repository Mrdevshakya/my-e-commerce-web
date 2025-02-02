import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface OrderType {
  id: string;
  date: string;
  status: string;
  total: number;
}

const ProfileScreen = () => {
  const [user] = useState({
    name: 'Dev Shakya',
    email: 'devshakya666@gmail.com',
    avatar: 'https://via.placeholder.com/100',
    memberSince: 'January 2025',
  });

  const [recentOrders] = useState<OrderType[]>([
    {
      id: '#ORD001',
      date: '2025-01-25',
      status: 'Delivered',
      total: 149.99,
    },
    {
      id: '#ORD002',
      date: '2025-01-20',
      status: 'In Transit',
      total: 89.99,
    },
  ]);

  const ProfileSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  const MenuButton = ({ icon, title, onPress }: { icon: string; title: string; onPress: () => void }) => (
    <TouchableOpacity style={styles.menuButton} onPress={onPress}>
      <Ionicons name={icon as any} size={24} color="#333" />
      <Text style={styles.menuButtonText}>{title}</Text>
      <Ionicons name="chevron-forward" size={24} color="#999" />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <Text style={styles.memberSince}>Member since {user.memberSince}</Text>
        </View>
      </View>

      {/* Recent Orders */}
      <ProfileSection title="Recent Orders">
        {recentOrders.map((order) => (
          <View key={order.id} style={styles.orderItem}>
            <View>
              <Text style={styles.orderId}>{order.id}</Text>
              <Text style={styles.orderDate}>{order.date}</Text>
            </View>
            <View>
              <Text style={styles.orderStatus}>{order.status}</Text>
              <Text style={styles.orderTotal}>${order.total}</Text>
            </View>
          </View>
        ))}
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All Orders</Text>
        </TouchableOpacity>
      </ProfileSection>

      {/* Quick Actions */}
      <ProfileSection title="Account Settings">
        <MenuButton icon="location-outline" title="Saved Addresses" onPress={() => {}} />
        <MenuButton icon="card-outline" title="Payment Methods" onPress={() => {}} />
        <MenuButton icon="heart-outline" title="Wishlist" onPress={() => {}} />
        <MenuButton icon="notifications-outline" title="Notifications" onPress={() => {}} />
        <MenuButton icon="settings-outline" title="Settings" onPress={() => {}} />
        <MenuButton icon="help-circle-outline" title="Help & Support" onPress={() => {}} />
      </ProfileSection>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userInfo: {
    marginLeft: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  memberSince: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  orderId: {
    fontSize: 16,
    fontWeight: '500',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  orderStatus: {
    fontSize: 14,
    color: '#4CAF50',
    textAlign: 'right',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 4,
    textAlign: 'right',
  },
  viewAllButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 16,
    color: '#333',
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuButtonText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 16,
  },
  logoutButton: {
    margin: 16,
    padding: 16,
    backgroundColor: '#ff4444',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
