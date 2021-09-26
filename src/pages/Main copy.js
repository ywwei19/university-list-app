import React, { useEffect, useState } from "react";
import Select from 'react-select';
import allUniCountry from '../allCountry.json'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';
import { createStyles, makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Root = styled('div')(({ theme }) => ({
    [theme.breakpoints.down('lg')]: {
        paddingTop: '155px'
    },
  }));

const useStyles = makeStyles((theme) =>
    createStyles({
        emailContainer: {
            margin: '25px 0 25px'
        },
        btnContainer: {
            marginTop: '10px'
        },
        textContainer: {
            marginTop: '7px'
        },
        results: {
            height: 600,
            width: '100%',
            marginTop: '50px'
        },
        country: {
            height: '55px',
            textAlign: 'inherit',
        },
        result: {
            paddingTop: '50px'
        },
    }),
);

async function searchUni(searchUniName, searchCountry) {
    const response = await fetch(`http://universities.hipolabs.com/search?name=${searchUniName}&country=${searchCountry}`);
    const result = await response.json();
    return result;
}

async function getSubData() {
    const response = await fetch('https://you-wei-1021-default-rtdb.firebaseio.com/subscribe.json');
    const result = await response.json();
    return result;
}

const Main = () => {
    const [searchResults, setSearchResults] = useState();
    const [searchCountry, setSearchCountry] = useState('');
    const [searchUniName, setSearchUniName] = useState('');
    const [email, setEmail] = useState('');
    const [emailErrMsg, setEmailErrMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [fav, setFav] = useState(false);
    const [isSub, setSub] = useState(false);
    const [pageSize, setPageSize] = useState(15);
    const classes = useStyles();
    let favorites = [];

    const displayText = () => fav ? <Alert severity="success">Added to favorite</Alert> : <Alert severity="success">Subscribed your search</Alert>;


    const handleChange = e => {
        setSearchUniName(e.target.value);
    };

    const handleSubChange = e => {
        setEmail(e.target.value);
    };

    const handleSub = async () => {
        setEmailErrMsg('')
        if (typeof email !== "undefined") {
            const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(email)) {
                setEmailErrMsg('Invalid email format, please try again');
                return;
            }
        }
        let isDuplicatedEmail = false;
        const allSubData = await getSubData()
        const allSubArr = [];

        for (const key in allSubData) {
            const data = {
                id: key,
                ...allSubData[key]
            };
            allSubArr.push(data);
        }
        allSubArr.forEach((data) => {
            if (data?.email === email) {
                isDuplicatedEmail = true;
            }
        })
        if (!isDuplicatedEmail) {
            const subBody = {
                email,
                searchCountry,
                searchUniName,
                searchResults
            }
            const settings = {
                method: 'POST',
                body: JSON.stringify(subBody),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            }
            const fetchResponse = await fetch('https://you-wei-1021-default-rtdb.firebaseio.com/subscribe.json', settings);
            const data = await fetchResponse.json();
            setSub(true)
            setTimeout(() => { setSub(false) }, 3000);
            return data;
        }
        setEmailErrMsg('Duplicated email');
    };

    const handleSearch = async () => {
        //add statement prevent search to call api to get all uni again if got local data
        setIsLoading(true);
        const filteredUni = await searchUni(searchUniName, searchCountry);
        setSearchResults(filteredUni)
        setIsLoading(false)
    };

    const handleClear = () => {
        setSearchCountry('');
        setSearchUniName('');
        setEmail('');
    };

    const handleRowsClick = (param) => {
        if (favorites.includes(param?.row) === false) {
            favorites.push(param?.row);
        }
    }

    const handleFav = async () => {
        const settings = {
            method: 'POST',
            body: JSON.stringify(favorites),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }
        await fetch('https://you-wei-1021-default-rtdb.firebaseio.com/favorite.json', settings);
        setFav(true)
        setTimeout(() => { setFav(false) }, 3000);
    };

    // @ts-ignore
    useEffect(async () => {
        let localData = localStorage.getItem("uni");
        if (localData) {
            localData = JSON.parse(localData);
            setSearchResults(localData)
            setIsLoading(false);
        } else {
            setIsLoading(true);
            const filteredUni = await searchUni(searchUniName, searchCountry);
            localStorage.setItem("uni", JSON.stringify(filteredUni));
            setSearchResults(filteredUni)
            setIsLoading(false);
        }
    }, []);

    if (isLoading) {
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    const customStyles = {
        control: (provided) => {
            return { ...provided, minHeight: '55px', textAlign: 'initial' };
        }
    }

    const columns = [
        { field: 'name', headerName: 'Name', width: 500 },
        {
            field: 'country',
            headerName: 'Country',
            width: 300,
            editable: true,
        },
        {
            field: 'web',
            headerName: 'Website',
            width: 300,
            editable: true,
        },
    ];

    const rows = searchResults?.map((result, index) => {
        return {
            id: index,
            name: result.name,
            country: result.country,
            web: result.web_pages
        }
    })

    return (
        <Box>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <TextField
                            id="outlined-name"
                            label="Search"
                            value={searchUniName}
                            fullWidth
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <Select
                            styles={customStyles}
                            placeholder={searchCountry === '' ? <div>Select Country</div> : <div>{searchCountry}</div>}
                            options={allUniCountry}
                            onChange={opt => setSearchCountry(opt.value)}
                        />
                    </Grid>
                    <Grid item xs={2} >
                        <Box className={classes.btnContainer}>
                            <IconButton color="primary" onClick={handleSearch}>
                                <SearchIcon />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item>
                        <Button onClick={handleClear}>Clear</Button>
                    </Grid>
                </Grid>
                <Box className={classes.emailContainer}>
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <TextField
                                id="outlined-name"
                                label="Email address"
                                value={email}
                                fullWidth
                                onChange={handleSubChange}
                            />
                        </Grid>
                        <Grid  item xs={3}>
                            <Button variant="outlined" onClick={handleSub}>Subscribe</Button>
                        </Grid>
                        <Grid  item xs={3}>
                            <Button variant="outlined" onClick={handleFav}>Add to favorite</Button>
                        </Grid>
                        {(fav || isSub) && (<Grid item>
                            <Box className={classes.textContainer}>{displayText()}</Box>
                        </Grid>)}
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            {emailErrMsg && (<Alert severity="error">{emailErrMsg}</Alert>)}
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            {rows && (<Box className={classes.results}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[15, 30, 50]}
                    onRowClick={handleRowsClick}
                />
            </Box>)}
        </Box>
    );
}

export default Main;