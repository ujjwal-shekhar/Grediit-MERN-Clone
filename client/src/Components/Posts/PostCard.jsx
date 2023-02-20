import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popover from '@mui/material/Popover';
import Comment from './Comments';
import AddCommentIcon from '@mui/icons-material/AddComment';
import Fade from '@mui/material/Fade';
import Stack from '@mui/material/Stack';
import ReportIcon from '@mui/icons-material/Report';

import Loading from '../pages/Loading';
import CreateCommentForm from './CreateCommentForm';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import axios from 'axios';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  // transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  // bgcolor: 'background.paper',
  // border: '2px solid #000',
  // boxShadow: 24,
  p: 4,
};

export default function PostCard({ subgreddiitName, postID }) {
  console.log(subgreddiitName, postID)
  const [post, setPost] = React.useState(null);
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const [openCommentForm, setOpenCommentForm] = React.useState(false);
  const handleOpenCommentForm = () => setOpenCommentForm(true);
  const handleCloseCommentForm = () => setOpenCommentForm(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(Boolean(anchorEl));
    console.log("clicked settings")
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    console.log("PostCard mounted")
    axios.get(
      `http://localhost:8080/subgreddiits/SG/${subgreddiitName}/post/${postID}/details`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then((response) => {
        console.log("hihsifhsidfahoifh");
        console.log(response.data.post);

        setPost(response.data.post);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  // const handleAddComment = () => {
  //   console.log("clicked add comment")
  //   axios.post(
  //     `http://localhost:8080/subgreddiits/SG/${subgreddiitName}/post/${postID}/comment`,
  //     JSON.stringify({
  //       content: "This is a comment"
  //     }),
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': 'Bearer ' + localStorage.getItem('token')
  //       }
  //     }
  //   )
  //     .then((response) => {
  //       console.log(response)
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  // }

  if (loading) {
    return <Loading />
  }
  
  console.log("After the post card has loaded the post is : ", post);
  return (
    <>
      <Modal
          open={openCommentForm}
          onClose={handleCloseCommentForm}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
              <CreateCommentForm postID={postID} subgreddiitName={subgreddiitName} />
          </Box>

      </Modal>
      <Card sx={{ maxWidth: 500  }}>
        <CardHeader
          // avatar={
          //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          //     R
          //   </Avatar>
          // }
          action={
            <>
            <IconButton aria-label="settings" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
              <Popover
                id={id}
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                >
                <Stack spacing={2}>
                  <IconButton aria-label="Report">
                    <ReportIcon /> 
                    <Typography variant='overline' sx={{marginLeft : 1}}>Report Post</Typography>
                  </IconButton> 
                </Stack>
              </Popover>
              </>
          }
          title={post.title}
          // subheader="September 14, 2016"
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post.content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="Upvote">
            <ArrowUpwardIcon />
          </IconButton>
          <IconButton aria-label="Downvote">
            <ArrowDownwardIcon />
          </IconButton>

            <IconButton aria-label="Add Comment" onClick={handleOpenCommentForm}>
              <Fade in={expanded}>
                <AddCommentIcon />
              </Fade>
            </IconButton>

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            {/* <ExpandMoreIcon /> */}
            <CommentIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {
              post.comments.map((comment) => {
                return (
                  <Comment content={comment}/>
                )
              })
            }
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}   

// import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
// import { Avatar, Card } from 'antd';
// import React from 'react';
// import axios from 'axios';

// const { Meta } = Card;
// const App = ({ post }) => (

//   React.useEffect(() => {
//     axios.get(
//       'http://localhost:8080/'
//     )
//   }, []),

//   <Card
//     style={{
//       width: 300,
//     }}
//     cover={
//       <img
//         alt="example"
//         src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
//       />
//     }
//     actions={[
//       <SettingOutlined key="setting" />,
//       <EditOutlined key="edit" />,
//       <EllipsisOutlined key="ellipsis" />,
//     ]}
//   >
//     <Meta
//       // avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
//       title={post.title}
//       description={post.content}
//     />
//   </Card>
// );
// export default App;