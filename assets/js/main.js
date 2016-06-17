var map;
function fetchJson(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            callback.call(this, JSON.parse(
                request.responseText.replace(/("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n))/g, function (word) {
                    return /^\/{2,}/.test(word) ? "" : word; //去除注释
                })));
        } else {
            alert("地图加载失败啦，按下F5吧~");
        }
    };
    request.onerror = function () {
        alert("地图加载失败啦，按下F5吧~");
    };
    request.send();
}

function initMap() {
    fetchJson("assets/data.json", function (data) {
        console.log(data);
    });
    map = new google.maps.Map(document.getElementById('map-content'), {
        center: { lat: 22.8531358, lng: 111.249542 },
        zoom: 8
    });
}
