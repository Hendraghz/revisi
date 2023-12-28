import { useState } from 'react';
import { Link } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Avatar, IconButton } from '@mui/material';
// mocks_
import account from '../../../_mock/account';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Link>
          <Avatar src={account.photoURL} alt="photoURL" />
        </Link>
      </IconButton>
    </>
  );
}
