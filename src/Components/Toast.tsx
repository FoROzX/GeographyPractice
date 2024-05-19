import { Snackbar } from "@mui/material";
import React from "react";

export type ToastRef = {
    open: (duration: number) => void;
    close: () => void;
};

type Props = {
    text: string;
};

const Toast = React.forwardRef<ToastRef, Props>(({ text }, ref) => {
    const [open, setOpen] = React.useState(false);

    React.useImperativeHandle(ref, () => ({
        open: (duration: number) => {
            setOpen(true);

            setTimeout(() => {
                setOpen(false);
            }, duration);
        },
        close: () => {
            setOpen(false)
        }
    }));

    return (
        <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={ open }
            message={ text }
            sx={{ mb: "40vh" }}
        />
    );
});

export default Toast;