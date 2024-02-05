/*
 * @Author: 马黎健 mlj01178791@alibaba-inc.com
 * @Date: 2023-04-10 15:23:53
 * @LastEditors: 马黎健 mlj01178791@alibaba-inc.com
 * @LastEditTime: 2023-04-10 15:23:59
 * @FilePath: /zhufengreact/src/index-function.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "./react";
import ReactDOM from "./react-dom";
function FunctionComponent(props){
    return <div className="title" style={{ color: 'red' }}><span>{props.name}</span>{props.children}</div>;
  }
let element = <FunctionComponent name="hello">world</FunctionComponent>;
ReactDOM.render(element, document.getElementById("root"));