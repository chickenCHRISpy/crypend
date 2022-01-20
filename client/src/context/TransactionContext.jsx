import React, { useEffect, useState, useContext } from "react";
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)

    console.log({
        provider,
        signer,
        transactionContract
    });
    return transactionContract;
}


export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({
        addressTo: '', amount: '', keyword: '', message: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));

    const [transactions, setTransactions] = useState([])
    const handleChange = (e, name) => {
        setFormData((prevState) =>
            ({ ...prevState, [name]: e.target.value }))
    }

    const getAllTransactions = async () => {
        try {
            if (!ethereum) return alert("Please install Metamask wallet!");
            const transactionContract = getEthereumContract();

            const availableTransactions = await transactionContract.getAllTransactions();

            const structuredTransactions = availableTransactions.map((transaction) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10 ** 18)
            }))
            console.log(structuredTransactions);
            setTransactions(structuredTransactions)
        } catch (error) {
            console.log(error);
        }
    }

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please install Metamask wallet!");

            const accounts = await ethereum.request({
                method: 'eth_accounts'
            })

            if (accounts.length) {
                setCurrentAccount(accounts[0]);

                getAllTransactions();
            } else {
                console.log("No Account Found!");
            }
            console.log(accounts);

        } catch (error) {
            console.log(error);
            throw new Error("No Ethereum object.")
        }


    }

    const checkIfTransactionsExist = async () => {
        try {
            const transactionContract = getEthereumContract();
            const transactionsCount = await transactionContract.getTransactionCount()

            window.localStorage.setItem("transactionCount", transactionCount)

        } catch (error) {
            console.log(error);
            throw new Error("No Ethereum object.")
        }
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install Metamask wallet!");
            const accounts = await ethereum.request({
                method: 'eth_requestAccounts'
            })
            setCurrentAccount(accounts[0])
        } catch (error) {
            console.log(error);
            throw new Error("No Ethereum object.")
        }
    }

    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Please install Metamask wallet!");

            //get data from form
            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract();
            //convert amount and gas to hexadecimal 
            const parsedAmount = ethers.utils.parseEther(amount)
            //parseEther parses amount into hexadecimal gwei

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', //gas fee in gwei approx 21000 ie 0.000021 ether
                    value: parsedAmount._hex,
                }]
            });

            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword)
            //as transaction takes time we add loading component here
            setIsLoading(true)
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            console.log(`Success - ${transactionHash.hash}`);
            setIsLoading(false);

            const transactionsCount = await transactionContract.getTransactionCount()

            setTransactionCount(transactionsCount.toNumber());

            window.reload()

        } catch (error) {
            console.log(error);
            throw new Error("No Ethereum object.")
        }
    }





    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
    }, [transactionCount])

    return (
        <TransactionContext.Provider value={{
            connectWallet,
            currentAccount,
            formData,
            setFormData,
            handleChange,
            sendTransaction,
            transactions,
            isLoading
        }} >
            {children}
        </TransactionContext.Provider>

    )
}


