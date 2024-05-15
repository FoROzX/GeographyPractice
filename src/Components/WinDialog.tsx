import { Box, Dialog, Typography } from "@mui/material";
import React from "react";
import { Country } from "../Types/Country";

export type WinDialogRef = {
    open: () => void;
};

type Props = {
    country?: Country;
};

const WinDialog = React.forwardRef<WinDialogRef, Props>(({ country }, ref) => {
    const [open, setOpen] = React.useState(false);

    React.useImperativeHandle(ref, () => ({
        open: () => {
            setOpen(true);
        }
    }));

    return (
        <Dialog
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
                <Typography sx={{ display: "block" }}>{ country!.name } is the correct country!</Typography>
            </Box>
        </Dialog>
    );
});

export default WinDialog;