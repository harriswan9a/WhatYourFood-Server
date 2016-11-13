// console.log(response.error('e123'));
// { respCode: 'ERROR', message: 'e123' }

// console.log(response.success({"123":"555"}, "請求成功"));
// { '123': '555', respCode: 'SUCCESS', message: undefined }


module.exports = {
    error: function (message) {
        return {
            respCode: "ERROR",
            message: message
        }
    },
    success: function (body, message) {
        body.respCode = "SUCCESS";
        body.message = message || "";
        return body;
    }
};