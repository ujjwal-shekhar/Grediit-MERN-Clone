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

function CreatePostForm({ SG_ID }) {
    const [checked, setChecked] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [titleError, setTitleError] = React.useState([]);
    const [descriptionError, setDescriptionError] = React.useState([]); 
    console.log("SG_ID: ", SG_ID);

    const submitDisable = 
        (title.length < 2) ||
        (description.length < 10) ||
        (!checked);

    const handleCheck = () => {
        setChecked(!checked);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // console.log(`Creator: ${creator.username}`);

        const formData = {
            "title": title,
            "content": description,
            "postedIn": SG_ID
        }

        axios.post('http://localhost:8080/subgreddiits/SG/create/post', JSON.stringify(formData), {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(function (res) {
                // console.log("Response Received after post creation: ", res);
                // setUser(res.data);
                // console.log(res.data);
            })
            .catch(function (err) {
                console.log("ErrorCaught : ", err);
            })

        console.log(formData);
    }

    const handleTitleChange = (e) => {
        e.preventDefault();
        setTitle(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        e.preventDefault();
        setDescription(e.target.value);
    }

    return (
        <MDBContainer fluid className='d-flex align-items-center justify-content-center' >
            <div className='mask gradient-custom-3'></div>
            <MDBCard className='m-5' style={{ maxWidth: '600px' }}>
                <MDBCardBody className='px-5'>
                    <h2 className="text-uppercase text-center mb-5" >Create Post</h2>
                    <MDBInput onChange={handleTitleChange} wrapperClass='mb-4' label='Title' size='lg' id='form1' type='text' />
                    <MDBInput onChange={handleDescriptionChange} wrapperClass='mb-4' label='Content' size='lg' id='form2' type='text' />
                    <div className='d-flex flex-row justify-content-center mb-4'>
                        <MDBCheckbox onChange={handleCheck} name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
                    </div>
                    <MDBBtn disabled={submitDisable} onClick={handleSubmit} className='mb-4 w-100 gradient-custom-4' size='lg'>Add Post</MDBBtn>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
}

export default CreatePostForm;