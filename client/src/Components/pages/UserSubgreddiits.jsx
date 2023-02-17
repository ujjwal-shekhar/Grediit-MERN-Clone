import * as React from 'react';

import MiniSubgreddiitCard from '../Subgreddiits/MiniSubgreddiitCard.jsx'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Item from '@mui/material/Stack';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Modal from '@mui/material/Modal';
import CreateSGForm from '../Subgreddiits/SubgreddiitCreateForm';

import Loading from './Loading.jsx';


import {
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBRow,
    MDBCol
} from 'mdb-react-ui-kit';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    // bgcolor: 'background.paper',
    // border: '2px solid #000',
    // boxShadow: 24,
    p: 4,
};

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}

export default function UserSubgreddiits({ user }) {
    const [showSGForm, setShowSGForm] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [sgList, setSGList] = React.useState([]);
    const subgreddiit = {
        name: 'test',
        description: 'LOREM IPSUM DOLOR SIT AMET',
        moderators: ['test'],
        banned_keywords: ['test1', 'test2', 'test3'],
        posts: ['test1', 'test2', 'test3'],
        common_members: ['test1', 'test2', 'test3'],
    }
    const handleAddSG = () => {
        console.log("Add SG");
        setShowSGForm(true);
    }

    const handleClose = () => {
        setShowSGForm(false);
    }

    React.useEffect(() => {
        axios.get(
            'http://localhost:8080/subgreddiits/mod_subgreddiits',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            }
        )
            .then((res) => {
                console.log(res.data.subgreddiit_list);
                setSGList(res.data.subgreddiit_list);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    if (loading) {
        return <Loading />;
    }

    return (
        <Container>
            <MDBRow className='row-cols-1 row-cols-md-3 g-4 mt-1'>
                    {
                        sgList.map((sg, index) => (
                            <MDBCol>    
                                <MiniSubgreddiitCard key={index} 
                                subgreddiit={sg} perms={"MOD"} />
                            </MDBCol>
                        ))
                    }
            </MDBRow>
            <IconButton onClick={handleAddSG} sx={{
                position: 'absolute',
                bottom: 20,
                right: 20,
                // color: 'white',
                // backgroundColor: 'primary',
            }}>
                <AddCircleOutlineIcon fontSize='large' color='primary' />

            </IconButton>
            <Modal
                open={showSGForm}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CreateSGForm creator={user} />
                </Box>
            </Modal>
        </Container>

    )
}