import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';

import axios from 'axios';

import Loading from '../../pages/Loading.jsx';

export default function MiniProfileCard({ userID, subgreddiitName }) {
    const [user, setUser] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        axios.get(
            `http://localhost:8080/users/id/${user._id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            }
        )
            .then((response) => {
                setUser(response.data.user);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    // console.log("MiniProfileCard : " + user, mode);
    const [dummy, setDummy] = React.useState(0);
    const fullName = user.first_name + " " + user.last_name;

    const handleAccept = () => {
        console.log("Accept");
        axios.post(`http://localhost:8080/subgreddiits/SG/${subgreddiitName}/join_request/accept`,

            JSON.stringify({ "userId": user._id }),

            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            }
        )
            .then((response) => {
                console.log(response.data);
                setDummy(dummy ^ 1);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleReject = () => {
        console.log("Reject");
        axios.post(`http://localhost:8080/subgreddiits/SG/${subgreddiitName}/join_request/reject`,

            JSON.stringify({ "userId": user._id }),

            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            }
        )
            .then((response) => {
                console.log(response.data);
                setDummy(dummy ^ 1);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    if (loading) {
        <Loading />
    }

    return (
        <div className="mb-2" style={{ backgroundColor: '#9de2ff' }}>
            <MDBContainer>
                <MDBRow className="justify-content-center">
                    <MDBCol md="9" lg="8" xl="10" className="mt-0">
                        <MDBCard style={{ borderRadius: '15px' }}>
                            <MDBCardBody className="p-4">
                                <div className="d-flex text-black">
                                    <div className="flex-shrink-0">
                                        <MDBCardImage
                                            style={{ width: '115px', borderRadius: '10px' }}
                                            className="d-sm-block"
                                            src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp'
                                            alt='Generic placeholder image'
                                            fluid />
                                    </div>
                                    <div className="flex-grow-1 ms-3 mt-1">
                                        <MDBCardTitle>{fullName}</MDBCardTitle>
                                        <MDBCardText>@{user.username}</MDBCardText>

                                        <div className="d-flex pt-1 ">
                                            <MDBBtn outline className="me-1 flex-grow-1" color='Success' onClick={handleAccept}>Accept</MDBBtn>
                                            <MDBBtn outline className="me-1 flex-grow-1" color='Danger' onClick={handleReject}>Reject</MDBBtn>
                                        </div>
                                    </div>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
}