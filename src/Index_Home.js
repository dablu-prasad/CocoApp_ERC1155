import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import NFT from "./mainEvent.json"
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css"
const eventNFT = '0xd786396Fc75737B531c027Ac4A6ba0116BA1243B';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 550,
    height: 280,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    height:"auto" 
};

function Index_Home() {

    const [open, setOpen] = React.useState(false);
    const [selectprice, setSelectPrice] = React.useState(0);
    const handleOpen = (nft) => {
        console.log(nft.ticketPrice.toString(),"price");
        setOpen(true)
        setSelectPrice(nft.ticketPrice.toString())
    }
    const handleClose = () => setOpen(false);
    const [numberOfTickets, setNumberOfTickets] = React.useState(0)
    

    const [nfts, setNfts] = useState([]);
    const [loadingState, setLoadingState] = useState('not-loaded');
    useEffect(() => { loadNFTs() }, []);

    async function loadNFTs() {

        const provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/db4fc7411bda4497941ae7da78ba2f9b");
        const tokenContract = new ethers.Contract(eventNFT, NFT.abi, provider);
        const data = await tokenContract.getEvents();

        const items = await Promise.all(data.map(async i => {
            let item = {
                eventID: i.eventID.toNumber(),
                ticketCount: i.ticketCount,
                ticketPrice: i.ticketPrice,
                image: i.imageURI,
                name: i.name,
                description: i.description,
                //     amount:meta.data.amount
            }
            return item;
        }));
        setNfts(items)
        setLoadingState('loaded');
        console.log("Items : ", items[0].ticketPrice);
        // pricePerTicket = items[0].ticketPrice;
    }

    return (
        <>
        <center>
            <h6>---------------------------------------------------------------------------------------</h6>
            <h2>List Of Events:</h2>
            </center>
            <div className="container c1">

                {nfts.map((nft, i) => (
                    <>
                    <Card key={i} sx={{ maxWidth: 360, marginTop: 10 }} onClick={()=>handleOpen(nft)}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={nft.image}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {nft.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {nft.description}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <h5><b>TicketPrice:{nft.ticketPrice.toString()} </b> </h5>
                            </Typography>     
                                

                        </CardContent>

                        
                       
     
                    </Card>
                    <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description" 
                                                  
                        >
                            <Box sx={style}>
                            <Typography variant="body2"  sx={{ fontSize: 18 }}>
                                       <span className="f1"> Event Name: </span> {nft.name} 
                                    </Typography>
                                    <Typography variant="body2"  sx={{ fontSize: 18 }}>
                                    <span className="f1">   Event Description: </span>  {nft.description} 
                                    </Typography>
                                    <Typography variant="body2"  sx={{ fontSize: 18 }}>
                                    <span className="f1">   Event Price: </span> {nft.ticketPrice.toString()} 
                                    </Typography>
                                <h6>---------------------------------------------------------------</h6>
                                <Typography variant="body2" sx={{ fontSize: 20 }}>
                                    Please enter the ticket amount
                                </Typography>
                                <div style={{ 'display': 'flex' }}>
                                    <TextField
                                        onChange={(e) => setNumberOfTickets(e.target.value)}
                                        sx={{ mt: 3 }}
                                        id="outlined-basic"
                                        label=" Ticket count"
                                        variant="outlined"
                                    />
                                     
                                    <Typography variant="body2" sx={{ fontSize: 18, p: 4 }}>
                                        Total Cost: {numberOfTickets * selectprice} 
                                    </Typography>

                                </div>
                                <CardActions color="primary">
                                    <div style={{ 'margin': 'auto' }}>
                                        <Button sx={{ mt: 3 }} variant="contained">
                                            Buy
                                        </Button>
                                    </div>
                                </CardActions>
                            </Box>
                        </Modal>
                    </>
                ))}

                       

            </div>
        </>
    );
}

export default Index_Home;