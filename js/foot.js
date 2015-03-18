App={init:function(){this.initPlugins();this.initModules()},initPlugins:function(){for(var plugin in this.plugins){if(typeof(this.plugins[plugin].init)=='function'){this.plugins[plugin].init()}}},initModules:function(){for(var module in this.modules){var id=module.replace(/([A-Z])/g,'-$1').toLowerCase();id=id.substring(0,1)=='-'?id.substring(1):id;var mod=document.getElementById(id);if(mod&&typeof(this.modules[module].init)=='function'){this.modules[module].init(mod)}}},modules:[],plugins:[]};function number_format(number,decimals,dec_point,thousands_sep){number=(number+'').replace(/[^0-9+\-Ee.]/g,'');var n=!isFinite(+number)?0:+number,prec=!isFinite(+decimals)?0:Math.abs(decimals),sep=(typeof thousands_sep==='undefined')?',':thousands_sep,dec=(typeof dec_point==='undefined')?'.':dec_point,s='',toFixedFix=function(n,prec){var k=Math.pow(10,prec);return''+(Math.round(n*k)/k).toFixed(prec)};s=(prec?toFixedFix(n,prec):''+Math.round(n)).split('.');if(s[0].length>3){s[0]=s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,sep)}if((s[1]||'').length<prec){s[1]=s[1]||'';s[1]+=new Array(prec-s[1].length+1).join('0')}return s.join(dec)}App.plugins.AddScrollClasses={init:function(){var lastST=0;var sensitivity=100;window.addEventListener('scroll',function(e){var st=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop;if(st){document.body.classList.add('has-scrolled')}else{document.body.classList.remove('has-scrolled')}if(Math.abs(lastST-st)>sensitivity){if(st>lastST){document.body.classList.remove('scrolling-up');document.body.classList.add('scrolling-down')}else{document.body.classList.remove('scrolling-down');document.body.classList.add('scrolling-up')}lastST=st}})}};App.plugins.InputRangeUtils={init:function(){this.values();this.colors()},values:function(){var inputs=document.querySelectorAll('input[type=range]');for(var i=0;i<inputs.length;i++){(function(){var input=inputs[i];var label=document.querySelector('label[for="'+input.id+'"]');var type=input.getAttribute('data-value-type')?input.getAttribute('data-value-type'):'';var typeB=input.getAttribute('data-value-type-before')?input.getAttribute('data-value-type-before'):'';var value=document.createElement('span');value.classList.add('value');label.appendChild(value);var updateValue=function(){value.innerHTML=typeB+number_format(input.value,0,',',' ')+type};updateValue();input.addEventListener('input',updateValue);input.addEventListener('change',updateValue)})()}},colors:function(){var inputs=document.querySelectorAll('input[type=range]');for(var i=0;i<inputs.length;i++){(function(){var input=inputs[i];var leftColor='#1c69d3';var rightColor='#888';var updateColor=function(){var val=(input.value-input.getAttribute('min'))/(input.getAttribute('max')-input.getAttribute('min'));val*=100;input.style.backgroundImage='linear-gradient(90deg, '+leftColor+' 0%, '+leftColor+' '+val+'%, '+rightColor+' '+val+'%, '+rightColor+' 100%)'};updateColor();input.addEventListener('input',updateColor);input.addEventListener('change',updateColor)})()}}};