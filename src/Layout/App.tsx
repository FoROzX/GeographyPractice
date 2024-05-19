import { AppBar, Avatar, Box, IconButton, Menu, MenuItem, Tab, TableContainer, Tabs, Toolbar } from "@mui/material";
import { isNil } from "lodash";
import React from "react";
import { useNavigate } from "react-router";

type Props = {
    children: React.ReactNode;
};

function App({ children }: Props){
    const navTo = useNavigate();

    const [userMenuAnchor, setUserMenuAnchor] = React.useState<HTMLElement>();

    const pages = React.useMemo(() => {
        return [
            {
                name: "Countries",
                path: "/GeographyPractice/"
            },
            {
                name: "Find country",
                path: "/GeographyPractice/findby/"
            },
            {
                name: "List countries",
                path: "/GeographyPractice/list/"
            }
        ];
    }, []);

    const openUserMenu = React.useCallback((e: React.MouseEvent<HTMLElement>) => {
        setUserMenuAnchor(e.currentTarget);
    }, []);
    const closeUserMenu = React.useCallback(() => {
        setUserMenuAnchor(undefined);
    }, []);

    return (
        <AppBar position="static">
            <TableContainer sx={{ width: "100vw", height: "100vh" }}>
                <Toolbar
                    disableGutters
                    sx={{
                        width: "99vw",
                        mx: "auto",
                        display: "flex",
                        justifyContent: "center",
                        borderBottom: 1,
                        borderColor: "divider",
                        columnGap: "40vw"
                    }}
                >
                    <Box>
                        <Tabs
                            value={ location.pathname }
                        >
                            {
                                pages.map(page => (
                                    <Tab
                                        key={ page.path }
                                        onClick={() => navTo(page.path)}
                                        label={ page.name }
                                        value={ page.path }
                                    />
                                ))
                            }
                        </Tabs>
                    </Box>

                    <Box>
                        <IconButton onClick={ openUserMenu }>
                            <Avatar />
                        </IconButton>

                        <Menu
                            sx={{ mt: '45px' }}
                            anchorEl={userMenuAnchor}
                            open={!isNil(userMenuAnchor)}
                            onClose={ closeUserMenu }
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <MenuItem
                                onClick={() => {
                                    navTo("/GeographyPractice/settings");
                                    closeUserMenu();
                                }}
                            >
                                Settings
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>

                { children }
            </TableContainer>
        </AppBar>
    );
}

export default App;