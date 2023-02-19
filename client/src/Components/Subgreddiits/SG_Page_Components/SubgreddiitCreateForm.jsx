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
  const [bannedKeywords, setBannedKeywords] = React.useState(['']);
  const [nameError, setNameError] = React.useState('');
  const [descriptionError, setDescriptionError] = React.useState('');
  const [bannedKeywordsError, setBannedKeywordsError] = React.useState('');
  const [tags, setTags] = React.useState(['']);
  const [tagsError, setTagsError] = React.useState('');

  const submitDisable = (name.length < 2) || 
                        (description.length < 10) || 
                        (bannedKeywordsError.length) || 
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
      "bannedKeywords": bannedKeywords,
      "tags": tags,
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

  const handleNameChange = (e) => {
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

  const handleBannedKeywordsChange = (e) => {
    e.preventDefault();
    setBannedKeywords(e.target.value.split(','));
    // Every Banned keyword must be at least 2 characters long
    if (e.target.value.split(',').every((keyword) => keyword.length < 2)) {
      setBannedKeywordsError('Banned keywords must be at least 2 characters long');
    } else {
      setBannedKeywordsError('');
    }
  }

  const handleTagsChange = (e) => {
    e.preventDefault();
    setTags(e.target.value.split(','));
    // Every Tag must be at least 2 characters long
    if (e.target.value.split(',').every((tag) => tag.length < 2)) {
      setTagsError('Tags must be at least 2 characters long');
    } else {
      setTagsError('');
    }
  }

  return (
    <MDBContainer fluid className='d-flex align-items-center justify-content-center' >
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5" >Create a Subgreddiit</h2>
          <MDBInput onChange={handleNameChange} wrapperClass='mb-4' label='Subgreddiit Name' size='lg' id='form1' type='text' />
          <MDBInput onChange={handleDescriptionChange} wrapperClass='mb-4' label='Subgreddiit Description' size='lg' id='form2' type='text' />
          <MDBInput onChange={handleBannedKeywordsChange} wrapperClass='mb-4' label='Banned Keywords' size='lg' id='form2' type='text' />
          <MDBInput onChange={handleTagsChange} wrapperClass='mb-4' label='Tags' size='lg' id='form2' type='text' />
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