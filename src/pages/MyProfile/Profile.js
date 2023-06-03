import * as React from "react";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import {apiInfo} from "../../api/Api";
import { useNavigate} from 'react-router-dom';
export default function Profile() {
    const navigate = useNavigate();

  const name = useSelector(function (state) {
    return state.currentUser.name;
  });
  const id = useSelector(function (state) {
    return state.currentUser.id;
  });
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
    date: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/user/" + id)
      .then((res) => setInputData(res.data))
      .catch((err) => console.log(err));
  }, [name]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
        url: "http://localhost:3001/user/" + id,
        method: "put",
        header: {
            "Content-Type": "application/json"
        },
        data: inputData
    }).then(res => {
        console.log(inputData)
        alert("Data Updated Successfully!")
         navigate('/home')
    })
}


  return (
    <form >
      <div>
        <div>
          <h2>Date Account</h2>
          <h4>{inputData.date}</h4>
        </div>
        
        <div>
          
          <h2>UserEmail</h2>
          <input required type="text" value={inputData.email}
          onChange={e => setInputData({...inputData, email: e.target.value})}
          />
          <Button onClick={handleSubmit} variant='outlined'>
            <ChangeCircleIcon />
          </Button>
        </div>
        <div>
          <h2>Password</h2>
            <input required type="text" value={inputData.password}
            onChange={e => setInputData({...inputData, password: e.target.value})}
            />
          <Button onClick={handleSubmit}  variant='outlined'>
            <ChangeCircleIcon />
          </Button>
        </div>
      </div>
    </form>
  );
}