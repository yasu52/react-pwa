import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    root: {
        width: "100%",
        height: 56,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#FFF",
        backgroundColor: "#ff66b3",
        position: "fixed",
        bottom: 0,
    },
}));

const Footer = () => {
    const classes = useStyles();
    return(
        <Box className={classes.root} >Copyright: Yasuhiro Yoshida</Box>
    )
};
export default Footer