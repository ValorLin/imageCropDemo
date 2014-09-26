# 图片裁剪插件使用方法 #
效果:
[点这里看 DEMO](https://weilao.github.io/imageCropDemo)

安装依赖:
```cmd
bower install --save-dev weilao/simple-rangeslider
bower install --save-dev weilao/jQuery-crop-ie6
```
引用js文件:

```html
<script type="text/javascript" src="bower_components/simple-rangeslider/libs/jquery/jquery.js"></script>
<script type="text/javascript" src="bower_components/simple-rangeslider/dist/jquery.simple-rangeslider.js"></script>
<script type="text/javascript" src="bower_components/jQuery-crop-ie6/jquery.crop.js"></script>
<script type="text/javascript" src="bower_components/jQuery-crop-ie6/jquery.mousewheel.js"></script>
<script type="text/javascript" src="./src/imageCropper.js"></script>
```

Html:
```html
<div class="cropper"></div>
```

自定义样式:
```css
.cropper {
    margin: 0 auto;
}

.cropper-mask {
	/* 这里定义自己喜欢的鼠标指针样式，webkit 里面有个 grab,grabing 的手型鼠标指针 */
    cursor: move;
}

/* 半透明蒙层样式 */
.cropper-mask-after {
    opacity: .75;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1), inset 0 0 20px 1px rgba(0, 0, 0, 0.2);
    border: 40px solid #FFFFFF;
    filter: alpha(opacity=75);
}

.cropper-controls {
    text-align: center;
}

/* slider条样式 */
.rangeslider {
    display: inline-block;
    width: 208px;
    margin: 10px auto;
    height: 8px;
    background-color: #E1E8ED;
    border: 0;
    border-radius: 4px;
    box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.15);
    cursor: pointer;
}

.rangeslider-handler {
    cursor: pointer;
    width: 16px;
    height: 16px;
    border: 1px solid #C5C5C5;
    border-radius: 32px;
    background-color: #FFF;
    background: linear-gradient(#FFF, #E0E0E0);
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
    -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#ffffff, endColorstr=#e0e0e0, GradientType=0);
}


/* 缩放按钮 */
.cropper-zoom-in, .cropper-zoom-out {
    width: 32px;
    height: 32px;
    margin: 0 10px;
    cursor: pointer;
    display: inline-block;
}

.cropper-zoom-out {
    background-image: url(zoom_out.png);
}

.cropper-zoom-in {
    background-image: url(zoom_in.png);
}
```

Js:
```js
var imageCropper = new ImageCropper($('.cropper'), {
    width: 500,
    height: 500,
    cropWidth: 400,
    cropHeight: 400
});
imageCropper.setImage('./bower_components/jQuery-crop-ie6/beach.jpg', 1200, 799);

```

## 配置项 ##
### width ###
整个插件的宽度

### height ###
整个插件的高度

### cropWidth ###
图片裁剪后的宽度

### cropHeight ###
图片裁剪后的高度

## 方法 ##
### setImage(url, naturalWidth, naturalHeight) ###
更改要裁剪的图片，传入原图片的高度和宽度。

### getCropZone() ###
获取裁剪所需的数据，数据格式如下：
```js
{
	// 从坐标 (0,0) 开始，裁剪出 500x500 的图片
	x: 0,
	y: 0,
	width: 500,
	height: 500,

	// 最终图片请缩放成以下尺寸
	cropWidth: 400,
	cropHeight: 400
}
```