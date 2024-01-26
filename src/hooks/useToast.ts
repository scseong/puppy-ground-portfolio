import { toast, ToastOptions, ToastPosition } from 'react-toastify';

class ToastOption {
  position: ToastPosition;
  hideProgressBar = true;
  autoClose = 1000;
  closeOnClick = true;
  pauseOnHover = false;
  draggable = false;
  icon: string | undefined;

  constructor({ position, timeout, icon }: Option) {
    this.autoClose = timeout;
    this.position = position;
    if (icon) this.icon = icon;
  }
}

type Option = {
  position: ToastPosition;
  timeout: number;
  icon?: string;
};

type ToastArgs = {
  message: string;
  timeout?: number;
};

export const useToast = () => {
  const successTopCenter = ({ message, timeout }: ToastArgs) => {
    const topCenter: ToastOptions = new ToastOption({
      position: 'top-center',
      timeout: timeout ?? 1000
    });
    toast.success(message, topCenter);
  };

  const errorTopCenter = ({ message, timeout }: ToastArgs) => {
    const topCenter: ToastOptions = new ToastOption({
      position: 'top-center',
      timeout: timeout ?? 1000
    });
    toast.error(message, topCenter);
  };

  const warnTopCenter = ({ message, timeout }: ToastArgs) => {
    const topCenter: ToastOptions = new ToastOption({
      position: 'top-center',
      timeout: timeout ?? 1000
    });
    toast.warn(message, topCenter);
  };

  const successTopRight = ({ message, timeout }: ToastArgs) => {
    const topCenter: ToastOptions = new ToastOption({
      position: 'top-right',
      timeout: timeout ?? 1000
    });
    toast.success(message, topCenter);
  };

  const errorTopRight = ({ message, timeout }: ToastArgs) => {
    const topCenter: ToastOptions = new ToastOption({
      position: 'top-right',
      timeout: timeout ?? 1000
    });
    toast.error(message, topCenter);
  };

  const warnTopRight = ({ message, timeout }: ToastArgs) => {
    const topCenter: ToastOptions = new ToastOption({
      position: 'top-right',
      timeout: timeout ?? 1000
    });
    toast.warn(message, topCenter);
  };

  const alertBottomRight = ({ message, timeout }: ToastArgs) => {
    const topCenter: ToastOptions = new ToastOption({
      position: 'bottom-right',
      timeout: timeout ?? 1000,
      icon: '🔔'
    });
    toast.info(message, topCenter);
  };

  return {
    successTopCenter,
    errorTopCenter,
    warnTopCenter,
    successTopRight,
    errorTopRight,
    warnTopRight,
    alertBottomRight
  };
};
