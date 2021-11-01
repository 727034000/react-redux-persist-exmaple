import {connect} from "react-redux";
import {mapStateToProps, mapDispatchToProps} from './store'
import {store} from "./store";

//使用store.dispatch映射
function Container3(props) {
    console.log(props)
    const {num, title, pagelist,add, pingFang, liFang, get, setTitle,pushPageList,removePageList} = props
    return (
        <div className="App">
            <h1>{title}</h1>
            <h2>当前数字:{num}</h2>
            {
                console.log(store.getState())
            }
            {
                console.log('pagelist',pagelist)
            }
            <button onClick={() => add(10)}>加10</button>
            <button onClick={() => {
                pushPageList(1)
            }}>添加1到数组</button>
            <button onClick={() => {
                pushPageList(2)
            }}>添加2到数组</button>
            <button onClick={() => {
                removePageList(1)
            }}>移除数组</button>
            <button onClick={() => pingFang()}>平方</button>
            <button onClick={() => liFang()}>立方</button>
            <button onClick={() => get()}>恢复</button>
            <button onClick={() => setTitle('组件3')}>修改标题</button>
            <hr />
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Container3);