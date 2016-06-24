"use strict";

function addMarker(data) {
    var marker = new google.maps.Marker({
        position: data.location,
        title: data.nickname,
        map: map
    });
    addInfoWindow(data, marker);
}

function addInfoWindow(data, marker) {
    var infowindow = new google.maps.InfoWindow({
        content: getInfoContent(data)
    });
    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });
}

function getInfoContent(data) {
    var address = data.address,
        forum = data.forum,
        nickname = data.nickname,
        username = data.username,
        forumContent;
    if (forum === "") {
        forumContent = "";
    } else {
        forumContent = '传递报告:<a href="https://bgm.tv/group/topic/' + forum
            + '" target="_blank">https://bgm.tv/group/topic/' + forum + '</a>';
    }
    return '<a href="https://bgm.tv/user/' + username
        + '" target="_blank">' + nickname + '</a>&nbsp;<small class="grey">@'
        + username + '</small><br>位置:'
        + address + '<br>' + forumContent;
}

function addLine(path, lineSymbol, map) {

}

function mapCallBack(data) {
    var current = data.current,
        route = data.route,
        undetermin = data.undetermin,
        map, statContent;
    window.map = new google.maps.Map(document.getElementById('map-content'), {
        center: { lat: 34.2596292, lng: 108.6870192 }, // 第一站 : 西安
        zoom: 5
    });
    undetermin.forEach(function (data) {
        addMarker(data);
    });
    for (var i = 0; i < route.length; i++) {
        addMarker(route[i]);
        // #stat content

        // addLine

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