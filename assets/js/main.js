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
    var infoWindow = new google.maps.InfoWindow({
        content: content
    });
    marker.addListener('click', function () {
        infoWindow.open(map, marker);
    });
}

function addLine(path, color, lineSymbol) {
    if (lineSymbol) {
        var setting = {
            path: path,
            strokeColor: color,
            strokeOpacity: 0,
            icons: [{
                icon: lineSymbol,
                offset: '0',
                repeat: '20px'
            }],
        }
    } else {
        var setting = {
            path: path,
            geodesic: true,
            strokeColor: color,
            strokeOpacity: 1,
            strokeWeight: 2
        }
    }
    var line = new google.maps.Polyline(setting);
    line.setMap(map);
}

function mapCallBack(data) {
    var current = data.current,
        route = data.route,
        aboard = data.aboard,
        path1 = new Array(),
        path2 = new Array(),
        path3 = new Array(),
        map, statContent;
    window.map = new google.maps.Map(document.getElementById('map-content'), {
        center: { lat: 34.2596292, lng: 108.6870192 }, // 第一站 : 西安
        zoom: 5
    });
    aboard.forEach(function (data) {
        addMarker(data);
    });
    for (var i = 0; i < route.length; i++) {
        var next = i + 1;
        addMarker(route[i], next);
        if (i < current) {
            path1[i] = route[i].location;
        } else if (i === current) {
            path2[0] = route[i - 1].location;
            path2[1] = route[i].location;
        } else {
            path3[i - 1 - current] = route[i - 1].location;
        }
        // #stat content

    }
    // 增加最后的路线
    path3[route.length - 1 - current ] = route[route.length - 1].location;
    addLine(path1, 'rgb(233,30,99)');
    addLine(path2, 'rgb(153,153,153)');
    addLine(path3, 'rgb(153,153,153)', {
            path: 'M 0,-1 0,1',
            strokeOpacity: 1,
            scale: 2
    });
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