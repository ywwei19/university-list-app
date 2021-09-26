import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const GenericNotFound = () => {
  return (
    <Alert severity="error">
      <AlertTitle>404 Page Not Found</AlertTitle>
      This route is not available
    </Alert>
  );
}

export default GenericNotFound;
