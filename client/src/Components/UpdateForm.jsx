import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const UpdateForm = () => {
  const { id } = useParams()
  const { index } = useParams()
  const [user, setUser] = useState([]);
  const [pic, setpic] = useState([]);
  const [data, setdata] = useState([])
  // console.log(user);
  // console.log(`http://localhost:5000/update-user/${id}`);

  useEffect(() => {
    axios.get("http://localhost:5000/all-user")
      .then((res) => {
        setUser(res.data[index])
        setdata(res.data)
      })
  }, []);

  var sendData = (data) => {
    axios.post(url, data)
      .then(res => {
        alert('Data Updates successfully...!!')

      })
      .catch(err => console.log(err))
  }

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

      var value = new FormData
      value.append("name", fullname)
      value.append("email", email)
      value.append("phone", phone)
      value.append("pass", pass)
      value.append("conpass", conpass)
      for (let i = 0; i < pic.length; i++) {
        value.append("pic", pic[i])
      }
      console.log(value);
      sendData(value)
      window.location = "/all-user"  
    }
  }

  var url = `http://localhost:5000/update-user/${id}`


  const handleImageDelete = (e, imgIndex) => {
    e.preventDefault()
    axios.delete(`http://localhost:5000/update-user/${id}/${imgIndex}`)
      .then((value) => {
        console.log("delete");
      })
      .catch((err) => {
        console.log(err);
      })
    window.location = `/update-user/${index}/${id}`
  }

  return (
    <>
      {
        user.pic !== undefined ?
          <>
            < div className="container my-4">
              <h2 className="text-center text-danger">Update User Profile Data</h2>
              <form action="" encType='multipart/form-data'>
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
                {user.pic.length == 0 ?
                  <div className="my-4 w-50" style={{ marginLeft: "25%" }}>
                    <input type="file" onChange={(e)=>(setpic(e.target.files))} className="form-control" id="pic" multiple />
                  </div> :
                  null}
                <div style={{ marginLeft: "25%" }} className="my-4 w-50">
                  {
                    user.pic.map((path, index) => (
                      <>
                        <img className='mx-4' src={path.url} height={"100px"} width={"100px"} />
                        <button className="btn btn-sm btn-danger" onClick={(e) => (handleImageDelete(e, index))}><i class="fa fa-trash" aria-hidden="true"></i></button>
                      </>
                    ))
                  }
                </div>
                <div className="form-floating my-4 w-50" style={{ marginLeft: "25%" }}>
                  <input type="password" className="form-control" id="pass" defaultValue={user.pass} placeholder="Enter your Password" />
                  <label for="floatingInput">Password</label>
                </div>
                <div className="form-floating my-4 w-50" style={{ marginLeft: "25%" }}>
                  <input type="password" className="form-control" id="conpass" defaultValue={user.pass} placeholder="Enter your Confirm Password" />
                  <label for="floatingInput">Confirm Password</label>
                </div>
                <button onClick={(e) => (validation(e))} className="btn btn-success w-50" style={{ marginLeft: "25%" }}>Update Data</button>
              </form>
            </div>
          </>
          :
          null
      }
    </>
  )
}

export default UpdateForm
