import * as React from "react";
import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

export default function NavBar({ accounts, setAccounts }) {
    const isConnected = Boolean(accounts[0]);

    async function connectAccount() {
        console.log("Function hitting.");
        if (window.ethereum) {
            console.log("if condition is true.");
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            console.log("Fetched accounts : ", accounts);
            setAccounts(accounts);
        }
    }
    return (
        <Box
            sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    ></IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        COCO APP
                    </Typography>
                    {isConnected ? (
                        <Box variant="contained" color="secondary" sx={{ height: 40, marginLeft: 120 }}>
                            Connected : {accounts[0]}
                        </Box>
                    ) : (
                        <Button onClick={connectAccount} variant="contained" color="secondary" sx={{ height: 40, marginLeft: 120 }}>
                            Connect Wallet
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}




















// import React from 'react';
// import { Box, Button, Flex, Image, Link, Spacer } from '@chakra-ui/react';

// const NavBar = ({ accounts, setAccounts }) => {
//     const isConnected = Boolean(accounts[0]);

//     async function connectAccount() {
//         if (window.ethereum) {
//             const accounts = await window.ethereum.request({
//                 method: 'eth_requestAccounts',
//             });
//             setAccounts(accounts);
//         }
//     }

//     return (
//         <Flex justify="space-between" align="left" padding="30px">
//             <Flex justify="space-around" align="center" width="40%" padding="30px">
//                 <Box margin="0 15px">Create Event</Box>
//                 <Spacer />
//                 {
//                     isConnected ? (
//                         <Box margin="0 15px">Connected</Box>
//                     ) : (
//                         <Button
//                             backgroundColor="#D6517D"
//                             borderRadius="5px"
//                             boxShadow="0px 2px 2px 1px #0F0F0F"
//                             color="blue"
//                             cursor="pointer"
//                             fontFamily="inherit"
//                             padding="15px"
//                             margin="0 15px"
//                             onClick={connectAccount}>Connect Wallet</Button>
//                     )
//                 }
//             </Flex>
//         </Flex >
//     );
// }

// export default NavBar;