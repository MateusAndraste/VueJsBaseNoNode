class RestManager {
    
    config = {headers: {'content-type': 'multipart/form-data'}};

    static getProcedures(callBack, errCallBack) {
        axios.get("").then(callBack, errCallBack);
    }

    static makeLogin(userName, password, callBack, errCallBack) {

        let postBody = {
            userName,
            password
        }

        axios.post("", postBody, this.config).then(callBack, errCallBack);
    }

    static upload(formData, config, callBack, errCallBack) {
        axios.post("", formData, config).then(callBack, errCallBack);
    }

    static upVinculation(formData, config, callBack, errCallBack) {
        axios.post("", formData, config).then(callBack, errCallBack);
    }
}

export default RestManager;