import React from 'react';
import { modalStyle } from './Header';
import { ThumbUp } from '@mui/icons-material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import { likeFile } from '../firebase';

export default function ListItem({ index, item, refreshData }) {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    return (
        <div key={index} className='flex' style={{
            gap: "20px", border: "1px solid black", padding: "20px",
            justifyContent: "space-between"
        }}>
            <div className='flex' style={{ gap: "10px" }}>
                <PictureAsPdfIcon fontSize={"large"} />
                <div className='flex column' style={{ alignItems: "start" }}>
                    <Typography onClick={() => setIsModalOpen(true)} variant="h5" className='hover underline'
                        style={{ color: "black", fontWeight: "bold" }}>{item.title}</Typography>
                    <Typography variant="h7" style={{ color: "black" }}>{item.user}</Typography>
                </div>
            </div>
            <Typography variant="h6" className='flex' style={{ color: "black", gap: "10px" }}>{item.likes}
                <ThumbUp onClick={() => {
                    if (item.liked) return;

                    likeFile(item.id).then(() => {
                        refreshData();
                    })
                }} className='hover' style={{ color: item.liked ? "blue" : "black" }} />
            </Typography>
            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h4" sx={{ fontWeight: "bold", marginBottom: "10px" }} >
                        View file {item.title}

                        <CloseIcon style={{ position: "absolute", right: "10px", top: "10px", cursor: "pointer" }} fontSize='large' onClick={handleCloseModal} />
                    </Typography>
                    <iframe src={item.url}
                        width="100%" height="500px"></iframe>
                </Box>
            </Modal>
        </div>
    )
}
