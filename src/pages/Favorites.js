import { Fragment, useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


const FavoritesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [favData, setFavData] = useState([]);

  async function getFavData() {
    const response = await fetch('https://you-wei-1021-default-rtdb.firebaseio.com/favorite.json');
    const result = await response.json();
    return result;
  }

  // @ts-ignore
  useEffect(async () => {
    setIsLoading(true);
    const allFavData = await getFavData()
    const allFavArr = [];

    for (const key in allFavData) {
      const data = {
        id: key,
        ...allFavData[key]
      };
      allFavArr.push(data);
    }
    setFavData(allFavArr)
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

  const rows = favData?.map((result, index) => {
    return {
      id: index,
      name: result[0].name,
      country: result[0].country,
      web: result[0].web
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

export default FavoritesPage;
