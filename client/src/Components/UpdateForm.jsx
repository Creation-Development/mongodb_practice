import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const UpdateForm = () => {
    const { id } = useParams()
    const { index } = useParams()
    const [user, setUser] = useState([]);
    const [data, setdata] = useState([])
    console.log(user);

    useEffect(() => {
        axios.get("http://localhost:5000/all-user")
        .then((res) => {
            setUser(res.data[index])
            setdata(res.data)
        })
    }, []);

    const validation = (e) => {
        e.preventDefault()

        var fullname = document.getElementById("name").value
        var email = document.getElementById("email").value
        var phone = document.getElementById("phone").value
        var pass = document.getElementById("pass").value
        var conpass = document.getElementById("conpass").value
    
        if (fullname === "" || email === "" || phone === "" || pass === "" || conpass === "") {
          alert("fields can not Empty...!!")
        }
        else if (!(/[a-zA-Z]{5}/).test(fullname)) {
          alert("Name is not valid...!!")
        }
        else if (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/).test(email)) {
          alert("email is not valid...!!")
        }
        else if (!(/[0-9]{10}/).test(phone)) {
          alert(" mobile number is invalid")
        }
        else if (!(/[a-zA-Z0-9]{8}/).test(pass)) {
          alert("Password must be more then or equal to 8 character")
        }
        else if (pass !== conpass) {
          alert("password Does't Match try again..")
        }
        else {
          var value = [{id:id},{ "fullname": fullname, "email": email, "phone": phone, "pass": pass, "conpass": conpass }]
          console.log(value);
          sendData(value)
          window.location = "/all-user"
        }
      }

 var url = "http://localhost:5000/update-user"
      var sendData = (data) => {
        axios.post(url, data)
          .then(res => {
            alert('Data Updates successfully...!!')
            
          })
          .catch(err => console.log(err))
      }


    return (
        <div className="container my-4">
            <h2 className="text-center text-danger">Update User Profile Data</h2>
            <form action="">
                <div className="form-floating my-4 w-50" style={{ marginLeft: "25%" }}>
                    <input type="text" className="form-control" id="name" defaultValue={user.fullname} placeholder="Enter your Full Name" />
                    <label for="floatingInput">Full Name</label>
                </div>
                <div className="form-floating my-4 w-50" style={{ marginLeft: "25%" }}>
                    <input type="email" className="form-control" id="email" defaultValue={user.email} placeholder="Enter your 1email Address" />
                    <label for="floatingInput">Email Address</label>
                </div>
                <div className="form-floating my-4 w-50" style={{ marginLeft: "25%" }}>
                    <input type="number" className="form-control" id="phone" defaultValue={user.phone} placeholder="Enter your Mobile Number" />
                    <label for="floatingInput">Mobile Number</label>
                </div>
                <div className="form-floating my-4 w-50" style={{ marginLeft: "25%" }}>
                    <input type="password" className="form-control" id="pass" defaultValue={user.pass} placeholder="Enter your Password" />
                    <label for="floatingInput">Password</label>
                </div>
                <div className="form-floating my-4 w-50" style={{ marginLeft: "25%" }}>
                    <input type="password" className="form-control" id="conpass" defaultValue={user.conpass} placeholder="Enter your Confirm Password" />
                    <label for="floatingInput">Confirm Password</label>
                </div>
                <button onClick={(e)=>(validation(e))} className="btn btn-success w-50" style={{ marginLeft: "25%" }}>Update Data</button>
            </form>
        </div>
    )
}

export default UpdateForm
