import { useState } from "react";

import { View, Text, FlatList, Alert } from "react-native";
import { styles } from "./styles";

import { Header } from "../components/Header";
import { Task } from "../components/Task";
import { TaskDTO } from "../dtos/TaskDTO";
import { Empty } from "../components/Empty";
import { uuid } from "../utils/uuid";

export function HomeScreen() {
  const [tasks, setTasks] = useState<TaskDTO[]>([])
  const [newTask, setNewTask] = useState('')

  function handleTaskAdd() {
    if(newTask !== '' && newTask.length >= 5) {
      setTasks((tasks) => [
        ...tasks,
        {id: uuid(), isCompleted: false, title: newTask.trim()}
      ])
      setNewTask('')
    }
  }

  function handleTAskDone(id: string) {
    setTasks((task) => task.map(
      (task) => {
        task.id === id 
        ? (task.isCompleted = !task.isCompleted)
        : null
        return task
      }
    ))
  }
  function handleTaskDeleted(id: string){
    Alert.alert('Excluir tarefa', 'Deseja excluir essa tarefa?', 
    [
      {
        text: 'Sim',
        style: 'default',
        onPress: () => setTasks((tasks) => 
          tasks.filter((task) => task.id !== id
        ))
      },
      {
        text: 'Não',
        style: 'cancel',
      }
    ])
  }

  const totalTasksCreated = tasks.length
  const totalTasksCompleted = tasks.filter(({isCompleted}) => isCompleted).length
  
  return(
    <View style={styles.container}>
      <Header 
        task={newTask} 
        onChangeText={setNewTask}
        onPress={handleTaskAdd}
      />
      <View style={styles.tasksContainer}>
        <View style={styles.info}>
          <View style={styles.row}>
            <Text style={styles.tasksCreated}>Criadas</Text>
            <View style={styles.counterContainer}>
              <Text style={styles.counterText}>
                {totalTasksCreated}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.tasksDone}>Concluídas</Text>
            <View style={styles.counterContainer}>
              <Text style={styles.counterText}>{totalTasksCompleted}</Text>
            </View>
          </View>
        </View>

        <FlatList 
          data={tasks}
          keyExtractor={(tasks) => tasks.id}
          renderItem={({item}) => (
          <Task 
            key={item.id}
            onTaskDone={() => handleTAskDone(item.id)}
            onTaskDeleted={() => handleTaskDeleted(item.id)} 
            {...item}
          />
          )}
          ListEmptyComponent={<Empty/>}
        />

      </View>
  
    </View>
  )
}