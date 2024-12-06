'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#323533',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '20px',
}

interface BasicModalProps {
  children: React.ReactNode
  title: string
  buttonText: string
  open: boolean
  handleOpen: () => void
  handleClose: () => void
}

export default function BasicModal({
  children,
  title,
  buttonText,
  open,
  handleOpen,
  handleClose,
}: BasicModalProps) {
  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="outlined"
        sx={{
          color: '#A8CD89',
          borderColor: '#A8CD89',
          '&:hover': {
            opacity: 0.75,
          },
        }}
      >
        {buttonText}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          {children}
        </Box>
      </Modal>
    </div>
  )
}
