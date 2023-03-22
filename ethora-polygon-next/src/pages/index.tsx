import Head from "next/head";
import { useEffect, useState, useContext } from "react";
import Web3Modal from 'web3modal'
import {ethers} from 'ethers'
import { Web3ProviderContext } from '../context/Web3Provider';
import { useAppStore } from "@/store"

const providerOptions = {

}

export default function Home() {
  // const useAppStore()

  const [provider, setProvider] = useContext(Web3ProviderContext);

  async function connectWallet() {
    try {
      let web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions
      })

      const web3ModalInstance = await web3Modal.connect()
      const web3ModalProvider = new ethers.providers.Web3Provider(web3ModalInstance)
      setProvider(web3ModalProvider)
    } catch(error) {
      console.error(error)
    }
  }

  if (provider) {
    console.log(provider.provider.selectedAddress)
  }

  return (
    <>
      <Head>
        <title>Title</title>
      </Head>
      <main className="p-10">
        <h1 className="text-3xl">Polygon Ethora</h1>
        { !provider && <button onClick={connectWallet}>connect</button> }
        { provider && <div>{provider.provider.selectedAddress}</div> }
      </main>
    </>
  );
}
