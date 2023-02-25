import * as React from 'react';

import MiniSubgreddiitCard from '../Subgreddiits/SG_Page_Components/MiniSubgreddiitCard.jsx'
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
import CreateSGForm from '../Subgreddiits/SG_Page_Components/SubgreddiitCreateForm';

import Loading from './Loading.jsx';
import Button from 'antd/lib/button/button.js';


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

    const handleAddSG = () => {
        console.log("Add SG");
        setShowSGForm(true);
    }

    const handleClose = () => {
        setShowSGForm(false);
    }

    React.useEffect(() => {
        console.log("Mounted UserSGs")
        axios.get(
            'http://localhost:8080/subgreddiits/mod_subgreddiits_list',
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
                console.log(res)
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
        <>
        <div className='p-5 text-center bg-light'>
        <h1 className='mb-3'>My Subgreddiits</h1>
        <h4 className='mb-3'></h4>
        <Button onClick={handleAddSG} variant="contained" color="primary" size="large">
            Create Subgreddiit
        </Button>
      </div>
        <Container>
            <MDBRow className='row-cols-1 row-cols-md-3 g-4 mt-1'>
                    {
                        sgList.map((sg) => {
                            // console.log(sg._id)
                            return <MDBCol key={sg._id} >    
                                <MiniSubgreddiitCard 
                                tags={null}
                                searchValue={null}
                                subgreddiit={sg} 
                                perms={"MOD_MY"} />
                            </MDBCol>
                        })  
                    }
            </MDBRow>
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
        </>
    )
}