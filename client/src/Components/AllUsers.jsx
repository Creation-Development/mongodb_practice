import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { CircularProgress } from '@mui/material';


export default function AllUsers() {
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    axios.get("http://localhost:5000/all-user")
      .then((res) => {
        setUsers(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

const deleteUser = (e,email) => {
  axios.post("http://localhost:5000/delete-user",{email})
  .then((res) => {
    alert("user deleted")
  })
  .catch((err) => {
    console.log(err);
  })
}

  return (
    <div className="container my-4">
      <h2 className="text-danger text-center my-4">All User Data</h2>{
        users.length == 0 ?
          <div className="text-center">
            <CircularProgress color="success" />
          </div>
          :
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="text-primary" align="center"><b style={{ fontSize: "17px" }}>User Id</b></TableCell>
                  <TableCell className="text-primary" align="center"><b style={{ fontSize: "17px" }}>Profile Picture</b></TableCell>
                  <TableCell className="text-primary" align="center"><b style={{ fontSize: "17px" }}>Full Name</b></TableCell>
                  <TableCell className="text-primary" align="center"><b style={{ fontSize: "17px" }}>Email Address</b></TableCell>
                  <TableCell className="text-primary" align="center"><b style={{ fontSize: "17px" }}>Mobile Number</b></TableCell>
                  <TableCell className="text-primary" align="center"><b style={{ fontSize: "17px" }}>Password</b></TableCell>
                  <TableCell className="text-primary" align="center"><b style={{ fontSize: "17px" }}>Created Time</b></TableCell>
                  <TableCell className="text-primary" colSpan={2} align="center"><b style={{ fontSize: "17px" }}>Action</b></TableCell>
                  <TableCell className="text-primary" align="center"><button className="btn btn-primary" onClick={(e)=>(window.location = "/add-user")}><i class="fa fa-plus" aria-hidden="true"></i></button></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((row, index) => (
                  <TableRow
                    key={row.index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center"><img style={{borderRadius:"50px"}} alt="" src={`http://localhost:5000/${row.pic}`} width={"55px"} height={"55px"}/></TableCell>
                    <TableCell align="center">{row.fullname}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.phone}</TableCell>
                    <TableCell align="center">{row.pass}</TableCell>
                    <TableCell align="center">{row.createdAt.slice(0,10)}</TableCell>
                    <TableCell align="center"><button className="btn btn-success" onClick={(e)=>{window.location = `/update-user/${index}/${row._id}`}}><i class="fa fa-pencil" aria-hidden="true"></i></button></TableCell>
                    <TableCell align="center"><button className="btn btn-danger" onClick={(e)=>{deleteUser(e,row.email); window.location = "/all-user"}}><i class="fa fa-trash-o" aria-hidden="true"></i></button></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      }
    </div>
  );
}

