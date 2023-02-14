import MiniSubgreddiitCard from '../Subgreddiits/MiniSubgreddiitCard.jsx'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Item from '@mui/material/Stack';

export default function UserSubgreddiits() {
    const subgreddiit = {
        name: 'test',
        description: 'LOREM IPSUM DOLOR SIT AMET',
        moderators: ['test'],
        banned_keywords: ['test'],
        posts : ['test1', 'test2', 'test3'],
        common_members: ['test1', 'test2', 'test3'],
    }
    const handleAddSG = () => {
        console.log("Add SG")
    }
    return (
        <div>
        <Stack>
            <Item>
                <MiniSubgreddiitCard subgreddiit={subgreddiit} perms={"MOD"}/>
            </Item>
            <Item>
                <MiniSubgreddiitCard subgreddiit={subgreddiit} perms={"MOD"}/>
            </Item>
        </Stack>
        <IconButton onClick={handleAddSG} sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            // color: 'white',
            // backgroundColor: 'primary',
        }}>
            <AddCircleOutlineIcon fontSize='large' color='primary'/>
        </IconButton>
        {/* <MiniSubgreddiitCard />
        <MiniSubgreddiitCard /> */}
        </div>
    )
}