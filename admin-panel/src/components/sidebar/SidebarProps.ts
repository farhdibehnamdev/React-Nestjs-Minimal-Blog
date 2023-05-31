export interface SidebarProps {
  id: number;
  menuTitle: string;
  menuIconMUI: any;
  path: string;
  children: SidebarProps[] | null | JSX.Element;
}

export interface MenuListProps {
  toggle: boolean;
}
