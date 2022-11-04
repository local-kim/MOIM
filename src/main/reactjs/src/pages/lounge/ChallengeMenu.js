import React from 'react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import styles from './Challenge.module.css';
import { useNavigate } from 'react-router-dom';

const options = [
  '삭제하기',
  // '어쩌고저쩌고 쏼라쏼라 기라라ㅣ어ㅏ러ㅏ',
];

const ChallengeMenu = ({challenge, user}) => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteChallenge = () => {
    axios.delete(`/challenge/delete/${challenge.id}`)
    .then(res => {
      console.log(res);
      navigate('/lounge');
    }).catch(err => console.log(err));
  }

  return (
    <div className={styles.menu_wrap}>
      <IconButton
        aria-label="more"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        size={'small'}
        style={{'padding': 0}}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        // PaperProps={{
        //   style: {
        //     maxHeight: ITEM_HEIGHT * 4.5,
        //     width: '20ch',
        //   },
        // }}
        sx={{paddingTop: '0', paddingBottom: '0'}}
        size={'small'}
      >
        <MenuItem onClick={deleteChallenge} size={'small'} sx={{minHeight: '25px', fontSize:'15px', padding: '0 10px 0 10px'}}>
          삭제하기
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ChallengeMenu;