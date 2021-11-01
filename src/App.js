import logo from './logo.svg';
import './App.css';
import Container from './container'
/**
 * 持久化
 */
import {Provider} from "react-redux";
import {PersistGate} from 'redux-persist/lib/integration/react';
import {store, persistor} from './store';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <Container></Container>
                    </PersistGate>
                </Provider>
            </header>
        </div>
    );
}

export default App;
