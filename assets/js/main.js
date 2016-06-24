"use strict";

function addMarker(data, index) {
    var marker = new google.maps.Marker({
        position: data.location,
        title: data.nickname,
        map: map
    });
    addInfoWindow(data, marker, index);
}

function addInfoWindow(data, marker, index) {
    var address = data.address,
        forum = data.forum,
        nickname = data.nickname,
        username = data.username,
        forumContent, indexContent, content;
    if (forum === "") {
        forumContent = "";
    } else {
        forumContent = '传递报告:<a href="https://bgm.tv/group/topic/' + forum
            + '" target="_blank">https://bgm.tv/group/topic/' + forum + '</a>';
    }
    if (index) {
        indexContent = "第" + index + "站";
    } else {
        indexContent = "海外党";
    }
    content = '<a href="https://bgm.tv/user/' + username
        + '" target="_blank">' + nickname + '</a>&nbsp;<small class="grey">@'
        + username + '</small><br>' + indexContent + '&nbsp;'
        + address + '<br>' + forumContent;
    marker.addListener('click', function () {
        new google.maps.InfoWindow({
            content: content
        }).open(map, marker);
    });
}

function addLine(path, lineSymbol) {

}

function mapCallBack(data) {
    var current = data.current,
        route = data.route,
        aboard = data.aboard,
        map, statContent;
    window.map = new google.maps.Map(document.getElementById('map-content'), {
        center: { lat: 34.2596292, lng: 108.6870192 }, // 第一站 : 西安
        zoom: 5
    });
    aboard.forEach(function (data) {
        addMarker(data);
    });
    for (var i = 0; i < route.length; i++) {
        addMarker(route[i], ++i);
        if (++i < current) {
            // 实线粉色

        } else if (++i === current) {
            // 实线灰色

        } else if(i === route.length){
            continue;
        }else{
            // 虚线灰色

        }
        // #stat content

    }
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