import ToastManager from "./components/ToastManager";

export const Toast = {
    default: ToastManager.default,
    dark: ToastManager.dark,
    info: ToastManager.info,
    success: ToastManager.success,
    warning: ToastManager.warning,
    error: ToastManager.error
};
export default ToastManager;