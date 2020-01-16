import Layout from '@/views/layout/Layout'

// nested模块
export default {
  path: '/nested',
  component: Layout,
  redirect: '/nested/index',
  name: 'Nested',
  meta: {
    title: 'Nested',
    icon: 'nested'
  },
  children: [
    {
      path: 'index',
      name: 'Nested',
      component: () => import('@/views/form/index'),
      hidden: true,
      meta: { title: 'nestIndex' }
    },
    {
      path: 'menu1',
      component: () => import('../views/nested/menu1/index'), // Parent router-view
      name: 'Menu1',
      meta: { title: 'Menu1' },
      children: [
        {
          path: 'menu1-1',
          component: () => import('../views/nested/menu1/menu1-1'),
          name: 'Menu1-1',
          meta: { title: 'Menu1-1' }
        },
        {
          path: 'menu1-2',
          component: () => import('../views/nested/menu1/menu1-2'),
          name: 'Menu1-2',
          meta: { title: 'Menu1-2' },
          children: [
            {
              path: 'menu1-2-1',
              component: () => import('../views/nested/menu1/menu1-2/menu1-2-1'),
              name: 'Menu1-2-1',
              meta: { title: 'Menu1-2-1' }
            },
            {
              path: 'menu1-2-2',
              component: () => import('../views/nested/menu1/menu1-2/menu1-2-2'),
              name: 'Menu1-2-2',
              meta: { title: 'Menu1-2-2' }
            }
          ]
        },
        {
          path: 'menu1-3',
          component: () => import('../views/nested/menu1/menu1-3'),
          name: 'Menu1-3',
          meta: { title: 'Menu1-3' }
        }
      ]
    },
    {
      path: 'menu2',
      name: 'Menu2',
      component: () => import('../views/nested/menu2/index'),
      meta: { title: 'menu2' }
    },
    {
      path: 'menu3',
      name: 'Menu3',
      component: () => import('../views/nested/menu2/index'),
      meta: { title: 'menu3' }
    }
  ]
}
