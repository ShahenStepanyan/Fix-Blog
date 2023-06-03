import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";

function Read() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3002/post/" + id)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className='container'>
      <Header/>
      <div className='container p-5'>
        <div style={{ border: "1px solid black" }}>
          <p>Title</p>
          <p>{Data.title}</p>
        </div>
        <div style={{ border: "1px solid black" }}>
          <p>Body</p>
          <p>{Data.body}</p>
        </div>

        <Link to='/home'>Back</Link>
      </div>
    </div>
  );
}

export default Read;
