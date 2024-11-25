import React from 'react';
import {Button,Table} from 'react-bootstrap';
import './List.scss'

const List = () => {
  return (
    <div className="ListStart"  style={{overflowX:'auto'}} > 
    <h1 className="open-sans Tableh1"> Students Registerd to the Program</h1>
      <Table hover striped bordered>
        <thead>
          <tr>
    <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
           <td>Vincent</td>
            <td>MajeVincent@gmail.com</td>
            <td><span><Button >Edit</Button></span><span><Button className="ListButton">View</Button></span></td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default List