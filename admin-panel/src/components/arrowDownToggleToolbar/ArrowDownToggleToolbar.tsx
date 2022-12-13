import { useDispatch, useSelector } from "react-redux";
import { toggleToolbar } from "../../features/toggle/toggleSlice";
import BottomToolbarStyled from "./ArrowDownToggleToolbar.styled";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";

const BottomToolbar = function () {
  const dispatch = useDispatch();
  const { toggleBottomToolbar } = useSelector((state: any) => state.toggle);
  return (
    <BottomToolbarStyled>
      <ArrowDownwardOutlinedIcon />
    </BottomToolbarStyled>
  );
};

export default BottomToolbar;
