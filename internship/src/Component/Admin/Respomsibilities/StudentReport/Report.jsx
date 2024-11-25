import React from 'react';
import {Button,Table} from 'react-bootstrap';
 

const Report = () => {
  return (
    <div className="ListStart"  > 
     <h1 className="open-sans Tableh1"> Students Registerd Report Building</h1>
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
            <td><Button >Report</Button></td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default Report