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

function CreateReportForm({ subgreddiitName, postID, postCreator, subgreddiitID }) {
    const [checked, setChecked] = React.useState(false);
    const [concern, setConcern] = React.useState('');

    const submitDisable = 
        (concern.length < 10) 
        // ||(!checked);

    const handleCheck = () => {
        setChecked(!checked);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // console.log(`Creator: ${creator.username}`);

        const formData = {
            "concern": concern,
            "postCreator" : postCreator,
            "postedIn" : subgreddiitID,
        }

        axios.post(
            `http://localhost:8080/subgreddiits/SG/${subgreddiitName}/post/${postID}/create/report`, 
            JSON.stringify(formData), {
            headers: {
                'Content-Type': 'application/json',
                // 'Accept': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(function (res) {
                console.log("Reachef d the then block")
                console.log("Response Received : ", res);
            })
            .catch(function (err) {
                console.log("ErrorCaught : ", err);
            })

        console.log(formData);
    }

    const handleConcernChange = (e) => {
        setConcern(e.target.value);
    }

    return (
        <MDBContainer fluid className='d-flex align-items-center justify-content-center' >
            <div className='mask gradient-custom-3'></div>
            <MDBCard className='m-5' style={{ maxWidth: '600px' }}>
                <MDBCardBody className='px-5'>
                    <h2 className="text-uppercase text-center mb-5" >Report Post</h2>
                    <MDBInput onChange={handleConcernChange} wrapperClass='mb-4' label='Write your concern here' size='lg' id='form1' type='text' />
                    <MDBBtn disabled={submitDisable} onClick={handleSubmit} className='mb-4 w-100 gradient-custom-4' size='lg'>Report</MDBBtn>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
}

export default CreateReportForm;