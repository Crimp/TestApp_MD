class DeviceHelper {
    static isHoverableDevice() {
        return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    }
}
class DeviceInfo {
    constructor(isMobileDevice, hasAccurateInput, isMac, isTouch = false) {
        this.isMobileDevice = false;
        this.hasAccurateInput = false;
        this.isMac = false;
        this.isTouchDevice = false;
        this.clientMinutesOffset = -(new Date().getTimezoneOffset());
        this.isMobileDevice = isMobileDevice;
        this.hasAccurateInput = hasAccurateInput;
        this.isMac = isMac;
        this.isTouchDevice = isTouch;
    }
}
class DeviceInfoService {
    constructor(useUAData, useNativeDetection) {
        this.useUAData = null;
        this.useNativeDetection = null;
        this.useUAData = useUAData;
        this.useNativeDetection = useNativeDetection;
    }
    getInfo() {
        return new DeviceInfo(this.isMobile(), window.matchMedia("(pointer:fine)").matches, /Mac/.test(navigator.userAgent), window.navigator.maxTouchPoints > 0);
    }
    isMobile() {
        const navigatorAsAny = window.navigator;
        const userAgentData = navigatorAsAny.userAgentData;
        if (this.useUAData && userAgentData)
            return !!userAgentData.mobile;
        const isMobileByUserAgent = this.isMobileByUserAgent(window.navigator.userAgent);
        if (this.useNativeDetection) {
            const isMobile = window.navigator.maxTouchPoints > 0 && window.matchMedia("(pointer:coarse)").matches;
            return isMobileByUserAgent || isMobile;
        }
        else
            return isMobileByUserAgent;
    }
    isMobileByUserAgent(userAgent) {
        return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    }
}
function getDeviceInfo(useUAData = true, useNativeDetection = true) {
    return new DeviceInfoService(useUAData, useNativeDetection).getInfo();
}
const devices = { DeviceInfo, DeviceInfoService, DeviceHelper, getDeviceInfo };

export { DeviceHelper as D, devices as d, getDeviceInfo as g };
//# sourceMappingURL=devices-24.2.js.map
