import PropTypes from 'prop-types';
import { ImageListItem } from "@mui/material";
import logo from "../../assets/image/logo/FM DIAGNOSTIC.png";

const Logo = ({width}) => {
    return (
        <ImageListItem sx={{ width: {width} }}>
          <img src={logo} alt="logo" />
        </ImageListItem>
    );
};

Logo.propTypes = {
    width: PropTypes.string
};

export default Logo;
