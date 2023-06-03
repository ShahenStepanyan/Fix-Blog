import axios from 'axios';
import React from 'react'
import { useEffect , useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {apiInfo} from "../../api/Api";
import Header from "../../components/Header/Header";



function Update() {

    const {id} = useParams();

    const [inputData, setInputData] = useState({
        id: id,
        title: '',
        body: ''
    })
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3002/post/'+id)
        .then(res => setInputData(res.data))
        .catch(err => console.log(err))
    }, [id])

    const handleSubmit = (event) => {
        event.preventDefault();
        apiInfo(inputData, navigate, "put", id)
    }


  return (
    <div >
        <Header/>
        <div >
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="id">ID:</label>
                    <input type="number" disabled name='id' value={inputData.id}
                    />
                </div>
                <div>
                    <label htmlFor="name">Title</label>
                    <input required type="text" name='name'  value={inputData.title}
                    onChange={e => setInputData({...inputData, title: e.target.value})}/>
                </div>
                <div>

                    <label htmlFor="email">Body</label>
                    <input required type="text" name='email'  value={inputData.body}
                    onChange={e => setInputData({...inputData, body: e.target.value})}/>
                </div><br />
                <button >Update</button>
            </form>
        </div>
    </div>
  )
}

export default Update