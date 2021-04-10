import Head from "next/head";

import "react-notifications/lib/notifications.css";
import "react-notifications/lib/";

import dataToSend from "../utils/dataToSend";

import useSWR from "swr";
import fetcher from "../utils/fetcher";

declare global {
  interface Window {
    ip: any;
  }
}
export default function Home() {
  let { data, error } = useSWR("https://api.ipify.org/?format=json", fetcher);

  if (typeof error !== "undefined") {
    data = false;
  }

  const remoteAdress = data;

  let sendData = async () => {
    let geodata = false;
    if (remoteAdress) {
      const req = await fetch(`/api/geolocation`, {
        method: "POST",
        headers: { "Access-Control-Allow-Origin": "*" },
        body: remoteAdress,
      });

      geodata = await req.json();
    }

    const res = await fetch("/api/upload", {
      method: "POST",
      body: JSON.stringify(dataToSend(remoteAdress, geodata)),
      headers: { "Content-Type": "application/json" },
    });

    console.log(await res.json());

    if (res.status === 200) {
      sendData = async () => {};
    }
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
      <button className={`btn primary not-loading`} onClick={sendData}>
        Launch
      </button>
    </div>
  );
}
