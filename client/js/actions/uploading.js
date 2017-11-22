import { UPLOADING, STOP_UPLOADING } from '../actions/actionTypes';

export const uploading = () => ({
  type: UPLOADING
});

export const stopUploading = () => ({
  type: STOP_UPLOADING
});
