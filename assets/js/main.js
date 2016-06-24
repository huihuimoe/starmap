"use strict";

function addMarker(location, map, title, label) {
    label = label || "";
    return new google.maps.Marker({
        position: location,
        label: label.toString(),
        map: map,
        title: title
    });
}

function addInfoWindow(content, marker) {

}

function addLine(path, lineSymbol, map) {
    
}

function mapCallBack(data) {
    var current = data.current,
        route = data.route,
        undetermin = data.undetermin,
        map;
    map = new google.maps.Map(document.getElementById('map-content'), {
        center: { lat: 34.2596292, lng: 108.6870192 },
        zoom: 5.2
    });

    /**
     * 转换完成后需要用到的变量
     * route
     * undetermin
     * current
     * map
     */
    /**
     * 标记 和 面板部分
     * route undetermin 的location都需要做
     * 面板就是个人信息什么的……
     */
    /**
     * 画线部分 和 传递状况
     * index < current-1 部分画实线
     * 其余部分画虚线或者其他表示方式 (选做)
     * 传递状况做一个list就可以
     */
    route.forEach(function (data, index) {
        let {address, forum, location, nickname, username} = data;
        addMarker(location, map, nickname, index);
    });

    // Debug require
    //console.log(route);
    window.map=map;
}

function initMap() {
    var request = new XMLHttpRequest(),
        dataurl = "assets/data_convert.json",
        callback = mapCallBack;
    request.open('GET', dataurl, true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            callback.call(this, JSON.parse(request.responseText));
        } else {
            alert("500啦，按下F5吧~");
        }
    };
    request.onerror = function () {
        alert("请求超时啦，按下F5吧~");
    };
    request.send();
}