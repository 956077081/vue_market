<template>
  <div style="height: 100%">
    <div class="page_main_title"></div>
    <div>
      <Row>
        <Col span="6" style="margin-bottom: 5px;display: flex; justify-content: space-evenly;">
          <Button @click="showForm('year')">显示年度报表</Button>
          <Button @click="showForm('month')">显示月报表</Button>
        </Col>
        <Col span="6" style="display: flex">
          <DatePicker type="month" zzz @on-change="setDate" placeholder="选择时间" style="width: 200px"></DatePicker>
        </Col>
        <Col span="12" style="text-align: center;font-size: large">{{title}}</Col>
      </Row>
      <Row>
        <Col >
          <div ref="acountform" style="overflow-x: inherit;height: 550px;">
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  import AccounPayForm from "../../components/common/accounPayForm";
  import * as echarts from 'echarts';
  var myChart;
  export default {
    name: "reportForms",
    data() {
      return {
        title: "",
        type: 'year',
        date: null,
        x: null,
        payMoney: null,
        reduceMoney: null,
        remainMoney: null,
        payNum: null,
      }
    },
    mounted() {
      this.date =new Date();
      // this.date.setMonth(this.date.getMonth()+1);
     this.showForm('month');
    },
    methods: {
      setDate(date){
        this.date=date;
      },
      showForm(type){
        this.type= type;
        this.setTitle() ;
        let date = new Date(this.date);
        this.$postMgr("/account/forms", {'type': this.type, 'date': date}, 'get').then(res => {
          let appendstr="";
          if(this.type =='year'){
            appendstr=" 月 "
          }else{
            appendstr=" 号";
          }
          let map = res.data.xtimes.map(time=>{
            return time+appendstr;
          });
          console.log(res,map)
          this.x =map;
          this.payMoney = res.data.payMoney;
          this.reduceMoney = res.data.reduceMoney;
          this.remainMoney = res.data.remainMoney;
          this.payNum = res.data.payNum;
          this.crtAccoForm();
        }).catch(err => {
          console.log(err)
        })
      },
      setTitle() {
        let date=null;
        if(this.date == null||this.date ==''){
          date =new Date();
          this.date= date;
        }
        date =new Date(this.date);
        let  year=date.getFullYear();
        let month=date.getMonth()+1;
        if (this.type == 'year') {
          this.title=  year+"年度账户资金报表";
        } else if (this.type == 'month') {
          this.title=  year+"年"+month+"月账户资金报表";
        }
      },
      crtAccoForm(){
      if(myChart != null && myChart != "" && myChart != undefined) {
        myChart.dispose();//销毁
      }
       myChart = echarts.init(this.$refs.acountform, 'dark');
        var app = {};
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
              data: this.x,
              axisLabel:{
                interval:0
              }
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
              data: this.payMoney
            },
            {
              name: '扣款总额',
              type: 'bar',
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              data: this.reduceMoney
            },
            {
              name: '结余',
              type: 'bar',
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
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
              data: this.payNum
            }
          ]
        };
        option&&myChart.setOption(option);
      }
    }
  }
</script>

<style scoped>

</style>
