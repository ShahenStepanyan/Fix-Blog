import axios from "axios";
import React from "react";
import '../../App.css'
import { useState ,  } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate,  useSearchParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Header from "../../components/Header/Header";
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  active: {
    backgroundColor: "blue"
  }
})

function Home() {
  const classes = useStyles()
  
  const [pageInfo, setPageInfo] = useSearchParams();
  const name = useSelector(function (state) {
    return state.currentUser.name;
  });
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3002/post")
      .then((res) => {
        return setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function tesdel(value) {
    if (name === value) {
      return false;
    } else {
      return true;
    }
  }
  const [currentPage, setCurrentPage] = useState(localStorage.getItem(pageInfo));
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  return (
    <div className='container '>
      <Header/>
      <h2>Blog</h2>
      <Link to='/create'>Add Post +</Link>
      
        
       
          {records.map((d, i) => (
            <div key={i}>
              <Card sx={{ maxWidth: 700 }}>
                <CardMedia image={undefined} alt='green iguana' height='140' 
                  title="Profile Image"
                  className={undefined}
                  component='div'
                />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    <Link
                      style={{ color: "black", textDecoration: "none" }}
                      to={`/read/${d.id}`}
                    >
                      {d.title}
                    </Link>
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {d.body}
                  </Typography>
                </CardContent>
              </Card>
             
                <Stack spacing={1} direction='row'>
                  <Button disabled={tesdel(d.creator)} variant='outlined'>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/update/${d.id}`}
                    >
                      Edit
                    </Link>
                  </Button>

                  <span> </span>

                  <Button
                    disabled={tesdel(d.creator)}
                    variant='outlined'
                    onClick={(e) => handleDelete(d.id)}
                  >
                    Delete
                  </Button>
                </Stack>
              </div>
          ))}
       
      <nav style={{ marginTop: "25px", marginBottom: "25px" }}>
        <ul className="pagination">
          {numbers.map((n, i) => {
            return (
              <div key={i} className="cont">
                
                <li 
                 className={`${currentPage === n ? classes.active : 'norm'}`}
                 style={{width: "70px", cursor: "pointer", height: "30px", borderRadius: "5%"}}
                  key={i}
                  
                  onClick={() => {
                    setPageInfo({page: n})
                    localStorage.setItem("pageinfo", n)
                    console.log(localStorage.getItem("pageinfo"))
                    changeCPage(n)
                  }}
                >
                  <span>{n}</span>
                </li>
                 
                
                
              </div>
            );
          })}
        </ul>
      </nav>
    </div>
  );

  function handleDelete(id) {
    const confirm = window.confirm("Do you like to Delete?");
    if (confirm) {
      axios.delete("http://localhost:3002/post/" + id).then((res) => {
        alert("Record Deleted");
        navigate("/home");
        window.location.reload();
      });
    }
  }
  function changeCPage(id) {
    setCurrentPage(id);
  }
}
export default Home;