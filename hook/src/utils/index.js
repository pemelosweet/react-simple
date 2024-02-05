
import { REACT_TEXT } from "../constants";
// 为了后续处理方便，把元素做了一下封装，主要就是给字符串和数字进行了处理，变成一个对象的形式
export function wrapToVdom(element) {
  return typeof element === "string" || typeof element === "number"
    ? { type: REACT_TEXT, props: element }
    : element;
}
export function isFunction(obj) {
  return typeof obj === 'function'
}
export function shallowEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }
  if (typeof obj1 != "object" || obj1 === null || typeof obj2 != "object" || obj2 === null) {
    return false;
  }
  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let key of keys1) {//数组用of 对象用in
    if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}
