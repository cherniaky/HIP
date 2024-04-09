import { useState } from 'react'
import Header from './components/Header.jsx'
import './App.css'
import SignIn from './components/SignIn.jsx';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import { ThumbUp } from '@mui/icons-material';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [data, setData] = useState([{ title: "Plagiátorstvo", user: "JanAnonimus", likes: 12, filename: "plagiat.pdf" }, { title: "Vývoj umelé inteligencie", user: "JanAnonimus", likes: 12, filename: "plagiat.pdf" }, { title: "Vývoj umelé inteligencie", user: "JanAnonimus", likes: 12, filename: "plagiat.pdf" }, { title: "Vývoj umelé inteligencie", user: "JanAnonimus", likes: 12, filename: "plagiat.pdf" }, { title: "Vývoj umelé inteligencie", user: "JanAnonimus", likes: 12, filename: "plagiat.pdf" }, { title: "Vývoj umelé inteligencie", user: "JanAnonimus", likes: 12, filename: "plagiat.pdf" }]);

    return (
        <>
            <Header isLoggedIn={isLoggedIn} setLogin={setIsLoggedIn} />
            <div style={{ marginTop: "77px", padding: "40px 100px" }}>
                {!isLoggedIn ? <SignIn setIsLoggedIn={setIsLoggedIn} /> :
                    <>
                        <div className='flex column' style={{ alignItems: "start", gap: "30px" }}>
                            <Breadcrumbs aria-label="breadcrumb" style={{ fontSize: "22px" }}>
                                <Link underline="hover" color="black" href="/">
                                    TUKE
                                </Link>
                                <Link
                                    underline="hover"
                                    color="black" href="/"
                                >
                                    FEI
                                </Link>
                                <Link
                                    underline="hover"
                                    color="black" href="/"
                                >
                                    3 ročník
                                </Link>
                                <Link
                                    underline="hover"
                                    color="black" href="/"
                                >
                                    HI
                                </Link>
                                <Link
                                    underline="hover"
                                    color="black" href="/"
                                >
                                    SVT
                                </Link>

                            </Breadcrumbs>
                            <TextField
                                label="Search"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment>
                                            <IconButton>
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <Typography variant="h4" style={{ color: "black", fontWeight: "bold" }}>Spolecenske vedy a technika</Typography>

                            <div style={{ width: "100%" }}>
                                {data.map((item, index) => (
                                    <div key={index} className='flex' style={{
                                        gap: "20px", border: "1px solid black", padding: "20px",
                                        justifyContent: "space-between"
                                    }}>
                                        <div className='flex column' style={{ alignItems: "start" }}>
                                            <Typography variant="h5" className='hover underline' style={{ color: "black", fontWeight: "bold" }}>{item.title}</Typography>
                                            <Typography variant="h7" style={{ color: "black" }}>{item.user}</Typography>
                                        </div>
                                        <Typography variant="h6" className='flex' style={{ color: "black", gap:"10px" }}>{item.likes} <ThumbUp className='hover'/></Typography>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default App
