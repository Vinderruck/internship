import React from 'react';
import {Button,Table} from 'react-bootstrap';
 
 

const LeaveDetails = () => { 
  return (
    <div className="ListStart"  > 
     <h1 className="open-sans Tableh1">  Leave Approval Details</h1>
      <Table hover striped bordered>
        <thead>
          <tr>
            <th>Start</th>
            <th>End</th>
            <th>Reason</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Vincent</td>
            <td>MajeVincent@gmail.com</td>
            <td><span><Button >Approve</Button></span><span><Button className="ListButton">Decline</Button></span></td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default  LeaveDetails