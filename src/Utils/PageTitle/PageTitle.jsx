import { Box } from '@mui/material';
import { Helmet } from 'react-helmet-async';

// eslint-disable-next-line react/prop-types
const PageTitle = ({title}) => {
    return (
        <Box><Helmet><title>FM Diagnostic Center || {title}</title></Helmet></Box>
    );
};

export default PageTitle;