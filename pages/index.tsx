import Head from "next/head";
import { useEffect } from "react";

import "react-notifications/lib/notifications.css";
import "react-notifications/lib/";

import vitals from "web-vitals";
import ip from "ip";
import platform from "platform";

import isMobile from "../utils/isMobile";
import isTouch from "../utils/isTouch";
import getVideoCardInfo from "../utils/getVideoCardInfo";

declare global {
  interface Window {
    ip: any;
  }
}
export default function Home() {
  let sendData = async () => {
    window.ip = ip;
    const geodata = await fetch(`/api/geolocation`, {
      method: "POST",
      body: JSON.stringify({
        ip: ip.address(),
      }),
      headers: { "Content-Type": "application/json" },
    });

    const body: any = {
      ip: {
        address: ip.address(),
        isPrivate: ip.isPrivate(ip.address()),
        format: ip.isV4Format(ip.address()) ? "v4" : "v6",
      },
      geolocation: await geodata.json(),
      platform: platform,
      system: {
        isMobile: isMobile,
        isTouch: isTouch,
      },
      graphics: {
        height: window.screen.height,
        width: window.screen.width,
        videocard: getVideoCardInfo(),
      },
      core: {
        cores: navigator.hardwareConcurrency,
      },
    };

    const res = await fetch("/api/upload", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    console.log(await res.json());

    // if (res.status === 200) {
    //   console.log(res.status);
    //   sendData = async () => {};
    // }
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
      <button className={`btn primary bubbly-button`} onClick={sendData}>
        Launch
      </button>
    </div>
  );
}
