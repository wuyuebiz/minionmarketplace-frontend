import { atom } from "recoil";

const isOpenSelectWallet = atom({
  key: "isOpenSelectWallet",
  default: false,
});

export default {
  isOpenSelectWallet,
};
