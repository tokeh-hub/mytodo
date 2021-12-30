import React from 'react'
import {FaTrashAlt} from 'react-icons/fa'
import {FiEdit2} from 'react-icons/fi'
export default function Todo({todo,deleteFunction,editFunction}) {
    return (
        <article className='todo'>
            <p>{todo.name}</p>
            <div className='btns'>
            <button className='btn-2 btn' onClick={() => editFunction(todo.id)}><FiEdit2/></button>
            <button className='btn' onClick={()=>deleteFunction(todo.id)}><FaTrashAlt/></button>
            </div>
        </article>
    )
}
