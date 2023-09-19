import express from "express"
import mysql from "mysql"
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"cameraservice",
})

con.connect(function(err) {
    if(err) {
        console.log("Error in Connection");
    } else {
        console.log("Connected");
    }
})

app.post('/login', (req, res) => {
  const sql = 'SELECT * FROM login WHERE email=? AND password=?';
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) {
      return res.json({ Status: 'Error', Error: 'Error in running query' });
    }
    if (result.length > 0) {
      const userId = result[0].id; // Assuming the user ID is stored in a column called 'id'
      return res.json({ Status: 'Success', userId: userId });
    } else {
      return res.json({ Status: 'Error', Error: 'Wrong Email or Password' });
    }
  });
});

app.post('/signup', (req, res) => {
  const sql = "INSERT INTO login (`id`,`userRole`,`email`,`username`,`mobileNumber`,`password`) VALUES (?)";
  const values=[
      req.body.Id,
      req.body.userRole,
      req.body.email,
      req.body.username,
      req.body.mobileNumber,
      req.body.password
  ]
  con.query(sql,[values],(err,data)=> {
      if(err) {
          return res.json("Error");
      }
      return res.json(data);
  })
})


app.post('/addServiceCenter', (req, res) => {
    const sql = "INSERT INTO servicecentermodel (`serviceCenterName`,`serviceCenterPhone`,`serviceCenterAddress`,`serviceCenterImageUrl`,`serviceCentermailId`,`serviceCenterCost`,`serviceCenterDescription`) VALUES (?)";
    const values=[
        req.body.addName,
        req.body.addNumber,
        req.body.addAddress,
        req.body.addImageUrl,
        req.body.addEmail,
        req.body.addServiceCost,
        req.body.addCentreDescription
    ]
    con.query(sql,[values],(err,data)=> {
        if(err) {
            return res.json({Error:"error inside the query"});
        }
        return res.json(data);
    })
})

app.post('/dashboard', (req, res) => {
  const { enterProductName, enterModelNo, enterDateOfPurchase, enterContactNumber, enterProblem, selectedSlot, serviceCenterId ,Id,UserId} = req.body;
  // Check if the selected slot is already booked for the service center
  con.query('SELECT * FROM productmodel WHERE availableSlots = ? AND serviceCenterId = ?', [selectedSlot, serviceCenterId], (err, results) => {
    if (err) {
      console.error('Error checking slot:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (results.length > 0) {
      res.status(400).json({ error: 'Slot already booked' });
      return;
    }
    const sql = "INSERT INTO productmodel (`id`,`productName`,`productModelNo`,`dateOfPurchase`,`contactNumber`,`problemDescription`,`availableSlots`,`serviceCenterId`,`UserId`) VALUES (?,?,?,?,?,?,?,?,?)";
    const values = [
      Id,
      enterProductName,
      enterModelNo,
      enterDateOfPurchase,
      enterContactNumber,
      enterProblem,
      selectedSlot,
      serviceCenterId,
      UserId
    ];
    con.query(sql, values, (err) => {
      if (err) {
        console.error('Error inserting product:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      res.status(200).json({ message: 'Product and slot booked successfully' });
    });
  });
});


app.get('/getdetails',(req,res)=>{
    const sql="SELECT * FROM servicecentermodel";
    con.query(sql,(err,result)=>{
        if(err) return res,json({Error:"Got an error in the sql"});
        return res.json({Status:"Success",Result:result})

    })
})

app.get('/servicecenter/:id', (req, res) => {
    const serviceCenterID = req.params.id;
    const sql = 'SELECT * FROM servicecentermodel WHERE serviceCenterID = ?';
    con.query(sql, [serviceCenterID], (err, result) => {
      if (err) {
        console.log(err);
        return res.json({ Status: 'Error', Message: 'Failed to fetch service center details' });
      }
      
      if (result.length === 0) {
        return res.json({ Status: 'Error', Message: 'Service center not found' });
      }
      
      const serviceCenter = result[0];
      return res.json({ Status: 'Success', Result: serviceCenter });
    });
  });

app.delete('/delete/:id',(req,res)=>{
    const serviceCenterID = req.params.id;
    const sql='DELETE FROM servicecentermodel WHERE serviceCenterID = ?';
    con.query(sql, [serviceCenterID], (err, result) => {
        if(err) return res.json({Error: "delete error in sql"});
        return res.json({Status: "Success"})
    })
})

  app.put('/update/:id', (req, res) => {
    const serviceCenterID = req.params.id;
    const {
      editName,
      editNumber,
      editAddress,
      editImageUrl,
      editEmail,
      editServiceCost,
      editCentreDescription,
    } = req.body;
  
    let sql = 'UPDATE servicecentermodel SET ';
    let values = [];
  
    if (editName) {
      sql += 'serviceCenterName = ?, ';
      values.push(editName);
    }
  
    if (editNumber) {
      sql += 'serviceCenterPhone = ?, ';
      values.push(editNumber);
    }
  
    if (editAddress) {
      sql += 'serviceCenterAddress = ?, ';
      values.push(editAddress);
    }
  
    if (editImageUrl) {
      sql += 'serviceCenterImageUrl = ?, ';
      values.push(editImageUrl);
    }
  
    if (editEmail) {
      sql += 'serviceCentermailId = ?, ';
      values.push(editEmail);
    }

    if (editServiceCost) {
      sql += 'serviceCenterCost = ?, ';
      values.push(editServiceCost);
    }
  
    if (editCentreDescription) {
      sql += 'serviceCenterDescription = ?, ';
      values.push(editCentreDescription);
    }
  
    // Remove the trailing comma and space from the SQL query
    sql = sql.slice(0, -2);
    sql += ' WHERE serviceCenterID = ?';
    values.push(serviceCenterID);
  
    con.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error updating service center:', err);
        return res.json({ Status: 'Error' });
      }
      return res.json({ Status: 'Success' });
    });
  });
  

 app.get('/bookings', (req, res) => {
    const sql = `
      SELECT s.serviceCenterName, p.id, DATE(p.availableSlots) AS date, TIME(p.availableSlots) AS time
      FROM productmodel p
      JOIN servicecentermodel s ON p.serviceCenterId = s.serviceCenterID
    `;
    con.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching bookings:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      const bookings = results.map((row) => ({
        id:row.id,
        serviceCenterName: row.serviceCenterName,
        date: row.date,
        time: row.time
      }));
  
      res.status(200).json({ bookings });
    });
  });

app.get('/bookings/:id', (req, res) => {
  const bookingId = req.params.id;
  const query = 'SELECT * FROM productmodel WHERE id = ?';
  con.query(query, [bookingId], (err, results) => {
    if (err) {
      console.error('Error retrieving booking: ', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'Booking not found' });
    } else {
      const booking = results[0];
      res.json({ ...booking, bookedSlots: booking.availableSlots }); // Include the bookedSlots field in the response
    }
  });
});

  app.delete('/bookings/:id', (req, res) => {
    const bookingId = req.params.id;
    // Implement your logic here to delete the booking from the database using the provided ID
    const query = 'DELETE FROM productmodel  WHERE id = ?';
    con.query(query, [bookingId], (err, result) => {
      if (err) {
        console.error('Error deleting booking: ', err);
        res.status(500).json({ error: 'Error deleting booking' });
        return;
      }
      if (result.affectedRows === 0) {
        // No booking was deleted, as no matching ID was found
        res.status(404).json({ error: 'Booking not found' });
        return;
      }
      // Booking successfully deleted
      res.json({ message: 'Booking deleted successfully' });
    });
  });
  
  app.put('/appointmentupdate/:id', (req, res) => {
    const id = req.params.id;
    const {
      editProductName,
      editModelNo,
      editDateOfPurchase,
      editContactNumber,
      enterProblem,
      selectedSlot
    } = req.body;
  
    let sql = 'UPDATE productmodel SET ';
    let values = [];
  
    if (editProductName) {
      sql += 'productName = ?, ';
      values.push(editProductName);
    }
  
    if (editModelNo) {
      sql += 'productModelNo = ?, ';
      values.push(editModelNo);
    }
  
    if (editDateOfPurchase) {
      sql += 'dateOfPurchase = ?, ';
      values.push(editDateOfPurchase);
    }
  
    if (editContactNumber) {
      sql += 'contactNumber = ?, ';
      values.push(editContactNumber);
    }
  
    if (enterProblem) {
      sql += 'problemDescription = ?, ';
      values.push(enterProblem);
    }

    if (selectedSlot) {
      sql += 'availableSlots = ?, ';
      values.push(selectedSlot);
    }
    // Remove the trailing comma and space from the SQL query
    sql = sql.slice(0, -2);
    sql += ' WHERE id = ?';
    values.push(id);
  
    con.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error updating product details:', err);
        return res.json({ Status: 'Error' });
      }
      return res.json({ Status: 'Success' });
    });
  });
  
  app.get('/checkSlotAvailability/:selectedSlot/:id', (req, res) => {
  const selectedSlot = req.params.selectedSlot;
  const id = req.params.id;
  con.query('SELECT * FROM productmodel WHERE availableSlots = ? AND id != ?', [selectedSlot, id], (err, result) => {
    if (err) {
      console.error('Error checking slot availability:', err);
      return res.json({ Status: 'Error' });
    }
    if (result.length > 0) {
      // Slot is already booked, return a message
      return res.json({ Status: 'Error', Message: 'Slot is already booked. Please select another slot.' });
    } else {
      // Slot is available, return success
      return res.json({ Status: 'Success' });
    }
  });
});

app.get('/BillGeneration/:BillId', (req, res) => {
  const BillId = req.params.BillId;
  
  const sql = 'SELECT * FROM productmodel WHERE id = ?';
  con.query(sql, [BillId], (err, results) => {
    if (err) {
      console.log(BillId);
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    
    if (results.length === 0) {
      res.status(404).json({ error: 'No data found' });
      return;
    }
    
    const rowData = results[0]; // Assuming you only expect one row of data
    
    // Extract the individual fields from the rowData object
    const {
      Id,
      productName,
      productModelNo,
      dateOfPurchase,
      contactNumber,
      problemDescription,
      availableSlots,
      serviceCenterId,
      UserId
    } = rowData;
    
    // Do something with the fetched data
const data = {
      Id,
      productName,
      productModelNo,
      dateOfPurchase,
      contactNumber,
      problemDescription,
      availableSlots,
      serviceCenterId,
      UserId
    };
    
    // Send the data as the response
    res.status(200).json(data);
  });
});

app.get('/user/:UserId', (req, res) => {
  const UserId = req.params.UserId;
  
  const sql = 'SELECT email FROM login WHERE id = ?';
  con.query(sql, [UserId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ Status: 'Error', Message: 'Failed to fetch user data' });
    }
    
    if (result.length === 0) {
      return res.status(404).json({ Status: 'Error', Message: 'User not found' });
    }
    
    const { email } = result[0];
    return res.status(200).json({ Status: 'Success', email });
  });
});


  
app.listen(8081, ()=> {
    console.log("Running");
})