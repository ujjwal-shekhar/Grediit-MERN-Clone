import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import axios from 'axios';

function CreateSGForm({ creator }) {
  const [checked, setChecked] = React.useState(false);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [nameError, setNameError] = React.useState('');
  const [descriptionError, setDescriptionError] = React.useState('');

  const submitDisable = (name.length < 2) || 
                        (description.length < 10) || 
                        (!checked);

  const handleCheck = () => {
    setChecked(!checked);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log(`Creator: ${creator.username}`);

    const formData = {
      "name": name,
      "description": description,
      "creatorID": creator._id
    }

    axios.post('http://localhost:8080/subgreddiits/create', JSON.stringify(formData), {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Authorization" : 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(function (res) {
        console.log("Response Received : ", res);
      })
      .catch(function (err) {
        console.log("ErrorCaught : ", err);
      })

    console.log(formData);
  }

  const handleFirstNameChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
    if (e.target.value.length < 2) {
      setNameError('Name must be at least 2 characters long');
    } else {
      setNameError('');
    }
  }

  const handleLastNameChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
    if (e.target.value.length < 2) {
      setNameError('Name must be at least 2 characters long');
    } else {
      setNameError('');
    }
  }

  const handleDescriptionChange = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
    if (e.target.value.length < 2) {
      setDescriptionError('Description must be at least 10 characters long');
    } else {
      setDescriptionError('');
    }
  }

  return (
    <MDBContainer fluid className='d-flex align-items-center justify-content-center' >
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5" >Edit Profile</h2>
          <MDBInput onChange={handleFirstNameChange} wrapperClass='mb-4' label='First Name' size='lg' id='form1' type='text' />
          <MDBInput onChange={handleLastNameChange} wrapperClass='mb-4' label='Last Name' size='lg' id='form2' type='text' />
          <MDBInput onChange={handleAgeChange} wrapperClass='mb-4' label='Age' size='lg' id='form3' type='text' />
          <MDBInput onChange={handleContactNumberChange} wrapperClass='mb-4' label='Contact Number' size='lg' id='form4' type='text' />
          <div className='d-flex flex-row justify-content-center mb-4'>
            <MDBCheckbox onChange={handleCheck} name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
          </div>
          <MDBBtn disabled={submitDisable} onClick={handleSubmit} className='mb-4 w-100 gradient-custom-4' size='lg'>Create Subgreddiit</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default CreateSGForm;