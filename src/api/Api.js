import axios from "axios";


export const apiInfo = (inputData, navigate, met, id = '/') => {
    
    axios({
        url: "http://localhost:3002/post/" + id,
        method: met,
        header: {
            "Content-Type": "application/json"
        },
        data: inputData
    }).then(res => {
        alert("Data Updated Successfully!")
         navigate('/home')
    })
}
