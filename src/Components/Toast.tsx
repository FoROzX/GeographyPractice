import { Snackbar } from "@mui/material";
import { isNil } from "lodash";
import React from "react";

export type ToastRef = {
    open: (text: string, duration: number) => void;
    close: () => void;
};

let timeout: NodeJS.Timeout|undefined;

const Toast = React.forwardRef<ToastRef>(({}, ref) => {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");

    const openFunction = React.useCallback((text: string, duration: number) => {
        if(!isNil(timeout)){
            clearTimeout(timeout);
        }

        setOpen(true);
        setMessage(text);

        timeout = setTimeout(() => {
            closeFunction();
            timeout = undefined;
        }, duration);
    }, []);
    const closeFunction = React.useCallback(() => {
        setOpen(false);
        setMessage("");
    }, []);

    React.useImperativeHandle(ref, () => ({
        open: openFunction,
        close: closeFunction
    }), [openFunction, closeFunction]);

    return (
        <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={ open }
            message={ message }
            sx={{ mb: "40vh" }}
        />
    );
});

export default Toast;