import {updateQueue} from './Component';
/**
 * 
 * @param {*} dom 
 * @param {*} eventType 
 * @param {*} handler 
 */
export function addEvent(dom, eventType, handler) {
    //   dom    onclick  onclick的回调函数
    //??? document上设置的小写的onclick 为啥button上的onClick也会触发
    let store = dom.store||(dom.store ={})
    store[eventType] = handler;
    // if (!document[eventType]) {
    //     document[eventType] = dispatchEvent;
    // }
    const name = eventType.replace(/capture$/,'').slice(2);
    // if (!document[name]) {
    //   document.addEventListener(eventType.slice(2).toLowerCase(),(event)=>{
    //     dispatchEvent(event,true);
    // },true);
    //   document.addEventListener(eventType.slice(2).toLowerCase(),(event)=>{
    //       dispatchEvent(event,false);
    //   },false);
    //   document[name]=true;
    // }
    if(!document[name]){
      document.addEventListener(eventType.slice(2),(event)=>{
        dispatchEvent(event,true);
      },true)
      document.addEventListener(eventType.slice(2),(event)=>{
        dispatchEvent(event,false);
      },false)
      document[name]=true
    }
   
 }

 function dispatchEvent(event,isCapture) {
    //事件委托
     let { target, type } = event;
     let eventType = `on${type}`;
     let eventTypeCapture =`on${type}capture`;
     let syntheticEvent = createSyntheticEvent(event);
     updateQueue.isBatchingUpdate = true;
     let targetStack = [];
     let currentTarget=target;//button
     while (currentTarget) {
      targetStack.push(currentTarget)
      currentTarget= currentTarget.parentNode;
     }
        //处理捕获阶段
     if (isCapture) {
      for(let i=targetStack.length-1;i>=0;i--){
        const currentTarget = targetStack[i];
        let {store} = currentTarget;
        let handler = store&&store[eventTypeCapture];
        handler&&handler(syntheticEvent);
      }
     }else{
         //处理冒泡阶段
      for(let i=0;i<targetStack.length;i++){
        const currentTarget = targetStack[i];
        let {store} = currentTarget;
        let handler = store&&store[eventType];
        handler&&handler(syntheticEvent);
        if(syntheticEvent.isPropagationStopped){
          break;
      }
      }
     }
    
    
    //  while(target){
    //     let { store } = target;
    //     let handler = store && store[eventType]
    //     handler && handler(syntheticEvent);
    //     if (syntheticEvent.isPropagationStopped) {
    //         break;
    //       }
    //     target = target.parentNode;
    //  }
     updateQueue.batchUpdate();

 }
 //创建合成事件
 function createSyntheticEvent(nativeEvent) {
    let syntheticEvent = {};
    for (const key in nativeEvent) {
        let value = nativeEvent[key];
        if (typeof value ==='function') {
            value =value.bind(nativeEvent)
        }
        syntheticEvent[key] = nativeEvent[key];
    }
    syntheticEvent.nativeEvent =nativeEvent
    syntheticEvent.isDefaultPrevented = false;
    syntheticEvent.isPropagationStopped = false;
    syntheticEvent.preventDefault = preventDefault;
    syntheticEvent.stopPropagation = stopPropagation;
    return syntheticEvent;
 }
 function preventDefault() {
    this.defaultPrevented = true;
    const event = this.nativeEvent;
    if (event.preventDefault) {
      event.preventDefault();
    } else {//IE
      event.returnValue = false;
    }
    this.isDefaultPrevented = true;
  }
  function stopPropagation() {
    const event = this.nativeEvent;
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {//IE
      event.cancelBubble = true;
    }
    this.isPropagationStopped = true;
  }