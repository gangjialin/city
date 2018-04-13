$(function(){
    var address = $("#pro_city");
    var province = $("#province");
    var city = $("#city");
    var area = $("#area");
    var preProvice = "<option selected>选择省（市）</option>";
    var preCity = "<option selected>选择市（区）</option>";
    var preArea = "<option selected>选择区（县）</option>";
    var allObj = {};//所有的数据
    var allPro = {};//所有省的数据
    var allCity = {};//所有市的数据
    //初始化
    province.html(preProvice);
    city.html(preCity);
    area.html(preArea);

    //文档加载完毕，从content.json中解析数据

    //jQuery ajax 方法
    $.ajax({
      url:'/js/pca-code.json',
      type:'get',
      success:function(data){
        allObj = data;
      //  console.log(allObj);
         $(data).each(function(i,item){
           //console.log(item.code);
           //console.log(item.name);
           province.append("<option value=" + item.code + ">"
                    + item.name + "</option>");
         });
      },
      error:function(ajaxobj){
        if (ajaxobj.responseText!='') {
          console.log(ajaxobj.responseText);
        }
      }
    });

    //jQuery方法
    $.getJSON("/js/content.json",{param:"sanic"},function(data){
      $.each(data.root,function(idx,item){
        if (idx == 0) {
          return true;
        }
      });
      //  console.log(data);
    });

    //省 下拉列表选择发生变化的时候触发
    province.change(function(){
      //province.val() 返回是每个省对应的下标，序号从0开始
      if (province.val() != '') {
        var cityCode = province.val();
      //  console.log(cityCode);
        city.html(preCity);

        //根据下拉得到的省对应的下标序号，动态从allObj中解析对应市
        $(allObj).each(function(i,item){
          if (item.code == cityCode) {
            allPro = item;
            allCity = item.children;
          //  console.log(allCity);
            $(allCity).each(function(key,value){
              city.append("<option value=" + value.code + ">"
                      + value.name + "</option>");
            })
          }
        });
      }
    });
   //市 下拉列表选择发生变化的时候触发
   city.change(function(){
     //city.val() 返回是每个省对应的下标，序号从0开始
     if (city.val() != '') {
       var cityCode = city.val();
       //console.log(cityCode);
       area.html(preArea);
       //console.log(allCity);
       //根据下拉得到的省对应的下标序号，动态从allObj中解析对应市
       $(allCity).each(function(i,item){
         if (item.code == cityCode) {
           var cityArr = item.children;
           //console.log(cityArr);
           $(cityArr).each(function(key,areaName){
            //console.log(areaName);
            area.append("<option value=" + areaName.code + ">"
                    + areaName.name + "</option>");
           })
         }
       });
     };

   });
   //区选择
   area.change(function(){
    // var options = $(“#province option:selected”); //获取选中的项
    var selctPro = $('#province option:selected');
    var selctCity = $('#city option:selected');
    var selctArea = $('#area option:selected');
     txtProCity.value = selctPro.text() + selctCity.text() + selctArea.text();
   });
})
