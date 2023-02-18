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
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [age, setAge] = React.useState('');
    const [contactNumber, setContactNumber] = React.useState('');
    const [firstNameError, setFirstNameError] = React.useState('');
    const [lastNameError, setLastNameError] = React.useState('');
    const [ageError, setAgeError] = React.useState('');
    const [contactNumberError, setContactNumberError] = React.useState('');

    const submitDisable = 
        (firstNameError.length) ||
        (lastNameError.length) ||
        (ageError.length) ||
        (contactNumberError.length) ||
        (!checked);

    const handleCheck = () => {
        setChecked(!checked);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(`Creator: ${creator.username}`);

        const formData = {
            "firstName": firstName,
            "lastName": lastName,
            "age": age,
            "contactNumber": contactNumber,
        }

        axios.post('http://localhost:8080/users/update', JSON.stringify(formData), {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
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
        setFirstName(e.target.value);
        if (e.target.value.length < 2) {
            setFirstNameError('Name must be at least 2 characters long');
        } else {
            setFirstNameError('');
        }
    }

    const handleLastNameChange = (e) => {
        e.preventDefault();
        setLastName(e.target.value);
        if (e.target.value.length < 2) {
            setLastNameError('Name must be at least 2 characters long');
        } else {
            setLastNameError('');
        }
    }

    const handleAgeChange = (e) => {
        e.preventDefault();
        setAge(e.target.value);
        if (age < 13) {
            setAgeError('Age must be at least 13 years old');
        } else {
            setAgeError('');
        }
    }

    const handleContactNumberChange = (e) => {
        e.preventDefault();
        setContactNumber(e.target.value);
        if (contactNumber.length < 10) {
            setContactNumberError('Contact Number must be at least 10 digits long');
        } else {
            setContactNumberError('');
        }
    }

    return (
        <MDBContainer fluid className='d-flex align-items-center justify-content-center' >
            <div className='mask gradient-custom-3'></div>
            <MDBCard className='m-5' style={{ maxWidth: '600px' }}>
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