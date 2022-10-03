
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { PaginatedResponse } from "../model/pagination";
import { store } from "../store/configureStore";

const sleep=()=>new Promise(resolve=>setTimeout(resolve,500));
axios.defaults.baseURL=process.env.REACT_APP_API_URL;
axios.defaults.withCredentials=true;
const responseBody=(response:AxiosResponse)=>response.data;


 axios.interceptors.request.use(config=>{
    const token= store.getState().account.user?.token;
    if(token) config.headers.Authorization=`Bearer ${token}`; 
    return config;
 })

axios.interceptors.response.use(async response=>{
if(process.env.NODE_ENV==='development')
    await sleep();
const pagination=response.headers['pagination'];

if(pagination){
    response.data=new PaginatedResponse(response.data,JSON.parse(pagination));
    console.log(response);
    return response;
}
    return response
},(error:AxiosError)=>{
  const {data,status}=error.response as any; 
  switch(status){
    case 400:
        if(data.errors){
            const modelStateErrors:string[]=[];
            for(const key in data.errors){
                if(data.errors[key]){
                    modelStateErrors.push(data.errors[key])
                }
            }
            throw modelStateErrors.flat();
        }
        toast.error(data.title);
        break;
    case 401:
        toast.error(data.title);
        break;
    case 403:
         toast.error('bunu yapma izniniz yok')
         break;
    case 500:
       history.push({
        pathname:'/server-error',
        state:{error:data}
       });
        break;
    default:
        break;
  } 
  return Promise.reject(error.response);
})
const requests={
    get:(url:string,params?:URLSearchParams)=>axios.get(url,{params}).then(responseBody),

    post:(url:string,body:{})=>axios.post(url,body).then(responseBody),

    put:(url:string,body:{})=>axios.put(url,body).then(responseBody),

    delete:(url:string)=>axios.delete(url).then(responseBody),
   
    postForm: (url: string, data: FormData) => axios.post(url, data, {
        headers: {'Content-type': 'multipart/form-data'}
    }).then(responseBody),
    putForm: (url: string, data: FormData) => axios.put(url, data, {
        headers: {'Content-type': 'multipart/form-data'}
    }).then(responseBody)
}
function createFormData(item:any){
let formData=new FormData();
for(const key in item){
   formData.append(key,item[key]) 
}
return formData;
}

const Admin={
    createUrun:(urun:any)=>requests.postForm('Urun',createFormData(urun)),
    updateUrun:(urun:any)=>requests.putForm('Urun',createFormData(urun)),
    deleteUrun:(id:number)=>requests.delete(`Urun/${id}`)

}

const Category={
    list:(params:URLSearchParams)=>requests.get('Urun',params),
    details:(id:number)=>requests.get(`Urun/${id}`),
    fetchFilters:()=>requests.get('Urun/filters')
}

const TestErrors={
    get400Error:()=>requests.get('bug/bad-request'),    
    get401Error:()=>requests.get('bug/unauthorised'),
    get404Error:()=>requests.get('bug/not-found'),
    get500Error:()=>requests.get('bug/server-error'),
    getValidationError:()=>requests.get('bug/validation-error'),


}
const Sepet={
    get:() => requests.get('sepet'),
    addItem:(urunId:number,quantity=1)=>requests.post(`sepet?urunId=${urunId}&quantity=${quantity}`,{}),
    removeItem:(urunId:number,quantity=1)=>requests.delete(`sepet?urunId=${urunId}&quantity=${quantity}`),
}
const Account={
    login:(values:any)=>requests.post('account/login',values),
    register:(values:any)=>requests.post('account/register',values),
    currentUser:()=>requests.get('account/currentUser'),
    fetchAdres:()=>requests.get('account/saveAdres')
}
const Order = {
    list: () => requests.get('order'),
    fetch: (id: number) => requests.get(`order/${id}`),
    create: (values: any) => requests.post('order', values)
}
const agent ={
    Category,
    TestErrors,
    Sepet,
    Account,
    Order,
    Admin
}
export default agent;