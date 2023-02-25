import { useEffect, useState } from 'react';
import { Container, Box } from '@material-ui/core';
import { Space } from 'antd';

import Loading from '../../pages/Loading.jsx';
import MiniSubgreddiitCard from '../../Subgreddiits/SG_Page_Components/MiniSubgreddiitCard.jsx'

import { MDBRow } from 'mdb-react-ui-kit';

import axios from 'axios';

const itemComp = (a, b, type) => {
    if (type === 'AscendingName') {
        return a.name.localeCompare(b.name);
    }
    else if (type === 'DescendingName') {
        return b.name.localeCompare(a.name);
    }
    else if (type === 'Followers') {
        return b.common_members.length - a.common_members.length;
    }
    else if (type === 'CreationDate') {
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
    else {
        return 0;
    }
}

export default function Mod_SG_List({ user, tags, searchValue, sortFilter }) {
    const [loading, setLoading] = useState(true);
    const [modSG, setModSG] = useState([]);
    useEffect(() => {
        console.log("Mod_sg mounted");
        axios.get(
            "http://localhost:8080/users/" + user.username + "/mod_subgreddiits",
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }
        )
            .then((response) => {
                console.log("response received as : ", response.data);
                
                setModSG(response.data);
                console.log("modSG : ", modSG);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    if (loading) {
        return <Loading />
    }

    // SortFilter is an array
    // It has elements list 'AscendingName'. 'Followers', 'CreationDate', etc
    // If it has 'AscendingName', then sort by name in ascending order
    // If it has 'DescendingName', then sort by name in descending order
    // If it has 'Followers', then sort by followers in descending order
    // If it has 'CreationDate', then sort by creation date by newest first
    // Take care of the case when there are multiple elements in the array
    // If there are multiple elements, then sort by the first element in the array
    // and then do a stable sort by the second element in the array and so on
    // If there are no elements in the array, then do not sort
    // If there is only one element in the array, then sort by that element


    // Sort the modSG array
    if (sortFilter.length === 1) {
        console.log("Sorting by modSG")
        modSG = modSG.sort(
            sortFilter
            .map((item) => {
                return (a, b) => itemComp(a, b, item);
            }
        )[0]);
    } else if (sortFilter.length === 2) {
        modSG = modSG.sort(
            sortFilter
            .map((item) => {
                return (a, b) => itemComp(a, b, item);
            })[0])
            .sort(
                sortFilter
                .map((item) => {
                    return (a, b) => itemComp(a, b, item);
                })[1]
            );
    } else if (sortFilter.length === 3) {
        modSG = modSG.sort(
            sortFilter
            .map((item) => {
                return (a, b) => itemComp(a, b, item);
            })[0])
            .sort(
                sortFilter
                .map((item) => {
                    return (a, b) => itemComp(a, b, item);
                })[1]
                .sort(
                    sortFilter
                    .map((item) => {
                        return (a, b) => itemComp(a, b, item);
                    })[2]
                )
        )
    }


    console.log("tags : ", tags);

    return (
        <Container>
            <Box className='mt-2' sx={{width:'100%'}}>
                <Space direction='vertical'>
                    <MDBRow className='row-cols-1 row-cols-md-3 g-100 mt-1'>
                    {
                        modSG.map((sg) => {
                            return (
                                <MiniSubgreddiitCard 
                                key={sg._id}
                                searchValue={searchValue}
                                subgreddiit={sg} 
                                tags={tags}
                                perms={"MOD_ALL"}/>
                            )
                        })
                    }
                    </MDBRow>
                </Space>
            </Box>
        </Container>
    );
}