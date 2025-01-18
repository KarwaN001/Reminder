import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskPopup from '../components/TaskPopup';

const MainScreen = () => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [intervalTime, setIntervalTime] = useState('5');
  const [activeInterval, setActiveInterval] = useState('5');

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (todos.length > 0) {
        setIsPopupVisible(true);
        setCurrentTaskIndex((prevIndex) => (prevIndex + 1) % todos.length);
      }
    }, parseInt(activeInterval) * 1000);

    return () => clearInterval(interval);
  }, [todos, activeInterval]);

  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem('todos');
      if (storedTodos !== null) {
        setTodos(JSON.parse(storedTodos));
      }
    } catch (error) {
      console.error('Error loading todos:', error);
    }
  };

  const handleAddTodo = async () => {
    if (todo.trim().length > 0) {
      const newTodos = [...todos, { id: Date.now().toString(), text: todo }];
      setTodos(newTodos);
      setTodo('');
      try {
        await AsyncStorage.setItem('todos', JSON.stringify(newTodos));
      } catch (error) {
        console.error('Error saving todo:', error);
      }
    }
  };

  const handleDeleteTodo = async (id) => {
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(newTodos));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleIntervalSubmit = () => {
    const newInterval = parseInt(intervalTime);
    if (!isNaN(newInterval) && newInterval > 0) {
      setActiveInterval(intervalTime);
    } else {
      setIntervalTime(activeInterval);
    }
  };

  return (
    <View style={styles.container}>
      <TaskPopup
        visible={isPopupVisible}
        title={todos[currentTaskIndex]?.text || ''}
        onDismiss={() => setIsPopupVisible(false)}
      />
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={todo}
          onChangeText={setTodo}
          placeholder="Add a new todo"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style={styles.todoText}>{item.text}</Text>
            <TouchableOpacity
              onPress={() => handleDeleteTodo(item.id)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.timerContainer}>
        <Text style={styles.timerLabel}>Popup Interval (seconds):</Text>
        <TextInput
          style={styles.timerInput}
          value={intervalTime}
          onChangeText={setIntervalTime}
          keyboardType="numeric"
          placeholder="Enter seconds"
        />
        <TouchableOpacity 
          style={styles.timerSubmitButton}
          onPress={handleIntervalSubmit}
        >
          <Text style={styles.timerSubmitText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  todoText: {
    flex: 1,
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    marginTop: 'auto',
  },
  timerLabel: {
    fontSize: 16,
    marginRight: 10,
    color: '#333',
    flex: 1,
  },
  timerInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 80,
    fontSize: 16,
    textAlign: 'center',
    marginRight: 10,
  },
  timerSubmitButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  timerSubmitText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default MainScreen; 