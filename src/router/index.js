import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/index/index'
import DataAnalysis from '../components/dataAnalysis/dataAnalysis'
import Message from '../components/message/message'
import User from '../components/user/user'
import UserLogin from '../components/user/userLongin'
import UserRegister from '../components/user/userRegister'

import ElectricityManagement from '../components/index/ElectricityManagement/ElectricityManagement'
import annualElectricity from '../components/index/ElectricityManagement/annualElectricity'
import monthlyElectricity from '../components/index/ElectricityManagement/monthlyElectricity.vue'
import dailyElectricity from '../components/index/ElectricityManagement/dailyElectricity'
import fillInDay from '../components/index/ElectricityManagement/fillInDay'
import fillInMonth from '../components/index/ElectricityManagement/fillInMonth'
import fillInYear from '../components/index/ElectricityManagement/fillInYear'
import loadForecasting from '../components/index/LoadForecasting/loadForecasting'
import schedulingPlan from '../components/index/schedulingPlan/schedulingPlan'
import dutyLog from '../components/index/dutyLog/dutyLog.vue'
import unitStartStop from '../components/index/unitStartStop/unitStartStop.vue'
import onlineFeedback from '../components/message/onlineFeedback'
import economicIndicators from '../components/message/economicIndicators.vue'
import messageList from '../components/message/messageList.vue'
import environmentalProtectionIndicators from '../components/message/environmentalProtectionIndicators.vue'
import schedulingPlanOnLine from '../components/message/schedulingPlan.vue'
import jzStartStop from '../components/message/jzStartStop.vue'
import systemMessage from '../components/message/systemMessage.vue'


import LoadManagement from '../components/index/LoadManagement/LoadManagement'
import EconomicIndicators from '../components/index/EconomicIndicators'
import EnvironmentalProtection from '../components/index/EconomicIndicators/EnvironmentalProtection'
import DailyHourlyMean from '../components/index/DailyHourlyMean'
import EarlyMeeting from '../components/index/EarlyMeeting'
import Patrol from '../components/index/Patrol'
import OpeningMode from '../components/index/OpeningMode/OpeningMode'
import TwoRules from '../components/index/TwoRules'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/DataAnalysis',
      name: 'DataAnalysis',
      component: DataAnalysis
    },





    {
      path: '/Message',
      name: 'Message',
      component: Message
    },
    {
      path: '/onlineFeedback',
      name: 'onlineFeedback',
      component:onlineFeedback
    },
    {
      path: '/messageList',
      name: 'messageList',
      component:messageList
    },
    {
      path: '/economicIndicators',
      name: 'economicIndicators',
      component:economicIndicators
    },
    {
      path: '/environmentalProtectionIndicators',
      name: 'environmentalProtectionIndicators',
      component:environmentalProtectionIndicators
    },
    {
      path: '/schedulingPlanOnLine',
      name: 'schedulingPlan',
      component:schedulingPlanOnLine
    },
    {
      path: '/jzStartStop',
      name: 'jzStartStop',
      component:jzStartStop
    },
    {
      path: '/systemMessage',
      name: 'systemMessage',
      component:systemMessage
    },









    {
      path: '/User',
      name: 'User',
      component: User
    },
    {
      path: '/UserLogin',
      name: 'UserLogin',
      component: UserLogin
    },
    {
      path: '/UserRegister',
      name: 'UserRegister',
      component: UserRegister
    },
    {
      path: '/ElectricityManagement',
      name:'ElectricityManagement',
      component: ElectricityManagement
    },

    {
      path: '/annualElectricity',
      name:'annualElectricity',
      component: annualElectricity
    },
    {
      path: '/monthlyElectricity',
      name:'monthlyElectricity',
      component: monthlyElectricity
    },
    {
      path: '/dailyElectricity',
      name:'dailyElectricity',
      component: dailyElectricity
    },
    {
      path: '/fillInDay',
      name:'fillInDay',
      component: fillInDay
    },
    {
      path: '/fillInMonth',
      name:'fillInMonth',
      component: fillInMonth
    },
    {
      path: '/fillInYear',
      name:'fillInYear',
      component: fillInYear
    },
    {
      path: '/loadForecasting',
      name:'loadForecasting',
      component: loadForecasting
    },
    {
      path: '/schedulingPlan',
      name:'schedulingPlan',
      component:schedulingPlan
    },
    {
      path: '/dutyLog',
      name:'dutyLog',
      component:dutyLog
    },
    {
      path: '/unitStartStop',
      name:'unitStartStop',
      component:unitStartStop
    },
    {
      path: '/unitStartStop',
      name:'unitStartStop',
      component:unitStartStop
    },





    {
      path: '/LoadManagement',
      name:'LoadManagement',
      component: LoadManagement
    },
    {
      path: '/EconomicIndicators',
      name:'EconomicIndicators',
      component: EconomicIndicators
    },
    {
      path: '/EnvironmentalProtection',
      name:'EnvironmentalProtection',
      component: EnvironmentalProtection
    },
    {
      path: '/DailyHourlyMean',
      name:'DailyHourlyMean',
      component: DailyHourlyMean
    },
    {
      path: '/EarlyMeeting',
      name:'EarlyMeeting',
      component: EarlyMeeting
    },
    {
      path: '/Patrol',
      name:'Patrol',
      component: Patrol
    },
    {
      path: '/OpeningMode',
      name:'OpeningMode',
      component: OpeningMode
    },
    {
      path: '/TwoRules',
      name:'TwoRules',
      component: TwoRules
    }
  ]
})
