import React, { useState, useEffect } from 'react';
import { useAuth } from '../apiServices/AuthContext';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography'; 
import { Link } from 'react-router-dom'; 


function AdminDashboard() {
  const { currentUser  } = useAuth();
  const [cars, setCars] = useState([]);
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [VIN, setVIN] = useState(generateRandomVIN().toString());
  const [photoURL, setPhotoURL] = useState('');
  const [plate, setPlate] = useState('');
  const [year, setYear] = useState('');
  const [color, setColor] = useState('');
  const [transmission, setTransmission] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');
  const [numberOfSeats, setNumberOfSeats] = useState('');
  const [numberOfDoors, setNumberOfDoors] = useState('');
  const [style, setStyle] = useState('');
  const [reservation, setReservation] = useState('');
  const [lister, setLister] = useState(currentUser);
  const [kilometers, setKilometers] = useState('');
  const [reqMessage, setReqMessage] = useState('')
  const [deleteVIN, setDeleteVIN] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const handleOpen = (car) => {
    setSelectedCar(car);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCar(null);
  };

  const handleUpdate = (car) => {
    handleOpen(car);
  };  useEffect(() => {
    setLister(currentUser);
  }, [currentUser]);

  useEffect(() => {
    fetchCars();
  }, []);
  
  const fetchCars = async () => {
    try {
      const response = await fetch('http://localhost:9000/vehicles/getCars');
      const data = await response.json();
      if (!response.ok) {
        throw new Error('Failed to fetch cars');
      }
      setCars(data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleInputChange = (event) => {
    const changeField = event.target.id;
    const changedValue = event.target.value;

    if (changeField === "brand") {
      selectedCar.brand = changedValue;
  } else if (changeField === "model") {
      selectedCar.model = changedValue;
  } else if (changeField === "year") {
      selectedCar.year = changedValue;
  } else if (changeField === "color") {
      selectedCar.color = changedValue;
  } else if (changeField === "pricePerDay") {
      selectedCar.pricePerDay = changedValue;
  }
  };
  
  
  const handleSaveChanges = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('http://localhost:9000/vehicles/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedCar),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error('Failed to save changes');
      }
      
      console.log('Changes saved successfully:', data);
      
      setSelectedCar(data.car);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  
  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log('Form submitted with:', { 
        brand, 
        model, 
        VIN, 
        photoURL, 
        plate,
        year, 
        color,
        transmission,
        pricePerDay,
        numberOfSeats, 
        numberOfDoors,  
        style, 
        reservation, 
        lister, 
        kilometers
      });
    
    try {
        const response = await fetch('http://localhost:9000/vehicles/insert', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify( {
            brand, 
            model, 
            VIN, 
            photoURL, 
            plate,
            year, 
            color,
            transmission,
            pricePerDay,
            numberOfSeats, 
            numberOfDoors,  
            style, 
            reservation, 
            lister, 
            kilometers
         } ),
        });
  
        const data = await response.json();
        if (!response.ok) {
          console.log(data)
          throw new Error('Car addition fail');
        }
        console.log('Car successful:', data);
  
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

  async function handleDelete(event, vin) {
    event.preventDefault();
    try {
        const response = await fetch('http://localhost:9000/vehicles/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ deleteVIN: vin })
        });
        const data = await response.json();
        setReqMessage(data.message);
        setReqSuccess(data.success);
        if (data.success) {
            fetchCars();
        }
    } catch (err) {
        console.error(err);
    }
  }


function generateRandomVIN() {
  const min = 1000;
  const max = 99999999999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const handleSeatsChange = (event) => {
  const seatsValue = event.target.value;
  if (seatsValue >= 2 && seatsValue <= 9) {
    setNumberOfSeats(seatsValue);
  } else {
  }
};

const handleDoorsChange = (event) => {
  const doorsValue = event.target.value;
  if (doorsValue >= 2 && doorsValue <= 4) {
    setNumberOfDoors(doorsValue);
  } else {
  }
};

const handleYearChange = (event) => {
  const yearValue = event.target.value;
  if (/^\d{4}$/.test(yearValue) && yearValue >= 1900 && yearValue <= 2024) {
    setYear(yearValue);
  } else {
  }
};


  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
      <div>
        <Link to="/viewUserReservations">View User Reservations</Link>
      </div>
        <h4>Cars currently up for rent</h4>
        <Box>
          <Grid>
            {cars.map((car) => (
              <Grid key={car.VIN} item xs={12} sm={6} md={4} lg={3}>
                <Paper>
                  <img src={car.photoURL} alt={`Car ${car.VIN}`} />
                  <p>VIN: {car.VIN} </p>
                  <p>Brand: {car.brand}</p>
                  <p>Model: {car.model}</p>
                  <p>Year: {car.year}</p>
                  <p>Color: {car.color}</p>
                  <p>Price per Day: {car.pricePerDay}</p>
                  <Button onClick={(event) => handleUpdate(car)}>Update Car Information</Button>
                  <Button onClick={(event) => handleDelete(event, car.VIN)}>Delete Car</Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>      
        </div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Car Information
          </Typography>
          {selectedCar && (
          <Paper>
            <img src={selectedCar.photoURL} alt={`Car ${selectedCar.VIN}`} style={{ width: '300px', height: 'auto' }} />
            <p>VIN: {selectedCar.VIN} </p>
            <form onSubmit={handleSaveChanges}>
              <label htmlFor="brand">Brand:</label>
              <input type="text" id="brand" defaultValue={selectedCar.brand || ''} onChange={handleInputChange}/>
              {console.log(selectedCar.brand)}
              <label htmlFor="model">Model:</label>
              <input type="text" id="model" defaultValue={selectedCar.model || ''} onChange={handleInputChange}/>
              {console.log(selectedCar.model)}
              <label htmlFor="year">Year:</label>
              <input type="text" id="year" defaultValue={selectedCar.year || ''} onChange={handleInputChange}/>
              {console.log(selectedCar.year)}
              <label htmlFor="color">Color:</label>
              <input type="text" id="color" defaultValue={selectedCar.color || ''} onChange={handleInputChange}/>
              {console.log(selectedCar.color)}
              <label htmlFor="pricePerDay">Price per Day:</label>
              <input type="text" id="pricePerDay" defaultValue={selectedCar.pricePerDay || ''} onChange={handleInputChange}/>
              {console.log(selectedCar.pricePerDay)}

              <Button type="submit">Save Changes</Button>
            </form>
          </Paper>
        )}
        </Box>
      </Modal>
      <hr></hr>
    <h2>Add a new car for rent</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="brand">Brand:</label>
        <input
          type="text"
          id="brand"
          value={brand}
          onChange={(event) => setBrand(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="model">Model:</label>
        <input
          type="text"
          id="model"
          value={model}
          onChange={(event) => setModel(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="VIN">VIN:</label>
        <input
          type="text"
          id="VIN"
          value={VIN}
          onChange={(event) => setVIN(event.target.value)}
          required
          readOnly
        />
      </div>
      <div>
        <label htmlFor="photoURL">PhotoURL:</label>
        <input
          type="text"
          id="photoURL"
          value={photoURL}
          onChange={(event) => setPhotoURL(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="plate">Plate:</label>
        <input
          type="text"
          id="plate"
          value={plate}
          onChange={(event) => setPlate(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="year">Year:</label>
        <input
          type="number"
          id="year"
          value={year}
          // onChange={(event) => setYear(event.target.value)}
          onChange={handleYearChange}
          min={1900}
          max={2024}
          required
        />
      </div>
      <div>
        <label htmlFor="color">Color:</label>
        <input
          type="text"
          id="color"
          value={color}
          onChange={(event) => setColor(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="transmission">Transmission:</label>
        <select
          id="transmission"
          value={transmission}
          onChange={(event) => setTransmission(event.target.value)}
          required
        >
        <option value="">Select Transmission</option>
        <option value="true">Automatic</option>
        <option value="false">Manual</option>
        </select>
      </div>
      <div>
        <label htmlFor="pricePerDay">Price per day:</label>
        <input
          type="text"
          id="pricePerDay"
          value={pricePerDay}
          onChange={(event) => setPricePerDay(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="numberOfSeats">Number of seats:</label>
        <input
          type="number"
          id="numberOfSeats"
          value={numberOfSeats}
          // onChange={(event) => setNumberOfSeats(event.target.value)}
          onChange={handleSeatsChange}
          min={2}
          max={9}
          required
        />
      </div>
      <div>
        <label htmlFor="numberOfDoors">Number of doors:</label>
        <input
          type="number"
          id="numberOfDoors"
          value={numberOfDoors}
          // onChange={(event) => setNumberOfDoors(event.target.value)}
          onChange={handleDoorsChange}
          min={2}
          max={4}
          required
        />
      </div>
        <div>
        <label htmlFor="style">Car Type:</label>
        <select
          id="style"
          value={style}
          onChange={(event) => setStyle(event.target.value)}
          required
        >
        <option value="">Select Car Type</option>
        <option value="SUV">SUV</option>
        <option value="sudan">Sudan</option>
        <option value="convertable">Convertable</option>
        </select>
      </div>
      <div>
        <label htmlFor="reservation">Reservation:</label>
        <input
          type="text"
          id="reservation"
          value={reservation}
          onChange={(event) => setReservation(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="lister">Admin email:</label>
        <input
          type="text"
          id="lister"
          value={lister}
          onChange={(event) => setLister(currentUser)}
          required
          readOnly
        />
      </div>
      <div>
        <label htmlFor="kilometers">Kilometers:</label>
        <input
          type="text"
          id="kilometers"
          value={kilometers}
          onChange={(event) => setKilometers(event.target.value)}
          required
        />
      </div>
      <button type="submit">Add Car</button>
    </form>
    <hr></hr>
    <h2>Delete a car for rent</h2>
    <form onSubmit={handleDelete}>
    <div>
        <label htmlFor="deleteVIN">VIN of car to delete:</label>
        <input
          type="text"
          id="deleteVIN"
          value={deleteVIN}
          onChange={(event) => setDeleteVIN(event.target.value)}
          required
        />
      <button type="submit">Delete Car</button>
      </div>
       <p>{reqMessage}</p>
       

    </form>
    </div>


  );
                  
};

export default AdminDashboard;
    // setBrand('');
    // setModel('');
    // setVIN('');
    // setPhotoURL('');
    // setPlate('');
    // setYear('');
    // setColor('');
    // setTransmission('');
    // setPricePerDay('');
    // setNumberOfSeats('');
    // setNumberOfDoors('');
    // setStyle('');
    // setReservation('');
    // setLister('');
    // setKilometers('');