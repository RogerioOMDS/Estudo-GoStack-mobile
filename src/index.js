import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text,  StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import api from './services/api.js'

export default function App()  {
    const [projects, setProject] = useState([])

    useEffect( () => {
        api.get('projects').then(response => {
                console.log(response.data)
                setProject(response.data) 
            })
    }, []);

    async function handleAddProject() {
        const response = await api.post('projects', {
            title: `Novo projeto ${Date.now()}`,
            owner: 'Rogerio'
        });

        setProject([...projects, response.data]);

    }


    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#7159c1"/>
            
            <SafeAreaView style={styles.container}>
            <FlatList 
                data={projects}
                keyExtractor={project => project.id}
                renderItem={({item:project}) => (<Text style={styles.project} >{project.title}</Text>)}
            />

            <TouchableOpacity 
                onPress={handleAddProject} 
                activeOpacity={0.6} 
                style={styles.button}
            > 
                <Text style={styles.buttonText}>Adicionar Projeto</Text>
            </TouchableOpacity>



            </SafeAreaView>

{/*             <View style={styles.container}>  
                {projects.map(project  => (
                    <Text style={styles.project} key={project.id}>{project.title}</Text>) 
                )}
            </View> */}
        </>)
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
/*         justifyContent: 'center',
        alignItems: 'center' */
    },

    title: {
        color: '#FFF',
        fontSize: 32,
        fontWeight: 'bold'
    },

    project: {
        color:'#FFF',
        fontSize: 30
    },

    button: {
        backgroundColor: '#FFF',
        margin: 20,
        height:50,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        fontWeight: 'bold',
        fontSize: 16
    }
})