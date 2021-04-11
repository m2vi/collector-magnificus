import Head from "next/head";

import {
  NotificationContainer,
  NotificationManager,
  // @ts-ignore
} from "react-notifications";

import dataToSend from "../utils/dataToSend";
import Loader from "../components/loader";

import useSWR from "swr";
import fetcher from "../utils/fetcher";
import { useState } from "react";

declare global {
  interface Window {
    ip: any;
  }
}
export default function Home() {
  const [success, setSuccess] = useState(false);
  const [loadingClass, setLoadingClass] = useState("not-loading");
  let { data, error } = useSWR("https://api.ipify.org/?format=json", fetcher);

  if (typeof error !== "undefined") {
    data = false;
  }

  const remoteAdress = data;

  let sendData = async () => {
    setLoadingClass("loading");

    await fetch("/api/upload", {
      method: "POST",
      body: JSON.stringify(await dataToSend(remoteAdress)),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        onSuccess(res);
        setLoadingClass("not-loading");
        setSuccess(true);
      })
      .catch((err) => {
        onError(err);
        setLoadingClass("not-loading");
        setSuccess(false);
      });
  };

  const onError = async (error: any, message?: string) => {
    console.log({
      error: error,
      time: new Date(),
    });
    NotificationManager.error(
      message ||
        "It's a pity, there's been an error. If you want to know more, take a look at the console.",
      <>
        <img src="/icons/error.svg" alt="Error"></img>
      </>
    );
  };

  const onSuccess = async (data: any, message?: string) => {
    console.log(data);
    NotificationManager.success(
      message || "Data has been sent. Thank you for participating!",
      <>
        <img src="/icons/success.svg" alt="Success" width="24"></img>
      </>
    );
  };

  return (
    <div className="flex justify-center items-center min-h-100">
      <Head>
        <title>Launch</title>
      </Head>
      <button
        className={`btn primary ${loadingClass}`}
        onClick={sendData}
        disabled={success}
      >
        <span>Launch</span>
        <Loader />
      </button>
      <NotificationContainer />
    </div>
  );
}
