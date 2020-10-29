import ajax from './ajax'
const BASE_URL = 'http://localhost:5000'
export const reqLogin = (username, password) => ajax(BASE_URL + '/login', { username, password }, 'POST')

export const reqCate = (parentId) => ajax(BASE_URL + '/manage/category/list', { parentId })

export const reqProuduct = (pageNum, pageSize) => ajax(BASE_URL + '/manage/product/list', { pageNum, pageSize }, 'GET')

export const reqAddpro = (categoryId, pCategoryId, name,desc, detail,price,imgs) => ajax(BASE_URL + '/manage/product/add', {categoryId, pCategoryId, name,desc, detail,price,imgs}, 'POST')

export const reqUpload = (image)=>ajax(BASE_URL + '/manage/img/upload',{image},'POST')

export const reqInfo = (categoryId) =>ajax(BASE_URL + '/manage/category/info',{categoryId},'GET')

export const reqUpdata = (_id,categoryId,pCategoryId,name,desc,price,detail,imgs)=>ajax(BASE_URL + '/manage/product/update',{_id,categoryId,pCategoryId,name,desc,price,detail,imgs},'POST')