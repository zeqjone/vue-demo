<template>
  <div class="inteligense">
    <div class="tooltip" id="tooltip">
      <h5>新增用户</h5>
      <ul>
        <li>
          {{tooltip.userName}}
          <p>{{tooltip.deviceModel}}</p>
        </li>
      </ul>
    </div>
    <div class="title">
      <div class="back" @click="onBack">返回</div>
      <div class="set" @click="onSet"><span @click="onSet">设置</span> | 24 小时内</div>
      <h4 @click="init">{{title}}</h4>
    </div>
    <div class="content">
      <div class="left">
        <div class="pack-item">
          <h5>访问量变化最大的应用</h5>
          <section class="pack-item-content">
            <h6 v-if="dxaccessApps.length > 0">相比昨日</h6>
            <ul v-if="dxaccessApps.length > 0">
              <li v-for="item in dxaccessApps" :key="item.appId"><label>{{item.appName}}</label>
                <span><i v-if="item.changes > 0" class="icon-arrow_up"></i><i v-else class="icon-arrow_down"></i> {{Math.abs(item.changes)}}</span>
              </li>
            </ul>
            <div v-else class="empty"><div>暂无数据</div></div>
          </section>
        </div>
        <div class="pack-item">
          <h5>活跃度变化量最大的用户</h5>
          <section class="pack-item-content">
            <h6 v-if="dxactiveUser.length > 0">相比昨日</h6>
            <ul v-if="dxactiveUser.length > 0">
              <li v-for="item in dxactiveUser" :key="item.id"><label>{{item.userName}}</label>
                <span><i v-if="item.changes > 0" class="icon-arrow_up"></i><i v-else class="icon-arrow_down"></i> {{Math.abs(item.changes)}}</span>
              </li>
            </ul>
            <div v-else class="empty"><div>暂无数据</div></div>
          </section>
        </div>
        <div class="pack-item">
          <h5>服务器健康状态</h5>
          <section class="pack-item-content">
            <div v-if="healthApps.length > 0">
            <label class="label" v-for="item in healthApps" :key="item.id">{{item.name}}
              <i v-if="!item.status" class="icon-c_up"></i>
              <i v-else class="icon-alert"></i>
            </label>
            </div>
            <div v-else class="empty"><div>暂无数据</div></div>
          </section>
        </div>
      </div>
      <section class="main">
        <div class="pack-calc">
          <div>
            <h6>活跃用户</h6>
            <div>
              {{overview.activeUsers || 0}} <sub>个</sub>
            </div>
          </div>
          <div>
            <h6>用户访问次数</h6>
            <div>
              {{overview.userVisitTimes || 0}} <sub>次</sub>
            </div>
          </div>
          <div>
            <h6>拦截访问</h6>
            <div>
              {{overview.blockedTimes || 0}} <sub>次</sub>
            </div>
          </div>
          <div>
            <h6>当前在线用户数</h6>
            <div>
              {{overview.onlines || 0}} <sub>个</sub>
            </div>
          </div>
          <div>
            <h6>激活用户数</h6>
            <div>
              {{overview.activatedUsers || 0}} <sub>个</sub>
            </div>
          </div>
          <div>
            <h6>激活设备数</h6>
            <div>
              {{overview.activatedDevices || 0}} <sub>个</sub>
            </div>
          </div>
        </div>
        <div class="pack-container">
          <div class="pack-map">
            <div class="pack-map-title">
              <h4>
                <span>用户访问地图</span>
              </h4>
            </div>
            <div class="map-legend">
              <label for=""><span></span> 应用</label>
              <label for=""><span></span> 用户</label>
              <label for=""><span></span> 新增</label>
            </div>
            <div id="intelligenceHolder" class="map">

            </div>
          </div>
          <div class="pack-container pack-right">
            <div class="pack-item">
              <h5>访问次数最多的应用</h5>
              <section class="pack-item-content">
                <ul v-if="accessApps.length > 0">
                  <li v-for="item in accessApps" :key="item.appId"><label>{{item.appName}}</label><span>{{item.visitTimes}}</span></li>
                </ul>
                <div v-else class="empty"><div>暂无数据</div></div>
              </section>
            </div>
            <div class="pack-item">
              <h5>访问应用次数最多的用户</h5>
              <section class="pack-item-content">
                <ul v-if="activeUser.length > 0">
                  <li v-for="item in activeUser" :key="item.id"><label>{{item.userName}}</label><span>{{item.visitTimes}}</span></li>
                </ul>
                <div v-else class="empty"><div>暂无数据</div></div>
              </section>
            </div>
            <div class="pack-item">
              <h5>拦截的非法访问请求</h5>
              <section class="pack-item-content">
                <ul v-if="interceptReqs.length > 0">
                  <li v-for="item in interceptReqs" :key="item.id"><label>{{item.email}}</label><span>{{item.blockedVisitTimes}}</span></li>
                </ul>
                <div v-else class="empty"><div>暂无数据</div></div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div class="tooltip dialog" v-show="dialogVisible" style="top: 40%; left: 50%; transform: translate(-50%, -50%)">
      <h5>设置</h5>
      <div class="content">
        <input type="text" v-model="title" placeholder="请输入标题"/>
      </div>
      <footer>
        <button @click="onDialogChangeTitleOK">确定</button>
      </footer>
    </div>
  </div>
</template>

<script>
import './index.scss';
import service from './service.js';
import intelligenceMap from './map.js';
import { setTimeout } from 'timers';

export default {
    name: 'inteligense',
    data () {
      return {
        title: '安全办公综合态势',
        overview: {},
        dxaccessApps: [],
        dxactiveUser: [],
        healthApps: [],
        accessApps: [],
        activeUser: [],
        interceptReqs: [],
        tooltip: {
          userName: '',
          deviceModel: ''
        },
        dialogVisible: false
      }
    },
    created () {
      this.init();
    },
    mounted () {
      intelligenceMap.init(this);
    },
    methods: {
      init () {
        let that = this;
        (function loop () {
          service.getData().then(res => {
            that.overview = res[0]
            that.dxaccessApps.splice(0, that.dxaccessApps.length, ...res[1])
            that.dxactiveUser.splice(0, that.dxactiveUser.length, ...res[2])
            that.healthApps.splice(0, that.healthApps.length, ...res[3])
            that.accessApps.splice(0, that.accessApps.length, ...res[4])
            that.activeUser.splice(0, that.activeUser.length, ...res[5])
            that.interceptReqs.splice(0, that.interceptReqs.length, ...res[6])
          });
          setTimeout(loop, 5 * 60 * 1000);
        })()
      },

      onBack () {
        this.$router.back(-1);
      },
      onSet () {
        this.dialogVisible = true;
      },
      onDialogChangeTitleOK () {
        this.dialogVisible = false;
      }
    }
}
</script>
