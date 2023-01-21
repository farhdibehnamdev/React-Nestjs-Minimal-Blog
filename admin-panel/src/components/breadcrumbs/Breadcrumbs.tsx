import { Breadcrumbs as BreadcrumbsMUI } from "@mui/material";
import { BreadcrumbsType } from "../common/BreadcrumbsProps";
import Link from "@mui/material/Link";
const Breadcrumbs = function ({ titles }: BreadcrumbsType) {
  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  return (
    <div role="presentation" onClick={handleClick}>
      <BreadcrumbsMUI sx={{ fontSize: "12px" }} aria-label="breadcrumb">
        {titles.map((title: string, index: number) => {
          return (
            <Link key={index} underline="hover" color="inherit" href="/">
              {title}
            </Link>
          );
        })}
      </BreadcrumbsMUI>
    </div>
  );
};

export default Breadcrumbs;
