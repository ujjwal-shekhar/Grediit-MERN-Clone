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

function CreateSGForm({ subgreddiitName, postID }) {
    const [checked, setChecked] = React.useState(false);
    const [comment, setComment] = React.useState('');

    const submitDisable = 
        (comment.length < 10) 
        // ||(!checked);

    const handleCheck = () => {
        setChecked(!checked);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // console.log(`Creator: ${creator.username}`);

        const formData = {
            "content": comment,
        }

        axios.post(
            `http://localhost:8080/subgreddiits/SG/${subgreddiitName}/post/${postID}/comment`, 
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

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    }

    return (
        <MDBContainer fluid className='d-flex align-items-center justify-content-center' >
            <div className='mask gradient-custom-3'></div>
            <MDBCard className='m-5' style={{ maxWidth: '600px' }}>
                <MDBCardBody className='px-5'>
                    <h2 className="text-uppercase text-center mb-5" >Add a comment</h2>
                    <MDBInput onChange={handleCommentChange} wrapperClass='mb-4' label='Write your comment here' size='lg' id='form1' type='text' />
                    {/* <div className='d-flex flex-row justify-content-center mb-4'>
                        <MDBCheckbox onChange={handleCheck} name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
                    </div> */}
                    <MDBBtn disabled={submitDisable} onClick={handleSubmit} className='mb-4 w-100 gradient-custom-4' size='lg'>Comment</MDBBtn>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
}

export default CreateSGForm;