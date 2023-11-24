import PropTypes from 'prop-types';
import { Box } from "@mui/material";
import { Watch } from "react-loader-spinner";

const Loading = ({height, width, color}) => {
  return (
    <Box>
      <Watch
        height={height}
        width={width}
        radius="48"
        color={color}
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </Box>
  );
};

Loading.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  color: PropTypes.string,
};

export default Loading;
