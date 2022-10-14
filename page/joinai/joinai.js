Page({

    data:{
    },


    onLoad: function () {
      this.reset()
    },

    reset(e){
    var random=[];
       for(let i=0;i<50;i++)
     {
        let m=Math.floor(Math.random()*6+ 1);
        random.push(m);
     }

      var detail1 = [];
      var detail2 = [] ;
      for(let i = 0;i < 9;i++){
        detail1.push({type:0});
        detail2.push({type:0});
      }
      this.setData({
        random:random,
        num:0,
        detail1:detail1,
        defeat1:false,
        side:1,
        detail2:detail2,
        defeat2:false,
      })

      this.roll();
    },
//初始化

    palyclass1(e){
      var w=Math.floor(Math.random()*9),
      detail1 = this.data.detail1,
      side = this.data.side,
      random=this.data.random,
      num=this.data.num;
        if(side==0)
        {
          while(1)
          { 
            if(detail1[w].type==0)
            {
              detail1[w].type = random[num];
              break;
            }
            else
            {
              w=Math.floor(Math.random()*9);
            }
          }
            this.rule(w);
            this.juge(detail1);
            this.roll();
            this.setData
            ({
                detail1:detail1,
                side:!side, 
            })
        }
      },


      palyclass2(e){
        var index = e.currentTarget.dataset.index,
        side = this.data.side,
        detail2 = this.data.detail2,
        random=this.data.random,
        num=this.data.num;
         if(side==1)
        {
          detail2[index].type = random[num];
          this.rule(index);
          this.juge(detail2);
          this.roll();
          this.setData
          ({
          detail2:detail2,
          side:!side,   
          })
          }
          this.palyclass1();
    },//两玩家

  juge(detail)
  {
    let m=0;
    for(let i=0;i<9;i++)
    {
      if(detail[i].type==0)
      {
        m=1;
        break;
      }
    }
    if(m==0)
    {
        this.jifen();
        if(this.data.sum1>this.data.sum2)
        {
            wx.showModal({
                  title: '提示',
                  content: '恭喜1号获得了胜利',
                  showCancel:false,
                  confirmText:'我知道了'
                })
        }
        else if(this.data.sum1<this.data.sum2)
        {
            wx.showModal({
                  title: '提示',
                  content: '恭喜2号获得了胜利',
                  showCancel:false,
                  confirmText:'我知道了'
                })
        }
        else
        {
            wx.showModal({
                  title: '提示',
                  content: '平局',
                  showCancel:false,
                  confirmText:'我知道了'
                })
        }

    }
  },

  rule(index)
  {
    var detail1=this.data.detail1,
    detail2=this.data.detail2,
    side=this.data.side;
    if(side==0)
    {
      if(index<3)
      {
        for(let i=0;i<3;i++)
        {
          if(detail1[index].type==detail2[i].type)
          {
            detail2[i].type=0;
          }
        }
      }
      else if(index>=6)
      {
        for(let i=6;i<9;i++)
        {
          if(detail1[index].type==detail2[i].type)
          {
            detail2[i].type=0;
          }
        }
      }
      else
      {
        for(let i=3;i<6;i++)
        {
          if(detail1[index].type==detail2[i].type)
          {
            detail2[i].type=0;
          }
        }
      }
    }
    else
    {
      if(index<3)
      {
        for(let i=0;i<3;i++)
        {
          if(detail2[index].type==detail1[i].type)
          {
            detail1[i].type=0;
          }
        }
      }
      else if(index>=6)
      {
        for(let i=6;i<9;i++)
        {
          if(detail2[index].type==detail1[i].type)
          {
            detail1[i].type=0;
          }
        }
      }
      else
      {
        for(let i=3;i<6;i++)
        {
          if(detail2[index].type==detail1[i].type)
          {
            detail1[i].type=0;
          }
        }
      }
    }
    this.setData({
      detail1:detail1,
      detail2:detail2,
    })
  },

  jifen()
  {
    var sum1=0,
    sum2=0,
    detail1=this.data.detail1,
    detail2=this.data.detail2;

    for(let j=0;j<3;j++)
    {
      let num=[0,0,0,0,0,0];
      for(let i=j*3;i<j*3+3;i++)
      {
        num[detail1[i].type]++;
      }
      for(let i=0;i<6;i++)
      {
        if(num[i]!=0)
        {
          sum1+=(i+1)*(2**num[i]);
        }
      }
    }
    //1号的分数
    for(let j=0;j<3;j++)
    {
      let num=[0,0,0,0,0,0];
      for(let i=j*3;i<j*3+3;i++)
      {
        num[detail2[i].type]++;
      }
      for(let i=0;i<6;i++)
      {
        if(num[i]!=0)
        {
          sum2+=(i+1)*(2**num[i]);
        }
      }
    }
    //2号的分数
    this.setData({
      sum1:sum1,
      sum2:sum2,
    })
  },

  roll(){
    var num=this.data.num,
    random=this.data.random;
    num++;
    this.repicture(random[num]);
    this.setData({
      num:num,
    })
  },

  repicture(random){
    if(random==1)
    {
      this.setData({
        imgsrc:"../../image/dice1.png"
      })
    }
    else if(random==2)
    {
      this.setData({
        imgsrc:"../../image/dice2.png"
      })
    }
    else if(random==3)
    {
      this.setData({
        imgsrc:"../../image/dice3.png"
      })
    }
    else if (random==4)
    {
      this.setData({
        imgsrc:"../../image/dice4.png"
      })
    }
    else if (random==5)
    {
      this.setData({
        imgsrc:"../../image/dice5.png"
      })
    }
    else if(random==6)
    {
      this.setData({
        imgsrc:"../../image/dice6.png"
      })
    }
},
  })

 