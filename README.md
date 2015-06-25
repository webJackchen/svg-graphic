# svg-graphic
#####svg画的折线图组件
=======================================================================</br>
 [插件名称] svg制作折线统计图组件</br>
----------------------------------------------------------------------------------------------------</br>
 [描    述] 调用简单，配置简单，样式更灵活，更轻量级，整体原生开发，速度更快，优点：更小更快。兼容各
            大主流浏览器,IE8及以下不支持。</br>
----------------------------------------------------------------------------------------------------</br>
 [作者网名] webjackchen（阿飞）</br>
 [邮    箱] webjackchen@163.com</br>
 [QQ交流] 602071930</br>
 [版 本 号] ver0.0.1</br>
========================================================================</br>
####html

&lt;div&nbsp;id="div1"&nbsp;class="figurebox"&gt;</br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;div&nbsp;class="maskPrompt"&gt;</br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;</br>
&lt;/div&gt;</br>

####js部分
首先引入svg-graphic.js</br>
&lt;script type="text/javascript" src="svg-graphic.js"&gt;&lt;/script&gt;</br>

然后实例化对象 CreatLine();</br>
设置配置项</br>

&nbsp;var&nbsp;oDiv1&nbsp;=&nbsp;document.getElementById("div1");</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var&nbsp;d1&nbsp;=&nbsp;new&nbsp;CreatLine();</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;d1.init(oDiv1,{</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type:"甲醛",</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data:[{x:"周一",y:14},{x:"周二",y:15},{x:"周三",y:1500},{x:"周四",y:76},{x:"周五",y:3500},{x:"周六",y:30},{x:"周天",y:42},{x:"周六",y:30},{x:"周天",y:42},{x:"周六",y:30},{x:"周天",y:42}]</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});</br>

#####具体效果，请看demo
