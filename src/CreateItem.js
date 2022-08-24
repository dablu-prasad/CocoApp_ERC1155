import NFT from "./mainEvent.json"
import { useState } from "react";
import { ethers } from "ethers";
import { NFTStorage } from "nft.storage/dist/bundle.esm.min.js";
const API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweENkZTI1YzM5YjFDNjA0NmVmM2Q5M0E5MjIwNTc3QjI2NDIzRkIzNTIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MDY1MjMyNDUzNywibmFtZSI6Ik5GVCAyLjAifQ.H-k_ZgK5lKdqsCR4s7kAk7W9A-eRNmFliZLLL4ISexY';
const eventNFT = '0x9450B2536060b54Aa6B28e860D574d4C2910439A';

export default function CreateItem({ accounts, setAccounts }) {
    const [formInput, updateFormInput] = useState({ amount: '', price: '', name: '', description: '' })
    const isConnected = Boolean(accounts[0]);
    async function createEvent() {

        const file = document.querySelector('input[type="file"]');
        const { name, description, price, amount } = formInput;

        if (!name || !description || !price || !file || !amount) return

        /* first, upload to IPFS */
        const storage = new NFTStorage({ token: API_TOKEN });
        try {
            const metadata = await storage.store({
                name: name,
                description: description,
                price: price,
                amount: amount,
                image: file.files[0],
            });

            const imgUrl = metadata.embed().image.href;
            const name1 = metadata.data.name;
            const description1 = metadata.data.description;
            const amount1 = metadata.data.amount;
            const price1 = metadata.data.price;
            createSale(imgUrl, name1, description1, amount1, price1);

        } catch (error) {
            console.log('Error uploading file: ', error)
        }
        clearText();
    }

    function clearText() {
        document.getElementById('i1').value = "";
        document.getElementById('i2').value = "";
        document.getElementById('i3').value = "";
        document.getElementById('i4').value = "";
    }

    async function createSale(url, name1, description1, amount1, price1) {

        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner()

        let contract = new ethers.Contract(eventNFT, NFT.abi, signer)
        let result = await contract.mintEvent(name1, description1, amount1, price1, url);
        if (result) console.log("Event created successfully : ", result.hash);
    }
    return (
        <div className="container">
            {/* <Home/> */}
            <div className="mb-3">
                <label className="form-label">Event Name:</label>
                <input className="form-control" id="i1" onChange={e => updateFormInput({ ...formInput, name: e.target.value })} />
            </div>
            <div className="mb-3">
                <label className="form-label">Description:</label>
                <input className="form-control" id="i2" onChange={e => updateFormInput({ ...formInput, description: e.target.value })} />
            </div>
            <div className="mb-3">
                <label className="form-label">Price:</label>
                <input className="form-control" id="i3" onChange={e => updateFormInput({ ...formInput, price: e.target.value })} />
            </div>
            <div className="mb-3">
                <label className="form-label">Ticket Amount:</label>
                <input className="form-control" id="i4" onChange={e => updateFormInput({ ...formInput, amount: e.target.value })} />
            </div>
            <div>
                <div className="form__input">
                    <label style={{ 'padding': '8px' }} htmlFor="">Upload File</label>
                    <input type="file" className="upload__input" />
                </div>
            </div>
            <br></br>

            {isConnected ? (
                <div>
                    <button onClick={createEvent}>Create Event</button>
                </div>
            ) : (
                <p>Please connect wallet</p>
            )}
            <br />
        </div>
    )
}