<template>
  <div id="acountForm" style="overflow-x: auto">
  </div>
</template>

<script>
  import * as echarts from 'echarts';
  //
  // import * as echarts from 'echarts/core';
  // import {
  //   ToolboxComponent,
  //   TooltipComponent,
  //   GridComponent,
  //   LegendComponent
  // } from 'echarts/components';
  // import {
  //   BarChart
  // } from 'echarts/charts';
  // import {
  //   CanvasRenderer
  // } from 'echarts/renderers';
  //
  // echarts.use(
  //   [ToolboxComponent, TooltipComponent, GridComponent, LegendComponent, BarChart, CanvasRenderer]
  // );
  export default {
    name: "accounPayForm",
    data: {
      x: null,
      payMoney: null,
      reduceMoney: null,
      remainMoney: null,
      payNum: null
    },
    props: {
      type: String,
      date: Date
    },
    mounted() {
      console.log(this)
      this.getFormsMap;
    },
    computed:{
        getFormsMap(){
          console.log(this.type,"查询")
          this.$postMgr("/account/forms", {'type': this.type, 'date': this.date}, 'get').then(res => {
            this.x = res.data.xtimes;
            this.payMoney = res.data.payMoney;
            this.reduceMoney = res.data.reduceMoney;
            this.remainMoney = res.data.remainMoney;
            this.payNum = res.data.payNum;
            this.crtAccoForm();
            console.log("查询成功",res)
          }).catch(err => {
            console.log(err)
          })
        }
    },
    methods: {
      crtAccoForm(){
        var app = {};
        var chartDom = document.getElementById('acountForm');
        var myChart = echarts.init(chartDom, 'dark');
        var option;

        var posList = [
          'left', 'right', 'top', 'bottom',
          'inside',
          'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
          'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
        ];

        app.configParameters = {
          rotate: {
            min: -90,
            max: 90
          },
          align: {
            options: {
              left: 'left',
              center: 'center',
              right: 'right'
            }
          },
          verticalAlign: {
            options: {
              top: 'top',
              middle: 'middle',
              bottom: 'bottom'
            }
          },
          position: {
            options: posList.reduce(function (map, pos) {
              map[pos] = pos;
              return map;
            }, {})
          },
          distance: {
            min: 0,
            max: 100
          }
        };

        app.config = {
          rotate: 90,
          align: 'left',
          verticalAlign: 'middle',
          position: 'insideBottom',
          distance: 15,
          onChange: function () {
            var labelOption = {
              normal: {
                rotate: app.config.rotate,
                align: app.config.align,
                verticalAlign: app.config.verticalAlign,
                position: app.config.position,
                distance: app.config.distance
              }
            };
            myChart.setOption({
              series: [{
                label: labelOption
              }, {
                label: labelOption
              }, {
                label: labelOption
              }, {
                label: labelOption
              }]
            });
          }
        };


        var labelOption = {
          show: true,
          position: app.config.position,
          distance: app.config.distance,
          align: app.config.align,
          verticalAlign: app.config.verticalAlign,
          rotate: app.config.rotate,
          formatter: '{c}',
          fontSize: 14,
          rich: {
            name: {}
          }
        };

        option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['打款总额', '扣款总额', '结余', '打款次数']
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {show: false},
              // data: ['1', '2', '3', '4', '5','6', '7', '8', '9','10', '11', '12', '13', '14','15', '16', '17', '18', '19','20', '21', '22', '23', '24','25', '26', '27', '28', '29']
              data: this.x
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '打款总额',
              type: 'bar',
              barGap: 0,
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              // data: ["320", 332, 301, 334, 390,320, 332, 301, 334, 390,320,320, 332, 301, 334, 390,320, 332, 301, 334, 390,320, 332, 301, 334, 390,320, 332, 301, 334, 390]
              data: this.payMoney
            },
            {
              name: '扣款总额',
              type: 'bar',
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              // data: [220, 182, 191, 234, 290,220, 182, 191, 234, 290,220, 182, 191, 234, 290,220, 182, 191, 234, 290,220, 182, 191, 234, 290,220, 182, 191, 234, 290]
              data: this.reduceMoney
            },
            {
              name: '结余',
              type: 'bar',
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              // data: [150, 232, 201, 154, 190,150, 232, 201, 154, 190,150, 232, 201, 154, 190,150, 232, 201, 154, 190,220, 182, 191, 234, 290,220, 182, 191, 234, 290]
              data: this.remainMoney
            },
            ,
            {
              name: '打款次数',
              type: 'bar',
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              // data: [150, 232, 201, 154, 190,150, 232, 201, 154, 190,150, 232, 201, 154, 190,150, 232, 201, 154, 190,220, 182, 191, 234, 290,220, 182, 191, 234, 290]
              data: this.payNum
            }
          ]
        };

        option && myChart.setOption(option);
      }
    }
  }
</script>

<style scoped>

</style>
