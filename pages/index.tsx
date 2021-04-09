import Head from "next/head";

import "react-notifications/lib/notifications.css";
import "react-notifications/lib/";

import getVideoCardInfo from "../utils/getVideoCardInfo";
import ip from "ip";
import isMobile from "../utils/isMobile";
import isTouch from "../utils/isTouch";
import platform from "platform";
import timeSiteIsOpened from "../utils/timeSiteIsOpened";

import useSWR from "swr";
import fetcher from "../utils/fetcher";

declare global {
  interface Window {
    ip: any;
  }
}
export default function Home() {
  const { data, error } = useSWR("https://api.ipify.org/?format=json", fetcher);

  if (typeof error !== undefined) {
    // error
  }

  const remoteAdress = data;

  let sendData = async () => {
    const geodata = await fetch(
      `http://ip-api.com/json/${remoteAdress}?fields=status,message,continent,country,regionName,city,district,zip,lat,lon,timezone,isp,org,as,asname,mobile,proxy,hosting,query`,
      {
        method: "GET",
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    );

    const body: any = {
      ip: {
        address: remoteAdress,
        format: ip.isV4Format(remoteAdress) ? "v4" : "v6",
        isPrivate: ip.isPrivate(remoteAdress),
      },
      geolocation: await geodata.json(),
      platform: platform,
      system: {
        cookieEnabled: navigator.cookieEnabled,
        doNotTrack: navigator.doNotTrack === "1" ? true : false,
        isMobile: isMobile(),
        isTouch: isTouch(),
        javaEnabled: navigator.javaEnabled(),
        language: navigator.language,
        pageOn: window.location.pathname,
        referrer: document.referrer,
        timeOpened: new Date(),
        timeSiteIsOpened: timeSiteIsOpened(),
        timezone: new Date().getTimezoneOffset() / 60,
      },
      graphics: {
        availHeight: window.screen.availHeight,
        availWidth: window.screen.availWidth,
        height: window.screen.height,
        innerHeight: innerHeight,
        innerWidth: innerWidth,
        pixelDepth: window.screen.pixelDepth,
        videocard: getVideoCardInfo(),
        width: window.screen.width,
        orientation: window.screen.orientation,
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
