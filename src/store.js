import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from 'redux-thunk'; //异步
/*
引入持久化依赖库
*/
import {persistStore, persistReducer} from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session'
import lodash from 'lodash'

/*
配置持久化
*/
const storageConfig = {
    key: 'root',
    storage: storageSession,
    blacklist: ['name', 'age']
}

//默认state
const defaultState = {
    PageTitle: '首页',
    PageList: [],
    GetNum: 20
}

//action生成器,返回action
export const AddAction = (num) => {
    return {
        type: 'ADD',
        num: num,
    }
}

//action生成器,返回action
export const TwoAction = () => {
    return {
        type: 'PINGFANG'
    }
}

//action生成器,返回action
export const ThreeAction = () => {
    return {
        type: 'LIFANG'
    }
}

//action生成器,返回方法
export const GetAction = () => {
    return (dispatch, getState) => {
        fetch('./data.json').then(res => res.json()).then(res => {
            console.log(res)
            dispatch({
                type: 'GET',
                num: Number(res[3])
            })
        })
    }
}

//reducer1:GetNum
const GetNum = (state = defaultState.GetNum, action) => {
    switch (action.type) {
        case 'ADD':
            return state + action.num;
        case 'PINGFANG':
            return state * state;
        case 'LIFANG':
            return state * state * state;
        case 'GET':
            return action.num;
        default:
            return state;
    }
}

//action生成器,返回action
export const PageAction = (data) => {
    return {
        type: 'SET_PAGE_TITLE',
        data: data
    }
}

//reducer2:PageTitle
const PageTitle = (state = defaultState.PageTitle, action) => {
// 不同的action有不同的处理逻辑
    switch (action.type) {
        case 'SET_PAGE_TITLE':
            return action.data
        default:
            return state
    }
}

//action生成器,返回action
export const PushPageListAction = (data) => {
    return {
        type: 'PUSH_PAGE_LIST',
        data: data
    }
}

//action生成器,返回action
export const RemovePageListAction = (data) => {
    return {
        type: 'REMOVE_PAGE_LIST',
        data: data
    }
}

//reducer3:PageTitle
const PageList = (state = defaultState.PageList, action) => {
// 不同的action有不同的处理逻辑
    switch (action.type) {
        case 'PUSH_PAGE_LIST': {
            return lodash.uniq(lodash.concat(state, action.data))
        }
        case 'REMOVE_PAGE_LIST': {
            return lodash.uniq(lodash.pull(state, action.data))
        }
        default:
            return state
    }
}

/*
持久化store
*/
const myPersistReducer = persistReducer(storageConfig, combineReducers({GetNum, PageTitle, PageList}))
export const store = createStore(myPersistReducer, applyMiddleware(thunk))
export const persistor = persistStore(store)

// 非持久化store
//export const store = createStore(combineReducers({GetNum, PageTitle}), applyMiddleware(thunk))

//store.state映射
export const mapStateToProps = (state) => {
    return {
        num: state.GetNum,
        title: state.PageTitle,
        pagelist: state.PageList,
    }
}

//store.dispatch映射
export const mapDispatchToProps = (dispatch) => {
    return {
        add: (...arg) => dispatch(AddAction(...arg)),
        pingFang: (...arg) => dispatch(TwoAction(...arg)),
        liFang: (...arg) => dispatch(ThreeAction(...arg)),
        get: (...arg) => dispatch(GetAction(...arg)),
        setTitle: (...arg) => dispatch(PageAction(...arg)),
        pushPageList: (...arg) => dispatch(PushPageListAction(...arg)),
        removePageList: (...arg) => dispatch(RemovePageListAction(...arg)),
    }
}