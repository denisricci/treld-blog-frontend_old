function ajax(url, options) {
    settings = {
        method: 'GET',
        withCredentials: false,
        contentType: 'application/json',
        body: ''
    }

    settings = extend(options, settings);

    var promise = new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.open(settings.method, url, true);
        request.withCredentials = settings.withCredentials;
        request.setRequestHeader('Content-Type', settings.contentType);
        request.onreadystatechange = function () {
            if (request.readyState == XMLHttpRequest.DONE) {
                if (request.status >= 200 && request.status < 300) {
                    console.log(request.status + '-' + url);
                    var data = readBody(request);
                    if (isJson(data)) {
                        data = JSON.parse(data);
                    }
                    resolve(data);
                } else {
                    reject(request.status);
                }
            }
        }
        request.send(settings.body);
    });

    return promise;
}

function extend(obj1, obj2) {
    if (obj1 == undefined) {
        return obj2;
    }

    for (var attrName in obj1) {
        obj2[attrName] = obj1[attrName];
    }
    return obj2;
}

function readBody(xhr) {
    var data;
    if (!xhr.responseType || xhr.responseType === "text") {
        data = xhr.responseText;
    } else if (xhr.responseType === "document") {
        data = xhr.responseXML;
    } else {
        data = xhr.response;
    }
    return data;
}

function isJson(text) {
    if (text !== "" && (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, '')))) {
        return true;
    } else {
        return false;
    }
}
