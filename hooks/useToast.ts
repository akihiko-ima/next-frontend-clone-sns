import toast from "react-hot-toast";

const useToast = () => {
  const toastSucces = (msg: string) =>
    toast.success(msg, {
      duration: 3000,
      position: "top-center",
      style: {
        minWidth: "350px",
        borderRadius: "10px",
        padding: "16px",
      },
    });

  const toastError = (msg: string) =>
    toast.error(msg, {
      duration: 3000,
      position: "top-center",
      style: {
        minWidth: "350px",
        borderRadius: "10px",
        padding: "16px",
      },
    });

  return { toastSucces, toastError };
};

export default useToast;
