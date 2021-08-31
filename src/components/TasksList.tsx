import React from 'react';
import { FlatList, Image, TouchableOpacity, View, Text, FlatListProps } from 'react-native';
import { ItemWrapper } from './ItemWrapper';

import { TaskItem, Task, ChangeTaskData } from './TaskItem'; 
interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (taskData: ChangeTaskData) => void;
}

export function TasksList({ tasks, toggleTaskDone, removeTask, editTask }: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TaskItem 
              index={index}  
              editTask={editTask}
              item={item}
              removeTask={removeTask}
              toggleTaskDone={toggleTaskDone}
            />
          </ItemWrapper>
        )
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}
