import React, { useEffect, useRef, useState } from 'react';
import { View , TouchableOpacity, Text, Image, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png'
import penIcon from '../assets/icons/pen/pen.png'

export interface Task {
    id: number;
    title: string;
    done: boolean;
  }

export interface ChangeTaskData {
    taskId: number;
    taskNewTitle: string;
}

interface TasksItemProps {
   item: Task;
   index: number;
   toggleTaskDone: (id: number) => void;
   removeTask: (id: number) => void;
   editTask: (taskData: ChangeTaskData) => void;
}

export function TaskItem( { item, index, toggleTaskDone, removeTask, editTask } : TasksItemProps ) {
 
    const [isEditing, SetIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(item.title);

    const textInputRef = useRef<TextInput>(null)

    function handleStartEditing() {
        SetIsEditing(true);
    }

    function handleCancelEditing() {
        setNewTitle(item.title);
        SetIsEditing(false);
    }

    function handleSubmitEditing() {

        const data = {
            taskId: item.id,
            taskNewTitle: newTitle
        }

        editTask(data);
        SetIsEditing(false);
    }

    useEffect(() => {

        if (textInputRef.current) {
            
            if (isEditing) {
                textInputRef.current.focus();
            }
            else {
                textInputRef.current.blur();
            }

        }

    },[isEditing])

    return (

        <>
        
            <View>

                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(item.id)}
                >
                    <View 
                        style={item.done ? styles.taskMarkerDone : styles.taskMarker}
                        testID={`marker-${index}`}
                    >
                        { item.done && (
                        <Icon 
                            name="check"
                            size={12}
                            color="#FFF"
                        />
                        )}
                    </View>

                    <TextInput 
                        ref={textInputRef}
                        style={ item.done ? styles.taskTextDone : styles.taskText}
                        value={newTitle}
                        editable={isEditing}
                        onChangeText={setNewTitle}
                        onSubmitEditing={handleSubmitEditing}
                    />

                </TouchableOpacity>

            </View>

            <View style={styles.buttonsContainer}>

                <TouchableOpacity
                    testID={`trash-${index}`}
                    style={{ paddingHorizontal: 24 }}
                    onPress={ isEditing ? () => handleCancelEditing() : () => handleStartEditing() }
                >

                    {isEditing ? 
                    
                        <Icon 
                            name="x"
                            size={23}
                            color="#B2B2B2"
                        />

                        : 

                        <Image source={penIcon} />
                    }

                </TouchableOpacity>

                <View style={styles.verticalLine} />

                <TouchableOpacity
                    testID={`trash-${index}`}
                    style={{ 
                            paddingHorizontal: 24, 
                            opacity: isEditing ? .2 : 1
                          }}
                    onPress={() => removeTask(item.id)}
                    disabled={isEditing}
                >

                    <Image
                        source={trashIcon}
                    />

                </TouchableOpacity>

            </View>
        </>

    );

}

const styles = StyleSheet.create({
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 15,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    verticalLine: {
        width: 1,
        height: 24,
        backgroundColor: 'rgba(196, 196, 196, 0.24)',
    }
})