import React from 'react';
import Alert from '@mui/material/Alert';

export const getResultsRows = (result) => {
    const rows = result?.map((result, index) => {
        return {
            id: index,
            name: result.name,
            country: result.country,
            web: result.web_pages
        }
    })
    return rows;
}

export const getResultsColumns = () => [
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
]

export const getSuccessMessage = (fav) => fav ? <Alert severity="success">Added to favorite</Alert> : <Alert severity="success">Subscribed your search</Alert>;

export const customSelectStyles = {
    control: (provided) => {
        return { ...provided, minHeight: '55px', textAlign: 'initial' };
    }
}

export const getUniList = async (searchUniName, searchCountry) => {
    const response = await fetch(`http://universities.hipolabs.com/search?name=${searchUniName}&country=${searchCountry}`);
    const result = await response.json();
    return result;
}

export const getSubData = async () => {
    const response = await fetch('https://you-wei-1021-default-rtdb.firebaseio.com/subscribe.json');
    const result = await response.json();
    return result;
}