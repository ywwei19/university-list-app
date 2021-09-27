import { Fragment, useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const SubscribedData = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [subData, setSubData] = useState([]);

    async function getSubData() {
        const response = await fetch('https://you-wei-1021-default-rtdb.firebaseio.com/subscribe.json');
        const result = await response.json();
        return result;
    }

    // @ts-ignore
    useEffect(async () => {
        setIsLoading(true);
        const allSubData = await getSubData()
        const allSubArr = [];

        for (const key in allSubData) {
            const data = {
                id: key,
                ...allSubData[key]
            };
            allSubArr.push(data);
        }
        setSubData(allSubArr)
        setIsLoading(false);
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

    const columns = [
        {
            field: 'email',
            headerName: 'Email',
            width: 300,
            editable: true,
        },
        { field: 'uniName', headerName: 'Search Name', width: 200 },
        {
            field: 'country',
            headerName: 'Search Country',
            width: 250,
            editable: true,
        },
        {
            field: 'results', headerName: 'Result', width: 300,
            renderCell: (params) => {
                const url = `http://universities.hipolabs.com/search?name=${params.row.uniName}&country=${params.row.country}`
                return (<a href={url} target="_blank">Link</a>)
            }
        }
    ];

    const rows = subData?.map((result, index) => {
        return {
            id: index,
            email: result.email,
            country: result.searchCountry,
            uniName: result.searchUniName,
            results: result,
        }
    })

    return (
        <Fragment>
            {rows && (<Box style={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    rowsPerPageOptions={[15]}
                    disableSelectionOnClick
                />
            </Box>)}
        </Fragment>
    );
}

export default SubscribedData;
