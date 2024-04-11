import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import { uploadFile } from '../firebase';
import { useDropzone } from 'react-dropzone';

export const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Header(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleFileChange = (event) => {
        /** @type {FileList} */
        const files = event.target.files;

        if (!files) return;

        const file = files.item(0)

        if (!file) return;

        uploadFile(file).then(() => {
            handleClose();
            props.refreshData();
        });
    };

    return (
        <>
            <header style={{
                position: "fixed", top: "0px", width: "100%",
                gap: "20px", alignItems: "center", padding: "20px", display: "flex", justifyContent: "space-between",
                borderBottom: "1px solid lightgray", backgroundColor: "white"
            }}>
                <div style={{ "fontWeight": "bold" }}>StudyShare</div>
                {props.isLoggedIn &&
                    <div className='flex' style={{ gap: "20px" }}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ bgcolor: "black" }}
                            onClick={handleOpen}
                        >
                            + Add material
                        </Button>
                        <Typography variant="h6" style={{ margin: "0px" }}>Tomas Zverbik</Typography>
                        <img src="https://s3-alpha-sig.figma.com/img/60cc/08a6/58479468419501ed066f00d83aefa417?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AyA7mpjKouxnylCEdmsttAaYMHbmhqq2Du2Mh8GT~7NYOHg4GPhbJkDXHjlXl4-tQ8t~sWB46HgogAd8WlYmkoqUVci1nnDhc01w4YPAmAmy9DlsuCukUUM3ZJ3GY71A6oEVqU4-8nTSQtuxAzwFZ0RlH28moybYQBU~czCKxwKsgNBcKk0ld1U9MMPZNpuk5RBq2EiUBcnA0rixI2NF~rq2jI3X976PnNk6Klx9kkLC3YNeACOnTv9JIAnaiVDZvrzXf~6jUOBnK4JMIXqXmufgpNrpIhdRnEGqITBOuDrCGy-1C2TOVwG8cui5YaoQjeydCccfMju7~nOd9TRfSA__" alt="Tomas Zverbik" width="40" height="40" style={{ borderRadius: "50%", borderColor: "black", border: "1px solid" }} />
                    </div>}
                {!props.isLoggedIn &&
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ bgcolor: "black" }}
                    >
                        Register
                    </Button>}
            </header>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h4" sx={{ fontWeight: "bold" }} >
                        Upload files

                        <CloseIcon style={{ position: "absolute", right: "10px", top: "10px", cursor: "pointer" }} fontSize='large' onClick={handleClose} />
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Choose the type of upload you want to do for your files
                    </Typography>
                    <Basic handleFileChange={handleFileChange}/>
                    {/* <input id='fileupload' type="file" onChange={handleFileChange} style={{ display: "flex" }} /> */}
                </Box>
            </Modal>
        </>
    );
}

function Basic(props) {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <section className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} onChange={props.handleFileChange}/>
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            {acceptedFiles.length > 0 && <aside>
                <h4>Files</h4>
                <ul>{files}</ul>
            </aside>
            }
        </section>
    );
}
