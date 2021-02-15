import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [

  {
    title: 'Management-Shop',
    icon: 'grid-outline',
    children: [
      
      {
        title: 'Managements',
        link: '/pages/tables/product',
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
            title: 'Product',
            link: '/pages/tables/product',
          },
          {
            title: 'Brand',
            link: '/pages/tables/product-brand',
          },
         
        ]
      },
     
    ],
  },

  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];
