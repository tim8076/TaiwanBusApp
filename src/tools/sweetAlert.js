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