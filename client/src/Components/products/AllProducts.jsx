import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { Avatar, AvatarGroup, CircularProgress } from '@mui/material';


export default function AllProducts() {
    const [products, setProducts] = React.useState([]);
    React.useEffect(() => {
        axios.get("http://localhost:5000/product/all")
            .then((res) => {
                setProducts(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    // const deleteUser = (e,email) => {
    //   axios.post("http://localhost:5000/delete-user",{email})
    //   .then((res) => {
    //     alert("user deleted")
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    // }

    return (
        <div className="container my-4">
            <h2 className="text-danger text-center my-4">All Products</h2>{
                products.length == 0 ?
                    <div className="text-center">
                        <CircularProgress color="success" />
                    </div>
                    :
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="text-primary" align="center"><b style={{ fontSize: "17px" }}>Product Id</b></TableCell>
                                    <TableCell className="text-primary" align="center"><b style={{ fontSize: "17px" }}>Product Image</b></TableCell>
                                    <TableCell className="text-primary" align="center"><b style={{ fontSize: "17px" }}>Product Name</b></TableCell>
                                    <TableCell className="text-primary" align="center"><b style={{ fontSize: "17px" }}>Product Price</b></TableCell>
                                    <TableCell className="text-primary" align="center"><b style={{ fontSize: "17px" }}>Description</b></TableCell>
                                    <TableCell className="text-primary" align="center"><b style={{ fontSize: "17px" }}>Created Time</b></TableCell>
                                    <TableCell className="text-primary" colSpan={3} align="center"><b style={{ fontSize: "17px" }}>Action</b></TableCell>
                                    <TableCell className="text-primary" align="center"><button className="btn btn-primary" onClick={(e) => (window.location = "/product/add")}><i class="fa fa-plus" aria-hidden="true"></i></button></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.map((row, index) => (
                                    <TableRow
                                        key={row.index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center" component="th" scope="row">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell align="center">
                                        <Avatar style={{marginLeft:"50px"}} src={`http://localhost:5000/${row.pic[0]}`} />
                                        </TableCell>
                                        <TableCell align="center">{row.name}</TableCell>
                                        <TableCell align="center">{row.price}</TableCell>
                                        <TableCell align="center">{row.desc}</TableCell>
                                        <TableCell align="center">{row.createdAt.slice(0, 10)}</TableCell>
                                        <TableCell align="center"><button className="btn btn-warning" onClick={(e) => { window.location = `/product/view/${index}` }}><i class="fa fa-eye" aria-hidden="true"></i></button></TableCell>
                                        <TableCell align="center"><button className="btn btn-success" onClick={(e) => { window.location = `/update-product/${index}/${row._id}` }}><i class="fa fa-pencil" aria-hidden="true"></i></button></TableCell>
                                        <TableCell align="center"><button className="btn btn-danger" onClick={(e) => { window.location = "/product/all" }}><i class="fa fa-trash-o" aria-hidden="true"></i></button></TableCell>
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

