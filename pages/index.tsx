import Head from "next/head";

import {
  NotificationContainer,
  NotificationManager,
  // @ts-ignore
} from "react-notifications";

import dataToSend from "../utils/dataToSend";

import useSWR from "swr";
import fetcher from "../utils/fetcher";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    ip: any;
  }
}
export default function Home() {
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
        console.log(res);
        setLoadingClass("not-loading");
      });
  };

  const onError = async (error: any) => {
    console.log({
      error: error,
      time: new Date(),
    });
    NotificationManager.error(
      "It's a pity, there's been an error. If you want to know more, take a look at the console.",
      <>
        <img src="/icons/error.svg" alt="Error"></img>
      </>
    );
  };

  return (
    <div className="flex justify-center items-center min-h-100">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#0d1014"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#0d1014" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#0d1014" />

        <title>Home</title>
      </Head>
      <button className={`btn primary ${loadingClass}`} onClick={sendData}>
        <span>Launch</span>
        <div className="loader">
          <svg
            version="1.1"
            id="loader-1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="24px"
            height="24px"
            viewBox="0 0 50 50"
            xmlSpace="preserve"
          >
            <path
              fill="#fff"
              d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
            >
              <animateTransform
                attributeType="xml"
                attributeName="transform"
                type="rotate"
                from="0 25 25"
                to="360 25 25"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
      </button>
      <NotificationContainer />
    </div>
  );
}
