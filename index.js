$(function () {

    $('ul li').each(function () {
     console.log(this);
        move($(this))
    });
    var res;

    function move($li) {
            // console.log($li)  //jquery对象
        var $active = $li.children('.active');  //这个就是遮罩层的宽和高
        // console.log($active)
        var backW = $li.outerWidth();
        var backH = $li.outerHeight();
        console.log(backW, backH);
        $li.mouseenter(function (e) {  //在这里我们是不是可以这样理解 $li是一个jquery对象，而我们直接用this的话，是一个dom元素，$(this)表示一个jquery对象
            // console.log($li)  //jquery对象
            e = e || window.event;
            var x = e.clientX - $(this).offset().left - $(this).outerWidth() / 2; //这个是鼠标当前在这个li中的中心位置
            var y = $(this).outerHeight() / 2 - (e.clientY - $(this).offset().top);
            console.log(x, y);
            compute(x, y);
            switch(res){
                case 0:
                    $active.css({top:0,left:-backW});
                    break;
                case 1:
                    $active.css({top:backH,left:0});
                    break;
                case 2:
                    $active.css({top:0,left:backW});
                    break;
                case 3:
                    $active.css({top:-backH,left:0})
            }
            $active.top().animate({left:0,top:0},'fast')
        });
        $li.mouseleave(function(e){
            e=e||window.event;
            var x = e.clientX - $(this).offset().left - $(this).outerWidth() / 2; //这个是鼠标当前在这个li中的中心位置
            var y = $(this).outerHeight() / 2 - (e.clientY - $(this).offset().top);
           switch(res){
               case 0:
                   $active.animate({top:0,left:backW},'fast');
                   break;
               case 1:
                   $active.animate({top:-backH,left:0},'fast');
                   break;
               case 2:
                   $active.animate({top:0,left:-backW},'fast');
                   break;
               case 3:
                   $active.animate({top:backH,left:0},'fast')
           }


        })

    }


    function compute(x, y) {
        //获得方向的弧度制
        var rad = Math.atan2(y, x);
        //获得方向的角度制
        var angle = 180 * rad / Math.PI;
        //将角度经过一系列运算，最终得到四个方向四个值，返回出去
        res = Math.round((angle + 180) / 90) % 4;
        return res;
    }


});