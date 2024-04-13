import { useState, useEffect } from 'react'
import Header, { modalStyle } from './components/Header.jsx'
import './App.css'
import SignIn from './components/SignIn.jsx';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import ListItem from './components/ListItem.jsx';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { getFiles } from './firebase.js';

export const univerzity = [{ value: 1, label: "TUKE" }, { value: 2, label: "UPJS" }]
export const fakulty = [{ value: 1, label: "FEI", univerzita: 1 }, { value: 2, label: "SjF", univerzita: 1 }, { value: 3, label: "LF", univerzita: 2 }]
export const predmety = [
    { value: 1, label: "RIP", univerzita: 1, fakulta: 1 },
    { value: 2, label: "SVT", univerzita: 1, fakulta: 1 },
    { value: 3, label: "HIP", univerzita: 1, fakulta: 1 },
    { value: 4, label: "KMA", univerzita: 1, fakulta: 2 },
    { value: 5, label: "KMA", univerzita: 2, fakulta: 3 }]

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [data, setData] = useState([]);
    const [originaldata, setoriginalData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [univerzita, setUniverzita] = useState(null);
    const [fakulta, setFakulta] = useState(null);
    const [predmet, setPredmet] = useState(null);

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

    useEffect(() => {
        setFakulta(null);
        setPredmet(null);
    }, [univerzita])

    useEffect(() => {
        setPredmet(null);
    }, [fakulta])

    return (
        <>
            <Header refreshData={refreshData} isLoggedIn={isLoggedIn} setLogin={setIsLoggedIn} />
            <div style={{ marginTop: "77px", padding: "40px 100px" }}>
                {!isLoggedIn ? <SignIn setIsLoggedIn={setIsLoggedIn} /> :
                    <>
                        <div className='flex column' style={{ alignItems: "start", gap: "30px" }}>
                            {/* <Breadcrumbs aria-label="breadcrumb" style={{ fontSize: "22px" }}>
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

                            </Breadcrumbs> */}
                            <div className='flex' style={{ width: "100%", gap: "10px" }}>
                                <FormControl fullWidth>
                                    <InputLabel id="univerzita-label">University</InputLabel>
                                    <Select
                                        labelId="univerzita-label"
                                        value={univerzita}
                                        label="Univerzita"
                                        onChange={(e) => setUniverzita(e.target.value)}
                                    >
                                        <MenuItem value={null}> </MenuItem>
                                        {univerzity.map((item) => (
                                            <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth>
                                    <InputLabel id="fakulta-label">Faculty</InputLabel>
                                    <Select
                                        labelId="fakulta-label"
                                        value={fakulta}
                                        label="Fakulta"
                                        onChange={(e) => setFakulta(e.target.value)}
                                    >
                                        <MenuItem value={null}> </MenuItem>
                                        {fakulty.filter((f) => f.univerzita === univerzita).map((item) => (
                                            <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel id="Predmet-label">Class</InputLabel>
                                    <Select
                                        labelId="Predmet-label"
                                        value={predmet}
                                        label="Predmet"
                                        onChange={(e) => setPredmet(e.target.value)}
                                    >
                                        <MenuItem value={null}>   </MenuItem>
                                        {predmety.filter((p) => p.univerzita === univerzita && p.fakulta === fakulta).map((item) => (
                                            <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <TextField
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                label="Search"
                                fullWidth
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
                            <Typography variant="h4" style={{ color: "black", fontWeight: "bold" }}>Materials</Typography>

                            <div style={{ width: "100%" }}>
                                {data.length === 0 && <Typography variant="h5" style={{ color: "black" }}>No files found</Typography>}
                                {data.filter(value => (!univerzita || value.univerzita === univerzita)
                                    && (!fakulta || value.fakulta === fakulta)
                                    && (!predmet || value.predmet === predmet)).map((item, index) => (
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
