
var store = createStore(reducer);
var $box = document.getElementById('box');
var change = function() {
    var state = store.getState();
    $box.style.backgroundColor = state.theme;
};
store.subscribe(change)
// store.unsubscribe(change)
// 改变主题颜色
function onClickChangeTheme() {
    store.dispatch({
        type: 'SET',
        theme: '#ddd'
    })
}

// 
function reducer(state, action) {
    state = state || {
        theme: '#fff'
    }
    switch(action.type) {
        case 'SET':
            return Object.assign({}, state, {
                theme: action.theme
            })
            break;
        default:
            return state;
    }
}

function createStore(reducer) {
    var state = null;    
    var subscribes = [];
    var getState = function() {
        return state;
    }
    var subscribe = function(callback) {
        subscribes.push(callback);
    }
    var unsubscribe = function(callback) {
        subscribes = subscribes.filter(function(cal) {
            return cal !== callback;
        })
    }
    var dispatch = function(action) {
        var oldState = getState();
        state = reducer(oldState, action);
        if(oldState === state)
            return ;
        subscribes.forEach(function(callback) {
            callback();
        })
    }
    // 初始化一次
    dispatch({});
    return {getState: getState, subscribe: subscribe, unsubscribe: unsubscribe, dispatch: dispatch};
}



