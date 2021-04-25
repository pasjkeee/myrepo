export default class RestoService {
    
    getData = async (url, method = 'GET', body = null, headers = {}) => {
        try{
            if(body){
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json'
            }
            const response = await fetch("http://localhost:3030"+url, {method, body, credentials: "include", headers});
            const data = await response.json();
            if( !response.ok ) {
                throw new Error(data.message || 'Что-то пошло не так');
            } 
            console.log("data", data);
            return data;
        } 
        catch (e) {
            throw e;
        }
    }
}