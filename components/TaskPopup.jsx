import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';

const TaskPopup = ({ visible, title, onDismiss }) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <TouchableOpacity 
        style={styles.overlay}
        activeOpacity={1}
        onPress={onDismiss}
      >
        <View style={styles.popup}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Reminder</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: Dimensions.get('window').width * 0.85,
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    color: '#333',
    lineHeight: 28,
    marginBottom: 15,
  },
  dismissText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default TaskPopup; 