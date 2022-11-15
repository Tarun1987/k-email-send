import { useContext } from "react";
import ToastContext from "./context";

function useToast() {
	const context = useContext(ToastContext);
	return {
		success: context.success,
		danger: context.danger,
		remove: context.remove,
	};
}
export default useToast;
