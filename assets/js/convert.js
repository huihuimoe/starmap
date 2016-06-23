"use strict";
var route = new Array(), undetermin = new Array();

function convert() {
    var result = {
        "current": data.current,
        "route": route,
        "undetermin": undetermin
    };
    document.getElementById("result").innerHTML = JSON.stringify(result);
}

function mapCallBack(data, second) {
    second = second || 0;
    if (second) {
        if (route[0]){
            convert();
            return;
        }
        console.log("dataConvent route start");
        dataConvent(data, data.route, route);
    } else {
        window.data = data;
        console.log("dataConvent undetermin start");
        dataConvent(data, data.undetermin, undetermin);
    }
}

function dataConvent(data, before, after, index) {
    index = index || 0;
    var username = before[index],
        profile = Object.getOwnPropertyDescriptor(data.profile, username).value,
        isStop = index === before.length - 1;
    profile.username = username;
    getLocation(data, profile, index, before, after, isStop);
}

function getLocation(data, profile, index, before, after, isStop) {
    var service = new google.maps.Geocoder();
    service.geocode({
        address: profile.address
    }, function (result, status) {
        if (status !== "OK") {
            alert("查询太快了，稍微等待一下……");
            console.log(status, profile);
            getLocation(data, profile, index, before, after, isStop);
            return;
        }
        profile.address = result[0].formatted_address;
        profile.location={
            lat : result[0].geometry.location.lat(),
            lng : result[0].geometry.location.lng()
        };
        after[index] = profile;
        console.log(index);
        if (isStop) {
            console.log("dataConvent complete!");
            mapCallBack(data, true);
        } else {
            dataConvent(data, before, after, ++index);
        }
    }.bind(this));
}

function initMap() {
    var request = new XMLHttpRequest(),
        dataurl = "assets/data.json",
        callback = mapCallBack;
    request.open('GET', dataurl, true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            callback.call(this, JSON.parse(
                request.responseText.replace(/("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n))/g, function (word) {
                    return /^\/{2,}/.test(word) ? "" : word; //去除注释
                })));
        } else {
            alert("500啦，按下F5吧~");
        }
    };
    request.onerror = function () {
        alert("请求超时啦，按下F5吧~");
    };
    request.send();
}