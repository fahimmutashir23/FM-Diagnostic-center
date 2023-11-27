import { Box, Typography } from "@mui/material";
import PropTypes from 'prop-types';

const SectionTitle = ({title}) => {
    return (
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              mt: 4,
              borderBottom: 2,
              color: '#9400FF',
              mb: 1
            }}
          >
            {title}
          </Typography>
        </Box>

    );
};

SectionTitle.propTypes = {
    title: PropTypes.string
};

export default SectionTitle;
