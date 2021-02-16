import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [

  {
    title: 'Management-Shop',
    icon: 'grid-outline',
    children: [
      {
        title: 'Category',
        link: '/pages/tables/category',
      },
      {
        title: 'Group',
        link: '/pages/tables/group',
      },
      {
        title: 'Type',
        link: '/pages/tables/product-type',
      },
      {
        title: 'Brand',
        link: '/pages/tables/product-brand',
      },
      {
        title: 'Product',
        link: '/pages/tables/product',
      },
     
     
    ]
  },

  
];
