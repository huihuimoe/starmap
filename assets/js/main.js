"use strict";

function mapCallBack(data) {
    //let {current, profile, route, undetermin} = data;
    var current = data.current,
        allProfile = data.profile,
        route = data.route,
        undetermin = data.undetermin,
        map;
    map = new google.maps.Map(document.getElementById('map-content'), {
        //center: { lat: 22.8531358, lng: 111.249542 },
        //zoom: 8
    });
    route.forEach(function(username, index){
        var profile = Object.getOwnPropertyDescriptor(allProfile, username).value;
        /**
         * maybe use
         * 
         * profile  - Object
         *   - nickname
         *   - location
         *   - forum
         * username - String
         * index    - Number
         * current  - Number
         */
        console.log(profile);
    });
    // Debug require
    window.map = map;
    window.data = data;
    //console.log(data, map);
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