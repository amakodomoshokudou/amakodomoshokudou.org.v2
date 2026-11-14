type BreadcrumbParentItem = {
  title: string;
  href: string;
};

type BreadcrumbCurrentItem = {
  title: string;
};

export type BreadcrumbItems = [...BreadcrumbParentItem[], BreadcrumbCurrentItem];
