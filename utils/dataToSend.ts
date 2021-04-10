import getVideoCardInfo from "./getVideoCardInfo";
import ip from "ip";
import isMobile from "./isMobile";
import isTouch from "./isTouch";
import platform from "platform";
import timeSiteIsOpened from "./timeSiteIsOpened";

export default function dataToSend(remoteAdress: string, geodata: any) {
  const body: any = {
    ip: {
      success: remoteAdress ? true : false,
      address: remoteAdress ? remoteAdress : false,
      format: remoteAdress
        ? ip.isV4Format(remoteAdress)
          ? "v4"
          : "v6"
        : false,
      isPrivate: remoteAdress ? ip.isPrivate(remoteAdress) : false,
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