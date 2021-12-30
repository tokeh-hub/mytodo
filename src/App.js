import React, { useState, useEffect } from 'react'
import './todo.css';
import Todo from './Todo';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


function addTodo(name) {
  return { name: name, id: Date.now(), delete: false, complete: false }
}

const getLocalStorage = () => {
  let list = localStorage.getItem('todos');
  if (list) {
    return JSON.parse(list)
  }
  else {
    return []
  }
}
function TodoApp() {
  const [todos, setTodos] = useState(getLocalStorage())
  const [name, setName] = useState('');
  const [isEdit, setIsEdit] = useState(false)
  const [editID, setEditID] = useState(null)
  const [update, setUpdate] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) { return; }
    if (name && isEdit) {
      setTodos(
        todos.map(item => {
          if (item.id === editID) {
            return { ...item, name: name }
          }
          return item
        })
      )
      setName('');
      setEditID(null);
      setIsEdit(false);
    }
    else {
      setTodos([...todos, addTodo(name)])
      setName('')

    }
  }
  const deleteFunction = (id) => {
    const filtered = todos.filter(item => item.id !== id)
    setTodos(filtered)
    console.log(todos.length)
  }
  const editFunction = (id) => {
    const particularItem = todos.find(item => item.id === id)
    setIsEdit(true)
    setEditID(id)
    setName(particularItem.name)
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    setUpdate(todos.length)
  }, [todos])

  return (
    <Container className='p-3'>
      <h2>My Todo-List</h2>
      <Form onSubmit={handleSubmit} className='mt-5'>
        <Row >
          <Col lg='8' xs='8'>
            <Form.Control className='p-4 mt-2' type='text' placeholder='Add todo...' autoFocus={true} value={name} onChange={e => setName(e.target.value)}></Form.Control>
          </Col>
          <Col lg='4' xs='4' >
            <Button variant="primary" className='mt-2 p-2' type="submit" style={{height:'50px'}}>
              {isEdit ? 'Edit' : 'Add'}
            </Button>
          </Col>
        </Row>
      </Form>
      <div className='todos mt-5'>
        {todos.map(todo => {
          return <Todo todo={todo} key={todo.id} deleteFunction={deleteFunction} editFunction={editFunction} />
        })}
      </div>

      <p className={update ? 'update show' : 'update'}>{todos ? update : 'No'} items remaining</p>
    </Container>
  );
}

export default TodoApp;

