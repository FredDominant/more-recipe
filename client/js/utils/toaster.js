import toastr from 'toastr';

const toaster = {
  toastSuccess: (message) => {
    toastr.options = {
      closeButton: true
    };
    toastr.clear();
    return toastr.success(message);
  },
  toastError: (message) => {
    toastr.options = {
      closeButton: true
    };
    toastr.clear();
    return toastr.error(message);
  }
};
export default toaster;
