import { ADD_ARTICLE, REMOVE_ARTICLE, EDIT_ARTICLE, ADD_USERS, GET_PIS, EDIT_PI } from "../constants/action-types";
const initialState = {
  session: {}
};
function rootReducer(state = initialState, action) {
  if (action.type === ADD_ARTICLE) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    });
  }
  if (action.type === REMOVE_ARTICLE) {
    const prunedIDS = state.articles.filter((item,index) => {
      if(index !== parseInt(action.payload.id))
        return item;
      return null;
    });
    return Object.assign({}, {
      articles: prunedIDS
    });
  }
  if (action.type === EDIT_ARTICLE) {
    let articles = [...state.articles];
    articles[action.payload.index]['title'] = 'Edited';
    return Object.assign({}, {
      articles: articles
    });
  }
  if (action.type === ADD_USERS){
    return Object.assign({}, state, {
      users: action.payload
    });
  }
  if (action.type === GET_PIS){
    return Object.assign({}, state, {
      pis: action.payload
    });
  }
  if (action.type === EDIT_PI) {
    let pis = [...state.pis];
    pis[action.payload.index]['cus_id'] = action.payload.cus_id;
    pis[action.payload.index]['customer_id'] = action.payload.customer_id;
    pis[action.payload.index]['owner_name'] = action.payload.owner_name;
    pis[action.payload.index]['status'] = action.payload.status;
    return Object.assign({}, state, {
      pis: pis
    });
  }

  return state;
}
export default rootReducer;
