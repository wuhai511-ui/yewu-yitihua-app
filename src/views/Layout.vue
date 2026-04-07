<template>
  <el-container class="layout-container">
    <!-- 侧边栏 -->
    <el-aside :width="isCollapse ? '64px' : '220px'" class="aside">
      <div class="logo">
        <el-icon v-if="!isCollapse" style="font-size: 24px; margin-right: 8px"><DataAnalysis /></el-icon>
        <span v-if="!isCollapse">业财一体化</span>
      </div>
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :collapse-transition="false"
        router
        class="menu"
      >
        <el-menu-item index="/dashboard">
          <el-icon><Odometer /></el-icon>
          <span>仪表盘</span>
        </el-menu-item>
        
        <el-sub-menu index="account">
          <template #title>
            <el-icon><User /></el-icon>
            <span>账户管理</span>
          </template>
          <el-menu-item index="/account">账户列表</el-menu-item>
          <el-menu-item index="/account-opening">开户管理</el-menu-item>
          <el-menu-item index="/bank-card">银行卡管理</el-menu-item>
        </el-sub-menu>
        
        <el-sub-menu index="fund">
          <template #title>
            <el-icon><Wallet /></el-icon>
            <span>资金管理</span>
          </template>
          <el-menu-item index="/recharge">充值</el-menu-item>
          <el-menu-item index="/withdraw">提现</el-menu-item>
        </el-sub-menu>
        
        <el-sub-menu index="trade">
          <template #title>
            <el-icon><List /></el-icon>
            <span>交易管理</span>
          </template>
          <el-menu-item index="/trade-message">交易信息</el-menu-item>
          <el-menu-item index="/payment">支付订单</el-menu-item>
        </el-sub-menu>
        
        <el-sub-menu index="split">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>分账管理</span>
          </template>
          <el-menu-item index="/split-rule">分账规则</el-menu-item>
          <el-menu-item index="/split-record">分账记录</el-menu-item>
          <el-menu-item index="/ai-split">AI分账</el-menu-item>
          <el-menu-item index="/split-template">分账模板</el-menu-item>
        </el-sub-menu>
        
        <el-menu-item index="/reconciliation">
          <el-icon><DataAnalysis /></el-icon>
          <span>对账管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    
    <!-- 主内容区 -->
    <el-container>
      <el-header class="header">
        <div class="header-left">
          <el-icon class="collapse-btn" @click="isCollapse = !isCollapse">
            <Expand v-if="isCollapse" />
            <Fold v-else />
          </el-icon>
        </div>
        <div class="header-right">
          <el-dropdown>
            <span class="user-info">
              <el-avatar :size="32" icon="User" />
              <span class="username">{{ username }}</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const isCollapse = ref(false)
const username = ref(localStorage.getItem('username') || '管理员')

const activeMenu = computed(() => route.path)

const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  router.push('/login')
}
</script>

<style scoped lang="scss">
.layout-container {
  height: 100vh;
}

.aside {
  background: #304156;
  transition: width 0.3s;
  
  .logo {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    border-bottom: 1px solid #3a4a5e;
    
    img {
      width: 32px;
      height: 32px;
      margin-right: 8px;
    }
  }
  
  .menu {
    border-right: none;
    background: transparent;
    
    :deep(.el-menu-item),
    :deep(.el-sub-menu__title) {
      color: #bfcbd9;
      
      &:hover {
        background: #263445;
      }
      
      &.is-active {
        color: #409eff;
        background: #263445;
      }
    }
  }
}

.header {
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  
  .collapse-btn {
    font-size: 20px;
    cursor: pointer;
    color: #606266;
    
    &:hover {
      color: #409eff;
    }
  }
  
  .user-info {
    display: flex;
    align-items: center;
    cursor: pointer;
    
    .username {
      margin-left: 8px;
      color: #606266;
    }
  }
}

.main {
  background: #f0f2f5;
  padding: 20px;
}
</style>
