import axios from 'axios';
const ApiKEY ="?key=$2a$10$ehStdYIwdFl5GNVMPQSX8O0OGhInkl.tXxDjrcrFSTzlBeQ6JuTSS";
const API = "https://www.potterapi.com/v1";

export default class CallsData {
    constructor(){

    }
    
    async getDataCharacter() {
        let allData = [];
        let resultData = await axios.get(API + '/characters' + ApiKEY)
            .then(response => {
                allData = response;
                return allData.data;
            })
            .catch(e => {
                console.log(e)
            })
        return resultData;
    }

    async getDataHouses() {
        let allData = [];
        let resultData =  await axios.get(API + '/houses/' + ApiKEY)
        .then(response => {
            allData = response;
            return allData.data;
        })
        .catch(e => {
            console.log(e)
        })
        return resultData;
    }
}   