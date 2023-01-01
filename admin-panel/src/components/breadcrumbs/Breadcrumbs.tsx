import { Breadcrumbs as BreadcrumbsMUI } from "@mui/material";
import Link from "@mui/material/Link";
const Breadcrumbs = function () {
  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  return (
    <div role="presentation" onClick={handleClick}>
      <BreadcrumbsMUI sx={{ fontSize: "12px" }} aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          پست
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          افزودن پست
        </Link>
      </BreadcrumbsMUI>
    </div>
  );
};

export default Breadcrumbs;
