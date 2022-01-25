import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import axios from "axios"



export default function SignUp() {
  const [name, setname] = useState("")
  const [data, setdata] = useState([])
  const [email, setemail] = useState("")
  const [phone, setphone] = useState("")
  const [pic, setpic] = useState()
  const [pass, setpass] = useState("")
  const [conpass, setconpass] = useState("")
  const url = "http://localhost:5000/add"
  var value = {}

  React.useEffect(() => {
    axios.get("http://localhost:5000/all-user")
      .then((item) => (
        setdata(item.data)
      ))
  }, [])



  var sendData = (data) => {
    const dat = new FormData()

    dat.append("name", name)
    dat.append("email", email)
    dat.append("phone", phone)
    dat.append("pass", pass)
    for (let i = 0; i < pic.length; i++) {
      dat.append("pic", pic[i])
    };
    axios.post(url, dat)
      .then(res => {
        alert('Data send successfully...!!')
        window.location = "/all-user"
      })
      .catch(err => console.log(err))
  }

  const validation = (e, name, email, phone, pic, conpass, pass) => {
    e.preventDefault()
    var emaildata = []
    if (data.length === 0) {
      emaildata = []
    }
    else {
      data.map((item) => (
        emaildata.push(item.email)
      ))
    }

    if (name === "" || email === "" || phone === "" || pass === "" || conpass === "") {
      alert("fields can not Empty...!!")
    }
    else if (!(/[a-zA-Z]{5}/).test(name)) {
      alert("Name is not valid...!!")
    }
    else if (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/).test(email)) {
      alert("email is not valid...!!")
    }
    else if (emaildata.includes(email)) {
      alert("email is already exist..!!")
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
      value = { "name": name, "email": email, "phone": phone, "pic": pic, "pass": pass, "conpass": conpass }
      sendData(value)
    }
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Registration Form
        </Typography>
        <Box noValidate sx={{ my: 10 }}>
          <form action="" method="post" encType='multipart/form-data'>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="fullname"
                  required
                  fullWidth
                  onChange={(e) => (setname(e.target.value))}
                  id="name"
                  label="Full Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  onChange={(e) => (setemail(e.target.value))}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  onChange={(e) => (setphone(e.target.value))}
                  label="Mobile Number"
                  type="number"
                  id="phone"
                  autoComplete="number"
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  required
                  fullWidth
                  name="avtar"
                  onChange={(e) => (setpic(e.target.files))}
                  label="Profile Pic"
                  type="file"
                  id="pic"
                  multiple
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="pass"
                  onChange={(e) => (setpass(e.target.value))}
                  label="Password"
                  type="password"
                  id="pass"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="conpass"
                  onChange={(e) => (setconpass(e.target.value))}
                  label="Confirm Password"
                  type="password"
                  id="conpass"
                  autoComplete="confirm-password"
                />
              </Grid>
            </Grid>
            <button
              className='btn btn-success my-4 w-100'
              type="submit"
              onClick={(e) => validation(e, name, email, phone, pic, conpass, pass)}
            >
              Sign Up
            </button>
          </form>
        </Box>
      </Box>
    </Container>
  );
}