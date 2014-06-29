(function() {
    'use strict';

    var allowedDataType = ['json', 'html', 'text'],
        MEDIA_JSON = 'application/json;charset=utf-8',
        MEDIA_HTML = 'application/html;charset=utf-8';

    function DataTypeNotSupportException(dataType) {
        this.toString = function() {
            return 'Data type "' + dataType + '" of ajax request is not allowed.';
        };
    }


    var asyncRequest = function(url, params, method, dataType) {
        var t = (method || 'get').toLowerCase(),
            dataType = dataType || 'json',
            data = t === 'get' ? params: JSON.stringify(params || {}),
            contentType = MEDIA_JSON,
            deferred = new $.Deferred();

        if ($.inArray(dataType, allowedDataType) === -1) {
            throw new DataTypeNotSupportException(dataType);
        }

        if (dataType === 'html') {
            data = params;
            contentType = MEDIA_HTML;
        }

        return $.ajax({
            cache: false,
            url: url,
            type: t,
            dataType: dataType || 'json',
            data: data,
            contentType: contentType,
            error: function(e) {
                deferred.reject(e);
            },
            success: function(e) {
                deferred.resolve(e);
            }
        }).promise();
    };

    if (typeof define === 'function' && define.amd) {
        define('async_request', ['jquery'], function() {
            return asyncRequest;
        });
    }
})();
