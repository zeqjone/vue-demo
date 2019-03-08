import * as d3 from 'd3';
import chinaJson from './china.json';
import service from './service';

const timerStartSpan = Date.now();
let cfg = {
  mapFillColor: '#05224A',
  mapLineColor: '#204080',
  appFillColor: '#3EDDBF',
  svg: undefined,
  holderx: 330,
  holdery: 180,
  map: undefined,
  projection: undefined,
  reqsForColor: '#093C79',
  line: undefined
};

export default {
  init (vueIns) {
    cfg.vueIns = vueIns;
    let holder = d3.select('#intelligenceHolder').node();
    let width = holder.clientWidth;
    let height = holder.clientHeight;
    cfg.svg = d3.select('#intelligenceHolder')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
    let scaleSize = (Math.min(width, height)) + 120;
    cfg.map = cfg.svg.append('g')
      .attr('class', 'map')
      .attr('transform', 'translate(0, 0)');
    this.defPres();
    cfg.projection = d3.geoMercator()
      .center([104, 37.5])
      .scale(scaleSize)
      .translate([width / 2, height / 2])
    var path = d3.geoPath().projection(cfg.projection);
    cfg.map.selectAll('path').data(chinaJson.features).enter()
      .append('path').attr('stroke', cfg.mapLineColor).attr('stroke-width', 1).attr('fill', cfg.mapFillColor).attr('d', path)
    cfg.svg.append('g').attr('id', 'reqs')
    cfg.svg.append('g').attr('id', 'apps')
    cfg.svg.append('g').attr('id', 'lines')
    cfg.svg.append('g').attr('id', 'device')
    this.drawDevice();

    cfg.line = d3.line().curve(d3.curveCardinal)
    let that = this;
    let ringOpacityScale = d3.scaleLinear([0, 200, 800, 1000, 1600], [0, 0.75, 1, 0.75, 0]);
    d3.timer(function () {
      let curOpacity1 = ringOpacityScale((Date.now() - timerStartSpan) % 1600);
      let curOpacity2 = ringOpacityScale((Date.now() - 300 - timerStartSpan) % 1600);
      let curOpacity3 = ringOpacityScale((Date.now() - 600 - timerStartSpan) % 1600);
      d3.selectAll('.appsRing1').attr('opacity', curOpacity1);
      d3.selectAll('.appsRing2').attr('opacity', curOpacity2);
      d3.selectAll('.appsRing3').attr('opacity', curOpacity3);
    });
    service.getDirection().then(res => {
      let data = res;
      that.drawRequests(data);
      that.drawApps(data);
    })
    setInterval(() => {
      service.getDirection().then(res => {
        let data = res;
        that.drawRequests(data);
        that.drawApps(data);
      })
    }, 5000)
},
  drawApps (data) {
    let geoLnglat = [];
    data.forEach(item => {
      if (geoLnglat.length === 0) {
        geoLnglat.push([item.remote.longitude, item.remote.latitude])
      }
      if (!geoLnglat.find(x => x[0] === item.remote.longitude && x[1] === item.remote.latitude)) {
        geoLnglat.push([item.remote.longitude, item.remote.latitude])
      }
    });
    geoLnglat = geoLnglat.map(item => {
      return cfg.projection(item);
    })
    let svgApps = cfg.svg.select('#apps');

    svgApps.selectAll('.apps').data(geoLnglat).enter()
      .append('circle')
      .attr('class', 'apps').attr('cx', function (d, i) {
        return d[0];
      }).attr('cy', function (d, i) {
        return d[1];
      }).attr('r', 6).attr('fill', cfg.appFillColor)

    svgApps.selectAll('.appsRing1').data(geoLnglat).enter()
      .append('circle')
      .attr('class', 'appsRing1').attr('cx', function (d, i) {
        return d[0];
      }).attr('cy', function (d) {
        return d[1];
      }).attr('r', 7).attr('fill', 'transparent')
      .attr('stroke', '#052048').attr('stroke-width', 1)

    svgApps.selectAll('.appsRing2').data(geoLnglat).enter()
      .append('circle')
      .attr('class', 'appsRing2').attr('cx', function (d, i) {
        return d[0];
      }).attr('cy', function (d) {
        return d[1];
      }).attr('r', 10).attr('fill', 'transparent')
      .attr('stroke', '#0E5D75').attr('stroke-width', 3)

    svgApps.selectAll('.appsRing3').data(geoLnglat).enter()
      .append('circle')
      .attr('class', 'appsRing3').attr('cx', function (d, i) {
        return d[0];
      }).attr('cy', function (d) {
        return d[1];
      }).attr('r', 15).attr('fill', 'transparent')
      .attr('stroke', '#09395A').attr('stroke-width', 4)
  },
  drawRequests (data) {
    let max = 0
    let min = +Infinity;
    for (let i = 0; i < data.length; i++) {
      if (data[i].count > max) {
        max = data[i].count;
      }
      if (data[i].count < min) {
        min = data[i].count;
      }
    }
    cfg.scaleReqs = d3.scaleQuantile().domain([min, max]).range([4, 5, 6, 7, 8, 9, 10]);
    let reqPoints = data.map(item => {
      return {
        lnglat: cfg.projection([item.source.longitude, item.source.latitude]),
        r: cfg.scaleReqs(item.count),
        endLngLat: cfg.projection([item.remote.longitude, item.remote.latitude])
      };
    })
    let svg = cfg.svg.select('#reqs');
    svg.selectAll('dotreqs').data(reqPoints).enter().append('circle')
      .attr('class', 'dotreqs').attr('cx', function (d) {
        return d.lnglat[0]
      }).attr('cy', function (d) {
        return d.lnglat[1]
      }).attr('r', function (d) {
        return d.r;
      }).attr('fill', cfg.reqsForColor);
    let gline = d3.select('#lines');
    cfg.linePool = reqPoints
    clearInterval(cfg.intervalDraw)
    cfg.intervalDraw = setInterval(() => {
      if (cfg.linePool.length > 0) {
        let point = cfg.linePool.shift()
        if (point.lnglat[0] === point.endLngLat[0] && point.lnglat[1] === point.endLngLat[1]) {
          return;
        }
        this.drawOneLine(gline, point, point.endLngLat)
        cfg.linePool.push(point)
      }
    }, 500)
  },
  drawOneLine (gline, startPoint, endPoint) {
    let startR = startPoint.r;
    let randomMidPoint = this.getMidPoint(startPoint.lnglat, endPoint);
    let arrLine0 = this.makeLinePath(startPoint.lnglat, randomMidPoint, startR);
    let arrLine = this.makeLinePath(startPoint.lnglat, endPoint, startR);
    let fileStyle =  `url(#linearGradient${arrLine.axis}${arrLine.reverse})`;
    let path = gline.append('path').attr('class', 'line')
      .attr('d', cfg.line(arrLine0.arr)).attr('fill', fileStyle)
      .transition().duration(2000)
      .attr('d', cfg.line(arrLine.arr))
      .attr('stroke-width', 0)
      .remove()
  },
  makeLinePath (p0, p1, dr = 4) {
    let dx = p1[0] - p0[0];
    let dy = p1[1] - p0[1];
    let dxdyR = Math.sqrt(dx * dx + dy * dy);
    let angle = Math.acos(dx / dxdyR);
    let R = dxdyR * 0.5
    let [angle1, angle2, angle3] = [0, 0, 0];
    if (dy > 0) {
      angle1 = angle + Math.PI / 90;
      angle2 = angle + Math.PI / 2;
      angle3 = angle - Math.PI / 2;
    } else {
      angle1 = angle + Math.PI + Math.PI / 90;
      angle2 = angle + Math.PI + Math.PI / 2;
      angle3 = angle + Math.PI - Math.PI / 2;
    }
    let [dota, dotb, dotMida, dotMidb] = [[], [], [], []];
    if (dy > 0) {
      dota = [p0[0] + Math.cos(angle2) * dr, p0[1] + Math.sin(angle2) * dr];
      dotMida = [dota[0] + Math.cos(angle1) * R, dota[1] + Math.sin(angle1) * R]
      dotb = [p0[0] + Math.cos(angle3) * dr, p0[1] + Math.sin(angle3) * dr];
      dotMidb = [dotb[0] + Math.cos(angle1) * R, dotb[1] + Math.sin(angle1) * R];
    } else {
      dota = [p0[0] - Math.cos(angle2) * dr, p0[1] + Math.sin(angle2) * dr];
      dotMida = [dota[0] - Math.cos(angle1) * R, dota[1] + Math.sin(angle1) * R];
      dotb = [p0[0] - Math.cos(angle3) * dr, p0[1] + Math.sin(angle3) * dr];
      dotMidb = [dotb[0] - Math.cos(angle1) * R, dotb[1] + Math.sin(angle1) * R];
    }
    let reArr = [dota, dotMida, p1, dotMidb, dotb];
    let xyr = {};
    if (Math.abs(dx) > Math.abs(dy)) {
      xyr.axis = 'X';
      xyr.reverse = dx > 0 ? '' : 'R';
    } else {
      xyr.axis = 'Y'
      xyr.reverse = dy > 0 ? '' : 'R';
    }
    return Object.assign({arr: reArr}, xyr)
  },

  defPres () {
    let defs = cfg.svg.append('defs')
    // 添加箭头
    let arrow = defs.append('marker')
      .attr('id', 'arrow')
      .attr('markerUnits', 'strokeWidth')
      .attr('markerWidth', 12)
      .attr('markerHeight', 12)
      .attr('viewBox', '0 0 12 12')
      .attr('refX', 6)
      .attr('refY', 6)
      .attr('orient', 'auto')
    let arrowPath = 'M2,2 L10,6 L2,10 L6,6';
    arrow.append('path')
      .attr('d', arrowPath)
      .attr('fill', '#F00');

   // 添加过渡色
   let a = d3.hsl(219, 0.92, 0.577, 0.302);
   let b = d3.hsl(186, 1, 0.504);
  let lineGradientX = defs.append('linearGradient')
    .attr('id', 'linearGradientX').attr('x1', '0%').attr('y1', '0%').attr('x2', '100%').attr('y2', '0%')
  lineGradientX.append('stop').attr('offset', '0%').style('stop-color', a.toString())
  lineGradientX.append('stop').attr('offset', '100%').style('stop-color', b.toString())

  let linearGradientXR = defs.append('linearGradient')
    .attr('id', 'linearGradientXR').attr('x1', '0%').attr('y1', '0%').attr('x2', '100%').attr('y2', '0%')
  linearGradientXR.append('stop').attr('offset', '0%').style('stop-color', b.toString())
  linearGradientXR.append('stop').attr('offset', '100%').style('stop-color', a.toString())

  let linearGradientY = defs.append('linearGradient')
    .attr('id', 'linearGradientY').attr('x1', '0%').attr('y1', '0%').attr('x2', '0%').attr('y2', '100%')
  linearGradientY.append('stop').attr('offset', '0%').style('stop-color', a.toString())
  linearGradientY.append('stop').attr('offset', '100%').style('stop-color', b.toString())

  let linearGradientYR = defs.append('linearGradient')
    .attr('id', 'linearGradientYR').attr('x1', '0%').attr('y1', '0%').attr('x2', '0%').attr('y2', '100%')
  linearGradientYR.append('stop').attr('offset', '0%').style('stop-color', b.toString())
  linearGradientYR.append('stop').attr('offset', '100%').style('stop-color', a.toString())
  },
  makeCircle (point, r) {
    let path = d3.path()
    path.arc(point[0], point[1], r, 0, Math.PI * 2);
    path.closePath();
    return path.toString();
  },
  getMidPoint (p0, p1) {
    let dx = p1[0] - p0[0];
    let dy = p1[1] - p0[1];
    let dd = 2;
    if (dx < 0) {
      return [p0[0] - dd, p0[1] - dd * dy / dx];
    }
    return [p0[0] + dd, p0[1] + dd * dy / dx];
  },
  drawDevice () {
    service.getActiveDevice().then(res => {
      let deviceHolder = d3.select('#device');
      deviceHolder.selectAll('.device').data(res).enter()
        .append('circle')
        .attr('class', '.device')
        .attr('cx', function (d) {
          return cfg.projection([d.longitude, d.latitude])[0]
        })
        .attr('cy', function (d) {
          return cfg.projection([d.longitude, d.latitude])[1]
        })
        .attr('r', 4).attr('fill', '#ff8')
        .each(function (d, i, e) {
          d3.interval(() => {
            let xywh = d3.select(e[i]).node().getBBox();
            let tt = document.getElementById('tooltip');
            if (tt) {
              tt.style.left = (xywh.x + cfg.holderx - 162) + 'px'
              tt.style.top = (xywh.y + cfg.holdery + 6) + 'px'
              cfg.vueIns.tooltip.userName = d.userName
              cfg.vueIns.tooltip.deviceModel = d.deviceModel
              tt.style.display = 'block'
            }
          }, e.length * 2000, i * 2000);
        })
        // .on('mouseover', function (d) {
        //   let tt = document.getElementById('tooltip')
        //   if (tt) {
        //     tt.style.left = (d3.event.pageX - 115) + 'px'
        //     tt.style.top = (d3.event.pageY + 10) + 'px'
        //     cfg.vueIns.tooltip.userName = d.userName
        //     cfg.vueIns.tooltip.deviceModel = d.deviceModel
        //     tt.style.display = 'block'
        //   }
        // })
        // .on('mouseout', function () {
        //   let tt = document.getElementById('tooltip')
        //   if (tt) {
        //     tt.style.display = 'none'
        //   }
        // })
    })
  }
}
