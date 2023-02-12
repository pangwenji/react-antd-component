import defaultLocale from 'antd/lib/locale/default';

export interface ModalLocale {
  okText: string;
  cancelText: string;
  justOkText: string;
}

let runtimeLocale: ModalLocale = {
  ...(defaultLocale.Modal as ModalLocale),
};

export function changeConfirmLocale(newLocale?: ModalLocale) {
  if (newLocale) {
    runtimeLocale = {
      ...runtimeLocale,
      ...newLocale,
    };
  } else {
    runtimeLocale = {
      ...(defaultLocale.Modal as ModalLocale),
    };
  }
}

export function getConfirmLocale() {
  return runtimeLocale;
}
