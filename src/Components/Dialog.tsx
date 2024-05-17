import { Box, Dialog as MUIDialog, Typography } from "@mui/material";
import React from "react";

export type DialogRef = {
    open: () => void;
};

type Props = {
    text: string;
};

const Dialog = React.forwardRef<DialogRef, Props>(({ text }, ref) => {
    const [open, setOpen] = React.useState(false);

    React.useImperativeHandle(ref, () => ({
        open: () => {
            setOpen(true);
        }
    }));

    return (
        <MUIDialog
            open={ open }
            onClose={() => setOpen(false)}
            sx={{ opacity: 0.9 }}
        >
            <Box
                sx={{
                    my: 3,
                    mx: 5,
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    width: "15vw"
                }}
            >
                <Typography sx={{ display: "block" }}>{ text }</Typography>
            </Box>
        </MUIDialog>
    );
});

export default Dialog;