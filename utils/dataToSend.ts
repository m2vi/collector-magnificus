import getVideoCardInfo from "./getVideoCardInfo";
import * as ipTool from "ip";
import isMobile from "./isMobile";
import isTouch from "./isTouch";
import platform from "platform";
import timeSiteIsOpened from "./timeSiteIsOpened";

export default async function dataToSend({ ip }: any) {
  const remoteAdress = ip;
  let geodata = false;
  if (remoteAdress) {
    const req = await fetch(`/api/geolocation`, {
      method: "POST",
      headers: { "Access-Control-Allow-Origin": "*" },
      body: remoteAdress,
    });

    geodata = await req.json();
  }

  const body: any = {
    ip: {
      success: remoteAdress ? true : false,
      address: remoteAdress ? remoteAdress : false,
      format: remoteAdress
        ? ipTool.isV4Format(remoteAdress)
          ? "v4"
          : "v6"
        : false,
      isPrivate: remoteAdress ? ipTool.isPrivate(remoteAdress) : false,
    },
    geolocation: geodata,
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
      time: new Date(),
      timeSiteIsOpened: timeSiteIsOpened(),
      timezone: new Date().getTimezoneOffset() / 60,
      onLine: navigator.onLine,
      // @ts-ignore
      usesBrave: typeof navigator.brave !== "undefined" ? true : false,
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
  return body;
}
