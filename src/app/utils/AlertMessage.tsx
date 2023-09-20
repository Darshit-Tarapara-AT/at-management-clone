import Style from 'config/colors/colors';
import Swal from 'sweetalert2'
export const AlertMessage = async () => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: Style.sweetAlert.confirmDeleteButtonColor,
    allowOutsideClick: false,
    allowEscapeKey: false,
    cancelButtonColor: Style.sweetAlert.cancelButtonColor,
    confirmButtonText: 'Delete it!',
  })
  return result;
}

export const Message = async (title: string, icon: "error" | "success" | "warning", text: string, buttonText = "OK") => {
  const result = await Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonColor: Style.sweetAlert.successMessageColor,
    confirmButtonText: buttonText,
    allowOutsideClick: false,
    allowEscapeKey: false,
    customClass: "pop-up-confirm"
  })
  return result;
}
