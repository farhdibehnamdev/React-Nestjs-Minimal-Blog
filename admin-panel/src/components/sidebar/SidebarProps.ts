export interface SidebarProps {
  id: number;
  menuTitle: string;
  menuIconMUI: any;
  path: string;
  submenu?: SubmenuProps[];
}

export interface SubmenuProps {
  id: number;
  path: string;
  menuTitle: string;
  menuIconMUI: JSX.Element;
}

export interface MenuListProps {
  toggle: boolean;
}
