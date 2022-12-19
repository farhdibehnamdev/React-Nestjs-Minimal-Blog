import { useDispatch, useSelector } from "react-redux";
import { toggleToolbar } from "../../features/toggle/toggleSlice";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import ArrowDownToggleToolbarStyled from "./ArrowDownToggleToolbar.styled";

const ArrowDownToggleToolbar = function () {
  const dispatch = useDispatch();
  const { toggleBottomToolbar } = useSelector((state: any) => state.toggle);
  const handleToggleBottomToolbar = function () {
    dispatch(toggleToolbar(!toggleBottomToolbar));
  };
  return (
    <ArrowDownToggleToolbarStyled onClick={handleToggleBottomToolbar}>
      <ArrowDownwardOutlinedIcon />
    </ArrowDownToggleToolbarStyled>
  );
};

export default ArrowDownToggleToolbar;
