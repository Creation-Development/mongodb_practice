import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import axios from "axios"



export default function AddProduct() {
  const [name, setname] = useState("")
  const [price, setprice] = useState("")
  const [desc, setdesc] = useState("")
  const [pic, setpics] = useState()
  const [inputList, setInputList] = useState([{ Fname: "", Fpic: {} }]);
// console.log(inputList);
  var sendData = () => {
    const data = new FormData()
    data.append("name", name)
    data.append("price", price)
    data.append("desc", desc)

    for (let i = 0; i < pic.length; i++) {
      data.append("pics",pic[i])
    }
    for (let i = 0; i < inputList.length; i++) {
      data.append("Fname",inputList[i].Fname)
      data.append("Fpic", inputList[i].Fpic)
    }

    axios.post("http://localhost:5000/product/add", data)
      .then(res => {
        alert('Data send successfully...!!')
        window.location = "/product/all"
      })
      .catch(err => console.log(err))
  }


  const validation = (e, name, price, desc, pic) => {
    e.preventDefault()
    if (name === "" || price === "" || desc === "" || pic === "") {
      alert("fields can not Empty...!!")
    }
    else {
      var value = { "name": name, "price": price, "desc": desc, "pics": pic}
      sendData()
    }
  }

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value, files } = e.target;
    const list = [...inputList];
    if (name == "Fpic") {
      list[index][name] = files[0];
    }
    else {
      list[index][name] = value;
    }
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { Fname: "", Fpic: {} }]);
  };

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
          Add New Product
        </Typography>
        <Box noValidate sx={{ my: 10 }}>
          <form action="" method="post" encType='multipart/form-data'>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  onChange={(e) => (setname(e.target.value))}
                  id="name"
                  label="Product Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="price"
                  onChange={(e) => (setprice(e.target.value))}
                  label="Product Price"
                  type="number"
                  name="price"
                  autoComplete="number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="desc"
                  onChange={(e) => (setdesc(e.target.value))}
                  label="Product Description"
                  id="desc"
                  autoComplete="text"
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  required
                  fullWidth
                  name="avtar"
                  onChange={(e) => (setpics(e.target.files))}
                  label="Product Pic"
                  type="file"
                  id="pics"
                  multiple
                />
              </Grid>
            </Grid>
            {inputList.map((x, i) => {
              return (
                <div className="box my-4">
                  <h5 className="text-center">Fearute - {i + 1}</h5>
                  <TextField
                    className='my-2'
                    required
                    fullWidth
                    name="Fname"
                    onChange={e => handleInputChange(e, i)}
                    label="Feature Name"
                    id="Fname"
                    autoComplete="text"
                  />
                  <input
                    className='my-2'
                    type="file"
                    required
                    fullWidth
                    name="Fpic"
                    onChange={e => handleInputChange(e, i)}
                    label="Feature Picture"
                    id="Fpic"
                    autoComplete="text"
                  />
                  <div className="btn-box">
                    {inputList.length !== 1 && <button
                      className="btn btn-sm btn-danger me-4"
                      onClick={() => handleRemoveClick(i)}><i class="fa fa-trash" aria-hidden="true"></i></button>}
                    {inputList.length - 1 === i && <button className='btn btn-success btn-sm' onClick={handleAddClick}><i class="fa fa-plus" aria-hidden="true"></i></button>}
                  </div>
                  <hr />
                </div>
              );
            })}
            <button
              className='btn btn-success my-4 w-100'
              type="submit"
              onClick={(e) => validation(e, name, price, desc, pic)}
            >
              Add Product
            </button> 
          </form>
        </Box>
      </Box>
    </Container>
  );
}