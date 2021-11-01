import {connect} from "react-redux";
import {store} from "./store";
import {AddAction, TwoAction, ThreeAction, mapStateToProps, mapDispatchToProps, GetAction, PageAction} from './store'
import Container2 from './container2'

//直接使用dispatch,不使用mapDispatchToProps
function Container(props) {
    console.log(props)
    const {num, title, add, pingFang, liFang, get, setTitle} = props
    return (
        <div className="App">
            <h1>{store.getState().PageTitle}</h1>
            <h2>当前数字:{store.getState().GetNum}</h2>
            <button onClick={() => store.dispatch(AddAction(10))}>加10</button>
            <button onClick={() => store.dispatch(TwoAction())}>平方</button>
            <button onClick={() => store.dispatch(ThreeAction())}>立方</button>
            <button onClick={() => store.dispatch(GetAction())}>恢复</button>
            <button onClick={() => store.dispatch(PageAction('组件1'))}>修改标题</button>
            <hr />
                <Container2></Container2>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
// export default connect(mapStateToProps)(Container);