import {connect} from "react-redux";
import {mapStateToProps, mapDispatchToProps} from './store'
import Container3 from './container3'

//使用store.dispatch映射
function Container2(props) {
    console.log(props)
    const {num, title, add, pingFang, liFang, get, setTitle} = props
    return (
        <div className="App">
            <h1>{title}</h1>
            <h2>当前数字:{num}</h2>
            <button onClick={() => add(10)}>加10</button>
            <button onClick={() => pingFang()}>平方</button>
            <button onClick={() => liFang()}>立方</button>
            <button onClick={() => get()}>恢复</button>
            <button onClick={() => setTitle('组件2')}>修改标题</button>
            <hr />
            <Container3></Container3>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Container2);