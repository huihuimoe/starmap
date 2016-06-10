var map;
function fetchJson(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            callback.call(this, JSON.parse(request.responseText));
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
    fetchJson("assets/data.json", function(data) {
        console.log(data);
    });
    map = new google.maps.Map(document.getElementById('map-content'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
}
