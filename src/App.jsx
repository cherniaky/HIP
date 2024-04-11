import { useState, useEffect } from 'react'
import Header, { modalStyle } from './components/Header.jsx'
import './App.css'
import SignIn from './components/SignIn.jsx';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import ListItem from './components/ListItem.jsx';
import { getFiles } from './firebase.js';

const mockData = [
    { title: "Plagiátorstvo", user: "JanAnonimus", likes: 12, filename: "plagiat.pdf", url: "hhttps://firebasestorage.googleapis.com/v0/b/hip-babic.appspot.com/o/SVT-1.pdf?alt=media&token=3d198b01-36ba-48fc-8824-f3e2b8c7f4c1ttps://firebasestorage.googleapis.com/v0/b/hip-babic.appspot.com/o/SVT-1.pdf?alt=media&token=3d198b01-36ba-48fc-8824-f3e2b8c7f4c1" }, { title: "Vývoj umelé inteligencie", user: "JanAnonimus", likes: 12, filename: "plagiat.pdf" }, { title: "Vývoj umelé inteligencie", user: "JanAnonimus", likes: 12, filename: "plagiat.pdf" }, { title: "Vývoj umelé inteligencie", user: "JanAnonimus", likes: 12, filename: "plagiat.pdf" }, { title: "Vývoj umelé inteligencie", user: "JanAnonimus", likes: 12, filename: "plagiat.pdf" }, { title: "Vývoj umelé inteligencie", user: "JanAnonimus", likes: 12, filename: "plagiat.pdf" }
]
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [data, setData] = useState([]);
    const [originaldata, setoriginalData] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        getFiles().then(files => {
            setData(files);
            console.log(files);
            setoriginalData(files);
        })
    }, [])

    const refreshData = () => {
        getFiles().then(files => {
            setData(files);
            setoriginalData(files);
        })
    }

    useEffect(() => {
        setData(originaldata.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase())));
    }, [searchText])

    return (
        <>
            <Header refreshData={refreshData} isLoggedIn={isLoggedIn} setLogin={setIsLoggedIn} />
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
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
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
                                {data.length === 0 && <Typography variant="h5" style={{ color: "black" }}>No files found</Typography>}
                                {data.map((item, index) => (
                                    <ListItem refreshData={refreshData} key={index} item={item} />
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
