import axios from "axios";


export const apiInfo = (inputData, navigate, met, user = '/') => {
    
    axios({
        url: `http://localhost:3002/post/` + user,
        method: met,
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
