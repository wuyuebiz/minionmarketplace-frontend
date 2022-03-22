import { useSetRecoilState } from "recoil";
import appStore from "../store/appStore";

const useSelectWallet = () => {
  const setIsOpenSelectWallet = useSetRecoilState(appStore.isOpenSelectWallet);
  const openSelectWallet = () => {
    setIsOpenSelectWallet(true);
  };

  return {
    openSelectWallet,
  };
};

export default useSelectWallet;
