/**
 * Copyright (c) 2013 Fran Verona
 *
 * Permission is hereby granted, free of charge, to any
 * person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the
 * Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the
 * Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice
 * shall be included in all copies or substantial portions of
 * the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY
 * KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
 * OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * JQuery Loadify v1.0
 * Release Date: March, 2013
 *  
 * Provide simple methods to put a mask over elements to simulate "Loading" functions
 */
if(jQuery)(
    function(jQuery){
        jQuery.extend(jQuery.fn,{
            
            /**
             *  Initialize the plugin
             *  @param   userOptions     Array with desire options
             */
            loadify: function(userOptions) {
                
                // Default options
                var defaults = {
                    canvas:         true,           //  By default, we use HTML5 canvas element (is not supported by IE < 7 and older versions of other browsers)
                    style:          'default',      //  If canvas is true, we draw a loading gif by default
                    color:          '#ffffff',      //  Background color
                    textcolor:      '#000000',      //  Text color
                    circlecolor:    '#BDBDBD',      //  If canvas is true, this is the color of the outer circles
                    bigcolor:       '#000000',      //  If canvas is true, this is the color of the big rotating circle
                    message:        '',             //  By default, we do not show any message
                    fontfamily:     'Arial',        //  Font family
                    fontsize:        16             //  Font size
                }
        
                jQuery(this).data('loadify',$.extend(true, {}, defaults, userOptions));
        
            },
            /**
             *  Put "Loading" mask over the element using options specified before
             */
            load: function(){
                
                function drawloader(owner, options){
                    
                    var canvas = owner.find('#jquery-loading-canvas')[0], ctx = canvas.getContext('2d'), M = Math, $self = owner,
                    W = options.width, H = options.height;
                    
                    canvas.width = W;
                    canvas.height = H;

                    /**
                     * Object to handle 'Loading' image drawn
                     * @param   hasmsg  True if 'Loading' image should take care of message below it. False by default.
                     */
                    function loading(hasmsg){
                        
                        hasmsg = hasmsg || true;
    
                        this.r = 25;
    
                        // Check if we have a message to display to reposition the main loading "image"
                        if(!hasmsg){
                            this.position = {
                                x: W/2,
                                y: H/2
                            }
                        }
                        else{
                            this.position = {
                                x: W/2,
                                y: H/2 - 20
                            }
                        }
                        
                        // Angle to rotate
                        this.angle = 0;
                        
                        // Angle to rotate arrows
                        this.arrowangle = -90;
                        
                        // Angles to rotate arrow tails
                        this.tailangle1 = 0.45;
                        this.tailangle2 = 160.8;
                        
                        // Check if we have a message to display to reposition the main loading "image"
                        if(!hasmsg){
                            this.squareposition = {
                                x: W/2 - 75,
                                y: H/2
                            }
                        }
                        else{
                            this.squareposition = {
                                x: W/2 - 75,
                                y: H/2 - 20
                            } 
                        }
                        
                        // To decide which square should paint (only for 'square')
                        this.square = 0;
                        
                        function drawArrow(arrowMiddlePointX, arrowMiddlePointY) {
                            ctx.beginPath();
                            var arrowStartingPointX = arrowEndPointX = arrowMiddlePointX - 7;
                            var arrowStartingPointY = arrowMiddlePointY - 6;
                            var arrowEndPointY = arrowMiddlePointY + 6;
                            ctx.beginPath();
                            ctx.moveTo(arrowStartingPointX, arrowStartingPointY);
                            ctx.lineTo(arrowMiddlePointX, arrowMiddlePointY);
                            ctx.lineTo(arrowEndPointX, arrowEndPointY);
                            ctx.lineTo(arrowMiddlePointX, arrowMiddlePointY);
                            ctx.moveTo(arrowStartingPointX, arrowStartingPointY);
                            ctx.closePath();
                            ctx.lineWidth = 3;
                            ctx.stroke();
                        }
    
                        this.draw = function(style){
                            
                            switch(style){
                                case 'default':
                                    // External circle (path)
                                    for(var i=0;i<14;i++){
                                        var x = this.position.x  + ((this.r) * M.cos((i*30)*(M.PI/180)));
                                        var y = this.position.y  + ((this.r) * M.sin((i*30)*(M.PI/180)));
            
                                        ctx.beginPath();
                                        ctx.arc(x, y, 4, 0 , 2 * Math.PI, false);
                                        ctx.fillStyle = options.circlecolor;
                                        ctx.fill();
                                        ctx.closePath();
                                    }
        
                                    // Loading circle
                                    var x = this.position.x  + ((this.r) * M.cos((this.angle)*(M.PI/180)));
                                    var y = this.position.y  + ((this.r) * M.sin((this.angle)*(M.PI/180)));
            
                                    ctx.beginPath();
                                    ctx.arc(x, y, 6, 0 , 2 * Math.PI, false);
                                    ctx.fillStyle = options.bigcolor;
                                    ctx.fill();
                                    ctx.closePath();
        
                                    this.angle+=30;
                                    break;
                                case 'circle':
                                    // Tail
                                    for(var i=0;i<4;i++){
                                        var x = this.position.x + ((this.r) * M.cos((this.angle)*(M.PI/180)));
                                        var y = this.position.y + ((this.r) * M.sin((this.angle)*(M.PI/180)));
            
                                        ctx.beginPath();
                                        ctx.arc(x, y, 4, 0 , 2 * Math.PI, false);
                                        ctx.fillStyle = options.circlecolor;
                                        ctx.fill();
                                        ctx.closePath();
        
                                        this.angle+=20;
                                    }
        
                                    this.angle+=5;
        
                                    // Head
                                    var x = this.position.x  + ((this.r) * M.cos((this.angle)*(M.PI/180)));
                                    var y = this.position.y  + ((this.r) * M.sin((this.angle)*(M.PI/180)));
            
                                    ctx.beginPath();
                                    ctx.arc(x, y, 5, 0 , 2 * Math.PI, false);
                                    ctx.fillStyle = options.bigcolor;
                                    ctx.fill();
                                    ctx.closePath();
        
                                    this.angle-=40;
                                    break;
                                case 'bigroller':
                                    for(var i=0;i<10;i++){
                                        var x = this.position.x + ((this.r) * M.cos((this.angle+i*40)*(M.PI/180)));
                                        var y = this.position.y + ((this.r) * M.sin((this.angle+i*40)*(M.PI/180)));
            
                                        ctx.beginPath();
                                        ctx.arc(x, y, i, 0 , 2 * Math.PI, false);
                                        ctx.fillStyle = options.bigcolor;
                                        ctx.fill();
                                        ctx.closePath();
                                    }
                                    this.angle+=15;
                                    break;
                                case 'arrows':
                                    // Arrow #1 Head
                                    var x1 = this.position.x  + ((this.r) * M.cos((this.arrowangle)*(M.PI/180)));
                                    var y1 = this.position.y  + ((this.r) * M.sin((this.arrowangle)*(M.PI/180)));
                                    ctx.save();
                                    ctx.translate(x1, y1);
                                    ctx.rotate(this.angle*(Math.PI/180));
                                    drawArrow(0, 0);
                                    ctx.restore();
                                    
                                    // Arrow #1 Tail
                                    ctx.beginPath();
                                    ctx.arc(this.position.x, this.position.y, this.r, this.tailangle1 , this.tailangle1+M.PI/3, false);
                                    ctx.lineWidth = "3";
                                    ctx.stroke();
                                    ctx.closePath();
                                    
                                    // Arrow #2 Head
                                    var x2 = this.position.x  + ((this.r) * M.cos((this.arrowangle+180)*(M.PI/180)));
                                    var y2 = this.position.y  + ((this.r) * M.sin((this.arrowangle+180)*(M.PI/180)));
                                    ctx.save();
                                    ctx.translate(x2, y2);
                                    ctx.rotate((this.angle+180)*(Math.PI/180));
                                    drawArrow(0, 0);
                                    ctx.restore();
                                    
                                    // Arrow #2 Tail
                                    ctx.beginPath();
                                    ctx.arc(this.position.x, this.position.y, this.r, this.tailangle2 , this.tailangle2+M.PI/3, false);
                                    ctx.lineWidth = "3";
                                    ctx.stroke();
                                    ctx.closePath();
                                    
                                    this.angle+=20;
                                    this.tailangle1+=M.PI/9;
                                    this.tailangle2+=M.PI/9;
                                    this.arrowangle+=20;
                                    break;
                                case 'squares':
                                    for(var i=0;i<6;i++){
                                        ctx.fillStyle = options.circlecolor;
                                        if(i == this.square){
                                            ctx.fillStyle = options.bigcolor;
                                        }
                                        ctx.fillRect(this.squareposition.x+i*30,this.squareposition.y,15,15);
                                    }
                                    this.square = (this.square+1) % 6;
                                    break;
                            }
        
                        }
                    }

                    /**
                     *  Object to handle 'Message'
                     *  @param  msg     String with the message
                     *  @param  x       X coordinate to position the message
                     *  @param  y       Y coordinate to position the message
                     */
                    function message(msg,x,y){
    
                        this.msg = msg;
                        
                        this.position = {
                            x: x,
                            y: y
                        }
    
                        this.draw = function(){
                            ctx.font = options.fontsize+"px "+options.fontfamily;
                            ctx.textAlign = "start";
                            ctx.fillStyle = options.textcolor;
                            
                            var m = ctx.measureText(this.msg).width;
                            this.position.x = W/2-m/2;
                            
                            ctx.fillText(this.msg, this.position.x, this.position.y);
                        }
                    }
                    
                    var l,m;
                    if(options.message != ""){
                        l = new loading();
                        m = new message(options.message,l.position.x-l.r+40,l.position.y+l.r+40)
                    }
                    else{
                        l = new loading(false);
                    }

                    // Set and save the interval to redraw the canvas
                    $self.data('interval', setInterval(function () {
                        ctx.fillStyle = options.color;
                        ctx.fillRect(0, 0, W, H);
                        l.draw(options.style);
                        // We do not draw message if we do not have one
                        if(m) m.draw();
                    }, 100));
                }
            
                /**
                  * Browser compatibility
                  */
                function isBrowserCompatible(){
                    var browserversion = -1;
                    if (navigator.appName == 'Microsoft Internet Explorer')
                    {
                        var useragent = navigator.userAgent;
                        var regexp  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                        if (regexp.exec(useragent) != null)
                            browserversion = parseFloat( RegExp.$1 );
                    }
                    if((navigator.appName == "Microsoft Internet Explorer") && ((browserversion == 6.0) || (browserversion == 7.0)))
                        return false;
                    return true;
                }
                
                var $self = jQuery(this),
                options = $self.data('loadify'),
                load_div = ['<div class="jquery-loading">',
                '<canvas id="jquery-loading-canvas"></canvas>',
                '</div>'],
                content_div = ['<div class="jquery-loading-content">',
                $self.html(),
                '</div>'];
            
                $self.empty();
                $self.append(content_div.join(""));
                
                $self.css('position','relative');
                
                // Save padding to restore it later
                $self.data('padding',$self.css('padding')[0]);
                
                $self.css('padding','0');
                
                // Check for Canvas compatible (IE>6, Mozilla and Chrome)
                if(isBrowserCompatible() && options.canvas){
                    $self.append(load_div.join(""));
                    
                    var canvasoptions = {
                        width:      $self.width(),
                        height:     $self.height()
                    }
                    canvasoptions = $.extend(true, {}, options, canvasoptions);
                    drawloader($self, canvasoptions);
                }
                else{
                    load_div = ['<div class="jquery-loading">',
                    '<div class="jquery-loading-img">',
                    '</div>',
                    '<div class="jquery-loading-text">',
                    options.message,
                    '</div>',
                    '</div>'];
                    $self.append(load_div.join(""));
                    
                    var img_margin_top = $self.height()/2-30;
                    $self.find('.jquery-loading-img').css('margin-top',img_margin_top+'px');
                    
                    $self.find('.jquery-loading').css({
                        'background-color': options.color
                    });
                    
                    $self.find('.jquery-loading-text').css({
                        'color':        options.textcolor,
                        'font-family':  options.fontfamily,
                        'font-size':    options.fontsize
                    });
                }
                
            },
        
            unload: function(){
                var $self = jQuery(this), content = $self.find('.jquery-loading-content').html(), 
                interval = $self.data('interval'), padding = $self.data('padding');

                $self.find('.jquery-loading').remove();
                $self.find('.jquery-loading-content').remove();
                $self.html(content);
                
                $self.css('padding',padding);

                if(interval)
                    clearInterval(interval);
            }
        })
    })(jQuery);