//====================================================================================================
// [插件名称] svg制作折线统计图组件
//----------------------------------------------------------------------------------------------------
// [描    述] 调用简单，配置简单，样式更灵活，更轻量级，整体原生开发，速度更快，优点：更小更快。
//----------------------------------------------------------------------------------------------------
// [作者网名] webkackchen（阿飞）
// [邮    箱] webkackchen@163.com
// [QQ交流] 602071930
// [版 本 号] ver0.0.1
//====================================================================================================
(function(d3){
    var svgNs = "http://www.w3.org/2000/svg";
    d3.CreatLine = function(){
        this.oParent = null,
            this.settings = {
                type:"甲醛",
                xTitle:false,
                data:[{x:"周一",y:12},{x:"周二",y:15},{x:"周三",y:9},{x:"周四",y:76},{x:"周五",y:35},{x:"周六",y:30},{x:"周天",y:42}]
            }
    }
    d3.CreatLine.prototype.init = function(oParent,opt){
        opt = opt || {};
        extend(this.settings,opt);
        var This = this;
        This.oParent = oParent;
        This.yMax = This.oParent.offsetHeight;
        This.xMax = This.oParent.offsetWidth;
        This.oSvg = creatTage("svg",{xmlns:"http://www.w3.org/2000/svg", width:"100%", height:"100%"});
        This.oParent.appendChild(This.oSvg );
        This.yAixDrew(This.yMax);
        This.xAixDrew(This.xMax);
        This.polyLineDrew();
        This.eventHandle();
    }
    d3.CreatLine.prototype.figureYunit = function(yMax){//计算实际点在图中对应的y坐标
        var yDataMax = this.settings.data[0].y;
        for(var i=0;i<this.settings.data.length;i++){
            if(this.settings.data[i].y > yDataMax){
                yDataMax = this.settings.data[i].y;
            }
        }
        this.yDataUnit = Math.floor(yDataMax/5);
        this.yFigureUnits = (yMax-40)/yDataMax;
        return {
            yDataUnit: Math.floor(yDataMax/5),
            yFigureUnits:(yMax - 40)/yDataMax
        }
    }
    d3.CreatLine.prototype.figureXunit = function(xMax){//计算实际点在图中对应的x坐标
        var xDatalength = this.settings.data.length;
        this.xDataUnit = Math.round((xMax-50)/xDatalength);
        return {
            xDataUnit: Math.round((xMax-50)/xDatalength)
        }
    }
    d3.CreatLine.prototype.yAixDrew = function(yMax){
        var yUnit = this.figureYunit(yMax);
        var oG = creatTage("g",{style:"cursor:pointer"});
        var oLine = creatTage("line",{x1:40,y1:0,x2:40,y2:yMax-30,stroke:"#c0d0e0"});
        oG.appendChild(oLine);
        for(var i=0;i<=5;i++){
            if(i == 0){
                continue;
            }
            var oText =  creatTage("text",{x:20,y:yMax-yUnit.yDataUnit*i*yUnit.yFigureUnits -23,"font-size":"20",'text-anchor':'middle'});
            var oLine1 = creatTage("line",{x1:40,y1:yMax-yUnit.yDataUnit*i*yUnit.yFigureUnits -30.5,x2:this.xMax,y2:yMax-yUnit.yDataUnit*i*yUnit.yFigureUnits -30.5,stroke:"#c0c0c0","stroke-width":1});
            oText.textContent = yUnit.yDataUnit*i;
            oG.appendChild(oText);
            oG.appendChild(oLine1);
        }
        this.oSvg .appendChild(oG);
    }
    d3.CreatLine.prototype.xAixDrew = function(xMax){
        var xUnit = this.figureXunit(xMax);
        var oG = creatTage("g",{});
        var oLine = creatTage("line",{x1:"40",y1:this.yMax-30,x2:this.xMax,y2:this.yMax-30,stroke:"#c0d0e0"});
        oG.appendChild(oLine);
        if(this.settings.xTitle){
            for(var i=0;i<this.settings.data.length;i++){
                var oText =  creatTage("text",{x:i*xUnit.xDataUnit+40,y:this.yMax-10,"font-size":"20",'text-anchor':'middle'});
                oText.textContent = this.settings.data[i].x;
                oG.appendChild(oText);
            }
        }
        var oText =  creatTage("text",{x:this.xMax-80,y:45,"font-size":"20",'text-anchor':'middle'});
        oText.textContent  = this.settings.type;
        oG.appendChild(oText);
        this.oSvg .appendChild(oG);
    }
    d3.CreatLine.prototype.polyLineDrew = function(){
        var oPolyLine = creatTage('polyline',{'fill':'rgba(155,198,239,0.3)','stroke':'#86898c','stroke-width':'1'});
        var piontsNum = "";
        var oCircleArr = [];
        var lastPoint = "";
        this.oSvg .appendChild( oPolyLine );
        if(piontsNum == ""){
            piontsNum = 40 + "," + (this.yMax-this.settings.data[0].y*this.yFigureUnits - 30);
            oCircle = creatTage('circle',{cursor:"move",dataX:this.settings.data[0].x,dataY:this.settings.data[0].y,cx:40,cy:(this.yMax-this.settings.data[0].y*this.yFigureUnits - 30),r:"5",'fill':'#7cb5ec','stroke':'#86898c','stroke-width':'1'});
            oCircle1 = creatTage('circle',{class:"circle",cursor:"move",dataX:this.settings.data[0].x,dataY:this.settings.data[0].y,cx:40,cy:(this.yMax-this.settings.data[0].y*this.yFigureUnits - 30),r:"20",'fill':'transparent','stroke':'tranprent','stroke-width':'0'});
            oCircleArr.push(oCircle);
            oCircleArr.push(oCircle1);
        }
        for(var i=1;i<this.settings.data.length;i++){
            piontsNum += "," + (i*this.xDataUnit+40) + "," + (this.yMax-this.settings.data[i].y*this.yFigureUnits - 30);
            oCircle = creatTage('circle',{cursor:"move",dataX:this.settings.data[i].x,dataY:this.settings.data[i].y,cx:(i*this.xDataUnit+40),cy:(this.yMax-this.settings.data[i].y*this.yFigureUnits - 30),r:"5",'fill':'#7cb5ec','stroke':'#86898c','stroke-width':'2'});
            oCircle1 = creatTage('circle',{class:"circle",cursor:"move",dataX:this.settings.data[i].x,dataY:this.settings.data[i].y,cx:(i*this.xDataUnit+40),cy:(this.yMax-this.settings.data[i].y*this.yFigureUnits - 30),r:"20",'fill':'transparent','stroke':'transprent','stroke-width':'0'});
            oCircleArr.push(oCircle);
            oCircleArr.push(oCircle1);
            if(i == this.settings.data.length-1){
                lastPoint = "," + (i*this.xDataUnit+40) + "," + (this.yMax - 30);
            }
        }
        oPolyLine.setAttribute("points","40," + (this.yMax - 30)+ "," + piontsNum + lastPoint);
        for(var j=0;j<oCircleArr.length;j++){
            this.oSvg .appendChild( oCircleArr[j] );
        }
    }
    d3.CreatLine.prototype.eventHandle = function(){
        var oCircleArr = document.getElementsByClassName("circle");
        for(var i=0;i<oCircleArr.length;i++){
            oCircleArr[i].addEventListener("touchstart",function(ev){
                var ev = ev.changedTouches[0];
                var oSvg = this.parentNode;
                var oMaskPrompt = oSvg.previousElementSibling;
                var dataX = this.getAttribute("dataX");
                var posY = this.getAttribute("cy");
                var posX = this.getAttribute("cx");
                var dataY = this.getAttribute("dataY");
                this.previousElementSibling.setAttribute("r",8);
                this.previousElementSibling.setAttribute("stroke","rgba(134,137,140,0.5)");

                oMaskPrompt.style.top = posY + "px";
                oMaskPrompt.style.left = posX + "px";
                oMaskPrompt.style.display = "block";
                oMaskPrompt.innerHTML = dataX + "<br/>" + dataY;
            });
            oCircleArr[i].onmouseenter = function(ev){
                var ev = ev || window.event;
                var oSvg = this.parentNode;
                var oMaskPrompt = oSvg.previousElementSibling;
                var dataX = this.getAttribute("dataX");
                var posY = this.getAttribute("cy");
                var posX = this.getAttribute("cx");
                var dataY = this.getAttribute("dataY");
                this.previousElementSibling.setAttribute("stroke","rgba(134,137,140,0.5)");
                this.previousElementSibling.setAttribute("r",8);

                oMaskPrompt.style.top = posY + "px";
                oMaskPrompt.style.left = posX + "px";
                oMaskPrompt.style.display = "block";
                oMaskPrompt.innerHTML = dataX + "<br/>" + dataY;
            }
            oCircleArr[i].onmouseleave = function(){
                var oSvg = this.parentNode;
                var oMaskPrompt = oSvg.previousElementSibling;
                this.previousElementSibling.setAttribute("r",5);
                this.previousElementSibling.setAttribute("stroke","#86898c");
                oMaskPrompt.style.display = "none";
            }
            oCircleArr[i].touchend = function(ev){
                var ev = ev.changedTouches[0];
                var oSvg = this.parentNode;
                var oMaskPrompt = oSvg.previousElementSibling;
                this.previousElementSibling.setAttribute("r",5);
                this.previousElementSibling.setAttribute("stroke","#86898c");
                oMaskPrompt.style.display = "none";
            }
        }
    }
    function extend(obj1,obj2){
        for(var attr in obj2){
            obj1[attr] = obj2[attr];
        }
    }
    function creatTage(tageName,json){//创建标签方法
        var oTage = document.createElementNS(svgNs,tageName);
        for(var attr in json){
            oTage.setAttribute(attr,json[attr]);
        }
        return oTage;
    }

})(window);

