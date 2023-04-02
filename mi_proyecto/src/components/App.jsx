import React, { useState } from 'react'
import {Container, Form, FormControl, FormGroup, Button, ListGroup, ListGroupItem} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export const TodoList = () => {
    const titulo = "Mi to do list"
    
    const [task, setTask] = useState([])
    const [inputValue, setInput] = useState('')
    const [count, setCount] = useState(0)
    
    const handleInputChange = (event)=>{
        setInput(event.target.value)
    }

    const addTask = (e)=>{
        e.preventDefault()

        if(inputValue.trim() !== ''){
            setTask([...task, {name: inputValue, completed: false}])
            setInput('')
            setCount(count+1)
        }
    }   

    const handleTaskClick = (index) =>{
        const copiaTask = [...task]     //copio todo el array porque la hook es una const y no puedo cambiar su contenido

        copiaTask[index].completed = !copiaTask[index].completed
        setTask(copiaTask)
        
        if(copiaTask[index].completed==false)
        {
            setCount(count+1)
        }
        else 
        {
        if (count!=0)
            setCount(count-1)
        }
    }

    return (
        <Container className='text-center my-5'>

            <h1>{titulo}</h1>

            <Form onSubmit={addTask}>
                <FormGroup>
                    <FormControl type='text' placeholder='Escriba una tarea aquí...' value={inputValue} onChange={handleInputChange}>
                    </FormControl>
                    <Button variant='secondary' type='submit'> Agregar tarea </Button>
                </FormGroup>    
            </Form>

            <ListGroup>
                {
                    task.map((task, index) => (
                        <ListGroupItem className={`${task.completed ? 'text-decoration-line-through' : ''}`}onClick={() => {handleTaskClick(index)}} key={index}>
                            {task.name}
                        </ListGroupItem>
                    ))
                }
            </ListGroup>

                <div>{"Cantidad de tareas pendientes: " + count}</div>

        </Container>        
    )
}