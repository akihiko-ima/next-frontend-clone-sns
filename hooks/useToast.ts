import toast from "react-hot-toast";

const useToast = () => {
  const toastSucces = (msg: string) =>
    toast.success(msg, {
      duration: 2500,
      position: "bottom-right",
      style: {
        minWidth: "350px",
        borderRadius: "10px",
        padding: "16px",
      },
    });

  const toastError = (msg: string) =>
    toast.error(msg, {
      duration: 2500,
      position: "bottom-right",
      style: {
        minWidth: "350px",
        borderRadius: "10px",
        padding: "16px",
      },
    });

  return { toastSucces, toastError };
};

export default useToast;
