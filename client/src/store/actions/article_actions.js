import * as articles from './index'
import axios from 'axios';
import {getAuthHeader} from '../../utils/tools';
axios.defaults.headers.post['Content-Type']='application/json'

export const getArticles =(sort)=>{
    return async(dispatch,getState)=>{
        try{
            const arts= await axios.post(`/api/articles/loadmore`,sort);
            const prevArts=getState().articles.articles;
            let newArts=[...arts.data]
            if(prevArts){
                newArts=[...prevArts,...arts.data]
            }

            dispatch(articles.getArticles(newArts))
        }catch(error){
            dispatch(articles.errorGlobal('opps error loading articles '))

        }
    }
}

export const getArticle=(id)=>{
    return async (dispatch)=>{
        try{
            const request = await axios.get(`/api/articles/get_byid/${id}`)
            dispatch(articles.getArticle(request.data[0]))
        }catch(error){
            dispatch(articles.errorGlobal(error.response.data.message))
        }
    }
}

export const addArticle=(article)=>{
    return async(dispatch)=>{
        try{
            const request= await axios.post(`/api/articles/admin/add_article`,
            article,getAuthHeader())

            dispatch(articles.addArticle(request.data));
            dispatch(articles.successGlobal('good job !!'))
        }catch(error){
            dispatch(articles.errorGlobal(error.response.data.messsage))
        }
    }
}
export const getPaginateArticles=(page=1,limit=5)=>{
    return async(dispatch)=>{
        try{
            const request=  await axios.post(`/api/articles/admin/paginate`,{
                page,
                limit
            },getAuthHeader());
            dispatch(articles.getPaginateArticles(request.data))
        }catch(error){
            dispatch(articles.errorGlobal(error.response.data.message))
        }
    }
}

export const changeStatusArticle=(status,_id)=>{
    return async(dispatch, getState)=>{
        try{
                const article =await axios.patch(`/api/articles/admin/${_id}`,{
                    status
                },getAuthHeader());

                let art=article.data;
                let state=getState().articles.adminArticles.docs;///previous state
                let position=state.findIndex(art=>art._id===_id);///find the posion
                state[position]=art;

                dispatch(articles.updateArticleStatus(state));
                dispatch(articles.successGlobal('cool!!!'))
        }catch(error){
            dispatch(articles.errorGlobal(error.response.data.message));
        }
    }
}
export const removeArticle=(id)=>{
    return async(dispatch)=>{
        try{
            await axios.delete(`/api/articles/admin/${id}`,getAuthHeader())

            dispatch(articles.removeArticle());
            dispatch(articles.successGlobal());
        }catch(error){
            dispatch(articles.errorGlobal(error.response.data.message));
        }
    }
}

export const getAdminArticle=(id)=>{
    return async(dispatch)=>{
        try{
            const request = await axios.get(`/api/articles/admin/${id}`,getAuthHeader())
            dispatch(articles.getArticle(request.data))
        }catch(error){
            dispatch(articles.getArticle(error.response.data.message))
        }
    }
}

export const updateArticle=(article,id)=>{
    return async(dispatch)=>{
        try{
            const newArticle=await axios.patch(`/api/articles/admin/${id}`,
            article,getAuthHeader())
            dispatch(articles.getArticle(newArticle.data));
            dispatch(articles.successGlobal('update done!!'))
        }catch(error){
            dispatch(articles.errorGlobal('error,try again !'))

        }
    }
}