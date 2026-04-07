import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    component: () => import('@/views/Layout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: { title: '仪表盘', icon: 'Odometer' }
      },
      // 账户管理
      {
        path: 'account',
        name: 'AccountList',
        component: () => import('@/views/AccountList.vue'),
        meta: { title: '账户列表', icon: 'User' }
      },
      {
        path: 'account-opening',
        name: 'AccountOpening',
        component: () => import('@/views/AccountOpening.vue'),
        meta: { title: '开户管理', icon: 'DocumentAdd' }
      },
      {
        path: 'bank-card',
        name: 'BankCard',
        component: () => import('@/views/BankCard.vue'),
        meta: { title: '银行卡管理', icon: 'CreditCard' }
      },
      // 资金管理
      {
        path: 'recharge',
        name: 'Recharge',
        component: () => import('@/views/Recharge.vue'),
        meta: { title: '充值', icon: 'Wallet' }
      },
      {
        path: 'withdraw',
        name: 'Withdraw',
        component: () => import('@/views/Withdraw.vue'),
        meta: { title: '提现', icon: 'Money' }
      },
      // 交易管理
      {
        path: 'trade-message',
        name: 'TradeMessage',
        component: () => import('@/views/TradeMessage.vue'),
        meta: { title: '交易信息', icon: 'List' }
      },
      {
        path: 'payment',
        name: 'PaymentOrder',
        component: () => import('@/views/PaymentOrder.vue'),
        meta: { title: '支付订单', icon: 'Tickets' }
      },
      // 分账管理
      {
        path: 'split-rule',
        name: 'SplitRule',
        component: () => import('@/views/SplitRule.vue'),
        meta: { title: '分账规则', icon: 'Setting' }
      },
      {
        path: 'split-record',
        name: 'SplitRecord',
        component: () => import('@/views/SplitRecord.vue'),
        meta: { title: '分账记录', icon: 'Document' }
      },
      {
        path: 'ai-split',
        name: 'AiSplit',
        component: () => import('@/views/AiSplit.vue'),
        meta: { title: 'AI分账', icon: 'MagicStick' }
      },
      {
        path: 'split-template',
        name: 'SplitTemplate',
        component: () => import('@/views/SplitTemplate.vue'),
        meta: { title: '分账模板', icon: 'Files' }
      },
      // 对账管理
      {
        path: 'reconciliation',
        name: 'Reconciliation',
        component: () => import('@/views/Reconciliation.vue'),
        meta: { title: '对账', icon: 'DataAnalysis' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  
  if (to.meta.requiresAuth !== false && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
