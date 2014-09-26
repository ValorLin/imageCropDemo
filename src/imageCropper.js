(function () {
    var ImageCropper = window.ImageCropper = function ($cropper, options) {
        var $image, $controls, $zoomIn, $zoomOut, $zoomSlider, $cropperMask, $cropperMaskAfter;

        this.options = $.extend(true, {
            width: 320,
            height: 320,
            cropWidth: 220,
            cropHeight: 220
        }, options);

        $cropper.css({
            width: this.options.width,
            height: this.options.height
        }).addClass('cropper');

        this.$image = $image = $('<img>').attr({
            width: this.options.cropWidth,
            height: this.options.cropHeight
        });

        this.$cropperMask = $cropperMask = $('<div class="cropper-mask"></div>').css({
            width: this.options.cropWidth,
            height: this.options.cropHeight,
            padding: (this.options.width - this.options.cropWidth) / 2,
            overflow: 'hidden',
            position: 'relative'
        });

        $cropperMaskAfter = $('<div class="cropper-mask-after"></div>').css({
            position: 'absolute',
            top: 0,
            left: 0,
            width: this.options.cropWidth,
            height: this.options.cropHeight,
            borderWidth: (this.options.width - this.options.cropWidth) / 2
        });

        $controls = $('<div class="cropper-controls"></div>');
        this.$zoomIn = $zoomIn = $('<span class="cropper-zoom-in"></span>');
        this.$zoomOut = $zoomOut = $('<span class="cropper-zoom-out"></span>');
        // IE6 默认 inline 的元素才可设为 inline-block 所以要用 inline 元素 span
        this.$zoomSlider = $zoomSlider = $('<span></span>');

        $cropper
            .append($cropperMask.append($image).append($cropperMaskAfter))
            .append($controls.append($zoomOut).append($zoomSlider).append($zoomIn));
    };

    $.extend(true, ImageCropper.prototype, {
        setImage: function (src, naturalWidth, naturalHeight) {
            var self = this;
            var crop,
                $cropperMask = this.$cropperMask,
                $zoomSlider = this.$zoomSlider;

            // 如果不是第一次设置图片，需要重置。
            if (this.crop) {
                this.$zoomIn.off();
                this.$zoomOut.off();
                $cropperMask.off();
                $zoomSlider.off();
                this.$cropFrame.replaceWith(this.$image);
                this.$zoomSlider.empty();
            }

            this.$image.attr('src', src);

            this.crop = crop = this.$image.crop({
                naturalWidth: naturalWidth,
                naturalHeight: naturalHeight,
                controls: false,
                $handler: this.$cropperMask
            }).on('change.crop', function (e) {
                self._clipX = e.cropX;
                self._clipY = e.cropY;
                self._clicpWidth = e.cropW;
                self._clipHeight = e.cropH;
            }).data('crop');

            this.$cropFrame = this.$image.parent().css('overflow', 'visible');

            // init slider
            this.slider = $zoomSlider.rangeslider({
                min: crop.minPercent,
                max: 1
            }).data('slider');

            // zoom on scroll
            $cropperMask.on('mousewheel', function (e) {
                e.originalEvent.wheelDelta > 0 ? self.zoomIn() : self.zoomOut();
            });

            // zoom on click
            this.$zoomIn.on('click', $.proxy(this.zoomIn, this));
            this.$zoomOut.on('click', $.proxy(this.zoomOut, this));

            // zoom on slider change
            $zoomSlider.on('change.rangeslider', function (e, value) {
                crop.zoom(value);
            });
        },

        getCropZone: function () {
            return {
                x: this._clipX,
                y: this._clipY,
                width: this._clicpWidth,
                height: this._clipHeight,
                cropWidth: this.options.cropWidth,
                cropHeight: this.options.cropHeight
            };
        },

        zoomIn: function () {
            this.crop.zoomIn();
            this.slider.setValue(this.crop.percent);
        },

        zoomOut: function () {
            this.crop.zoomOut();
            this.slider.setValue(this.crop.percent);
        }
    });
})();