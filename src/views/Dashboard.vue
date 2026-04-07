<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon" style="background: #409eff">
              <el-icon><User /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.accountCount }}</div>
              <div class="stat-label">账户总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon" style="background: #67c23a">
              <el-icon><Money /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ formatMoney(stats.totalBalance) }}</div>
              <div class="stat-label">账户余额</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon" style="background: #e6a23c">
              <el-icon><Tickets /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.todayTradeCount }}</div>
              <div class="stat-label">今日交易</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon" style="background: #f56c6c">
              <el-icon><DataAnalysis /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.pendingReconciliation }}</div>
              <div class="stat-label">待对账</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="16">
        <el-card>
          <template #header>
            <span>交易趋势</span>
          </template>
          <div class="chart-container">
            <v-chart :option="chartOption" autoresize style="height: 300px" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <template #header>
            <span>快捷操作</span>
          </template>
          <div class="quick-actions">
            <el-button type="primary" @click="$router.push('/account-opening')">
              <el-icon><Plus /></el-icon>
              开户
            </el-button>
            <el-button type="success" @click="$router.push('/recharge')">
              <el-icon><Wallet /></el-icon>
              充值
            </el-button>
            <el-button type="warning" @click="$router.push('/withdraw')">
              <el-icon><Money /></el-icon>
              提现
            </el-button>
            <el-button type="info" @click="$router.push('/reconciliation')">
              <el-icon><DataAnalysis /></el-icon>
              对账
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'

use([CanvasRenderer, LineChart, GridComponent, TooltipComponent, LegendComponent])

const stats = ref({
  accountCount: 128,
  totalBalance: 125680000,
  todayTradeCount: 1523,
  pendingReconciliation: 12
})

const chartOption = ref({
  tooltip: { trigger: 'axis' },
  legend: { data: ['交易金额', '交易笔数'] },
  xAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  yAxis: [
    { type: 'value', name: '金额(万元)' },
    { type: 'value', name: '笔数' }
  ],
  series: [
    {
      name: '交易金额',
      type: 'line',
      data: [120, 132, 101, 134, 90, 230, 210],
      smooth: true
    },
    {
      name: '交易笔数',
      type: 'line',
      yAxisIndex: 1,
      data: [220, 182, 191, 234, 290, 330, 310],
      smooth: true
    }
  ]
})

const formatMoney = (value) => {
  return (value / 10000).toFixed(2) + '万'
}

onMounted(() => {
  // TODO: 加载实际数据
})
</script>

<style scoped lang="scss">
.dashboard {
  .stat-card {
    .stat-content {
      display: flex;
      align-items: center;
      
      .stat-icon {
        width: 60px;
        height: 60px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 24px;
      }
      
      .stat-info {
        margin-left: 16px;
        
        .stat-value {
          font-size: 24px;
          font-weight: bold;
          color: #303133;
        }
        
        .stat-label {
          font-size: 14px;
          color: #909399;
          margin-top: 4px;
        }
      }
    }
  }
  
  .chart-container {
    width: 100%;
  }
  
  .quick-actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    
    .el-button {
      width: 100%;
      justify-content: flex-start;
    }
  }
}
</style>
