import React from "react";
import { useState } from "react";

import { useSelector } from "react-redux";
import { apiInfo } from "../../api/Api";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";

function Create() {
  const navigator = useNavigate();
  const name = useSelector(function (state) {
    return state.currentUser.name;
  });
  const [inputData, setInputData] = useState({
    title: "",
    body: "",
    creator: name,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    apiInfo(inputData, navigator, "post");
  };
  return (
    <div>
      <Header/>
      <div style={{ textAlign: "center" }}>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='name'>title</label>
            <br />
            <input
              required
              type='text'
              name='title'
              onChange={(e) =>
                setInputData({ ...inputData, title: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor='text'>body</label>
            <br />
            <input
              required
              type='text'
              name='body'
              onChange={(e) =>
                setInputData({ ...inputData, body: e.target.value })
              }
            />
          </div>
          <br />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Create;