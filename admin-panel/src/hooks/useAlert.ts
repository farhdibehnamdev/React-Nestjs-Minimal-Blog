import { useState } from "react";
import { AlertColor } from "@mui/lab/Alert";
export const useAlert = function () {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [noticeType, setNoticeType] = useState<AlertColor>();

  const showNotice = (msg: string, notice: AlertColor) => {
    setOpen(true);
    setMessage(msg);
    setNoticeType(notice);
  };

  return { showNotice, message, open, noticeType, setOpen };
};
