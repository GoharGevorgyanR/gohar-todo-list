import Api from './api';
//const formApiUrl = process.env.REACT_APP_API_URL + "/form";
const formApiUrl = 'http://localhost:3001/form' 

export default class FormApi extends Api{
  constructor(){
    super(formApiUrl);
  }

  sendForm(form) {
    return this.request("POST", {body: form});
  };
}