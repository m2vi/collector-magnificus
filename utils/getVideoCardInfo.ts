const getVideoCardInfo = () => {
  try {
    const gl = document.createElement("canvas").getContext("webgl");

    if (!gl) {
      return {
        error: "no webgl",
      };
    }

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");

    if (debugInfo) {
      return {
        success: true,
        vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
        renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
      };
    }

    return {
      success: false,
      message: "no WEBGL_debug_renderer_info",
    };
  } catch (e) {
    return {
      success: false,
      message: "no WEBGL_debug_renderer_info",
    };
  }
};

export default getVideoCardInfo;
