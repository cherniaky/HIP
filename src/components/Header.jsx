import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Header(props) {
    return (
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
    );
}
