import Swal from 'sweetalert2';

export const alertConfirm = (text) => {
  return Swal.fire({
    title: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '確認',
    cancelButtonText: '取消',
  });
}

export const alertInfo = (text) => {
  return Swal.fire({
    title: text,
    icon: 'success',
  });
}

export const alertError = (text) => {
  return Swal.fire({
    title: text,
    icon: 'error',
  });
}