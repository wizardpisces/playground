/*! For license information please see bundle.js.LICENSE.txt */
(()=>{var o={"./src/constant.js":()=>{console.log("isNormalPortal",!0)}},e={};function t(r){var l=e[r];if(void 0!==l)return l.exports;var s=e[r]={exports:{}};return o[r](s,s.exports,t),s.exports}t.r=o=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(o,"__esModule",{value:!0})};var r={};(()=>{"use strict";t.r(r);var o=t("./src/constant.js");console.log=function(...o){console.error(...o),console.log("side effect: this tampered console.log")},setTimeout((()=>{console.log("timer side effect")}),1e3),Array.prototype.customFun=()=>{console.log("side effect: prototype tamper : add customFun to Array.prototype")},Function.prototype.bind=()=>{console.log("side effect: bind polyfill, should be eliminated if not used")};let e=[];e.customFun(),(()=>{console.log("asdf")}).bind(e)(),(()=>{switch(o.isNormalPortal){case!0:return console.log((e=2)*e*e),void console.log(function(o){return o*o}(2));case!1:console.log("false static logic ,could be shaked");break;default:console.log(3)}var e})()})()})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7c0NBT0FBLFFBQVFDLElBQUksa0JBQWlCLEtDTnpCQyxFQUEyQixHQUcvQixTQUFTQyxFQUFvQkMsR0FFNUIsSUFBSUMsRUFBZUgsRUFBeUJFLEdBQzVDLFFBQXFCRSxJQUFqQkQsRUFDSCxPQUFPQSxFQUFhRSxRQUdyQixJQUFJQyxFQUFTTixFQUF5QkUsR0FBWSxDQUdqREcsUUFBUyxJQU9WLE9BSEFFLEVBQW9CTCxHQUFVSSxFQUFRQSxFQUFPRCxRQUFTSixHQUcvQ0ssRUFBT0QsUUNwQmZKLEVBQW9CTyxFQUFLSCxJQUNILG9CQUFYSSxRQUEwQkEsT0FBT0MsYUFDMUNDLE9BQU9DLGVBQWVQLEVBQVNJLE9BQU9DLFlBQWEsQ0FBRUcsTUFBTyxXQUU3REYsT0FBT0MsZUFBZVAsRUFBUyxhQUFjLENBQUVRLE9BQU8scUVDTHZEZixRQUFRQyxJQUFNLFlBQWFlLEdBQ3ZCaEIsUUFBUWlCLFNBQVNELEdBQ2pCaEIsUUFBUUMsSUFBSSwyQ0FHaEJpQixZQUFXLEtBQ1BsQixRQUFRQyxJQUFJLHVCQUNiLEtBRUhrQixNQUFNQyxVQUFVQyxVQUFZLEtBQ3hCckIsUUFBUUMsSUFBSSxxRUFHaEJxQixTQUFTRixVQUFVRyxLQUFPLEtBQ3RCdkIsUUFBUUMsSUFBSSxpRUNMaEIsSUFBSXVCLEVBQU0sR0FFVkEsRUFBSUgsYUFFUyxLQUVUckIsUUFBUUMsSUFBSSxVQUdDc0IsS0FBS0MsRUFFdEJDLEdBZ0JXLE1BQ1AsT0FBUSxFQUFBQyxnQkFDSixLQUFLLEVBSUcsT0FGQTFCLFFBQVFDLEtDcENIMEIsRURvQ1ksR0NuQ2xCQSxFQUFJQSxRRG9DSDNCLFFBQVFDLElDekNqQixTQUFnQjBCLEdBQ25CLE9BQU9BLEVBQUlBLEVEd0NhQyxDQUFPLElBTzNCLEtBQUssRUFDRDVCLFFBQVFDLElBQUksdUNBQ1osTUFFSixRQUFRRCxRQUFRQyxJQUFJLEdDaERyQixJQUFjMEIsR0RvRHJCRSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9jb25zdGFudC5qcyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VudXNlZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hdGguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXhwb3J0IGNvbnN0IGlzTm9ybWFsUG9ydGFsID0gRU5WX0lTX05PUk1BTF9QT1JUQUxcbi8vIGV4cG9ydCBjb25zdCBpc05vcm1hbFBvcnRhbCA9ICgpPT57XG4vLyAgICAgcmV0dXJuIEVOVl9JU19OT1JNQUxfUE9SVEFMXG4vLyB9XG5cbi8vIGV4cG9ydCBjb25zdCBpc05vcm1hbFBvcnRhbCA9ICgpPT5FTlZfSVNfTk9STUFMX1BPUlRBTFxuXG5jb25zb2xlLmxvZygnaXNOb3JtYWxQb3J0YWwnLEVOVl9JU19OT1JNQUxfUE9SVEFMKSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJjb25zb2xlLmxvZyA9IGZ1bmN0aW9uICguLi5hcmcpIHtcbiAgICBjb25zb2xlLmVycm9yKC4uLmFyZylcbiAgICBjb25zb2xlLmxvZygnc2lkZSBlZmZlY3Q6IHRoaXMgdGFtcGVyZWQgY29uc29sZS5sb2cnKVxufVxuXG5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICBjb25zb2xlLmxvZygndGltZXIgc2lkZSBlZmZlY3QnKVxufSwgMTAwMClcblxuQXJyYXkucHJvdG90eXBlLmN1c3RvbUZ1biA9ICgpPT57XG4gICAgY29uc29sZS5sb2coJ3NpZGUgZWZmZWN0OiBwcm90b3R5cGUgdGFtcGVyIDogYWRkIGN1c3RvbUZ1biB0byBBcnJheS5wcm90b3R5cGUnKVxufVxuXG5GdW5jdGlvbi5wcm90b3R5cGUuYmluZCA9ICgpPT57XG4gICAgY29uc29sZS5sb2coJ3NpZGUgZWZmZWN0OiBiaW5kIHBvbHlmaWxsLCBzaG91bGQgYmUgZWxpbWluYXRlZCBpZiBub3QgdXNlZCcpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bnVzZWRGdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZygndGhpcyBpcyB1bnVzZWRGdW5jdGlvbiwgc2hvdWxkIGJlIGRlYWQgY29kZSBlbGltaW5hdGVkJylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVudXNlZEZ1bmN0aW9uMigpe1xuICAgIGNvbnNvbGUubG9nKCd1bnVzZWRGdW5jdGlvbjInKVxufSIsImltcG9ydCB7XG4gICAgaXNOb3JtYWxQb3J0YWxcbn0gZnJvbSBcIi4vY29uc3RhbnRcIjtcbmltcG9ydCB7XG4gICAgc3F1YXJlLFxuICAgIGN1YmVcbn0gZnJvbSBcIi4vbWF0aFwiO1xuaW1wb3J0IHt1bnVzZWRGdW5jdGlvbn0gZnJvbSAnLi91bnVzZWQnXG5cbmxldCBhcnIgPSBbXVxuXG5hcnIuY3VzdG9tRnVuKClcblxuY29uc3QgZnVuYyA9ICgpID0+IHtcbiAgICBsZXQgYSA9IDFcbiAgICBjb25zb2xlLmxvZygnYXNkZicpXG59XG5cbmxldCBiRnVuYyA9IGZ1bmMuYmluZChhcnIpXG5cbmJGdW5jKClcblxuZnVuY3Rpb24gdGVzdCgpe1xuICAgIGlmIChpc05vcm1hbFBvcnRhbCkge1xuICAgICAgICBjb25zb2xlLmxvZyhjdWJlKDIpKVxuICAgICAgICBjb25zb2xlLmxvZyhzcXVhcmUoMikpXG4gICAgICAgIGRvY3VtZW50LndyaXRlKCdpcyBub3JtYWwgcG9ydGFsJylcbiAgICAgICAgcmV0dXJuXG4gICAgICAgIFxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHVudXNlZEZ1bmN0aW9uKClcbiAgICAgICAgZG9jdW1lbnQud3JpdGUoJ2lzIG5vdCBub3JtYWwgcG9ydGFsJylcbiAgICB9XG4gICAgZG9jdW1lbnQud3JpdGUoXCJ3b24ndCBiZSBjYWxsZWRcIilcbn1cblxuY29uc3QgZm4gPSAoKT0+e1xuICAgIHN3aXRjaCAoaXNOb3JtYWxQb3J0YWwpe1xuICAgICAgICBjYXNlIHRydWU6IHtcbiAgICAgICAgICAgIGlmIChpc05vcm1hbFBvcnRhbCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1YmUoMikpXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc3F1YXJlKDIpKVxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjb3VsZCBiZSB0cmVlIHNoYWtlZCcpXG4gICAgICAgICAgICAgICAgLy8gdW51c2VkRnVuY3Rpb24oKVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGZhbHNlOntcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmYWxzZSBzdGF0aWMgbG9naWMgLGNvdWxkIGJlIHNoYWtlZCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpjb25zb2xlLmxvZygzKVxuICAgIH1cbn1cblxuZm4oKSIsImV4cG9ydCBmdW5jdGlvbiBzcXVhcmUoeCkge1xuICAgIHJldHVybiB4ICogeDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGN1YmUoeCkge1xuICAgIHJldHVybiB4ICogeCAqIHg7XG59Il0sIm5hbWVzIjpbImNvbnNvbGUiLCJsb2ciLCJfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18iLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJjYWNoZWRNb2R1bGUiLCJ1bmRlZmluZWQiLCJleHBvcnRzIiwibW9kdWxlIiwiX193ZWJwYWNrX21vZHVsZXNfXyIsInIiLCJTeW1ib2wiLCJ0b1N0cmluZ1RhZyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJhcmciLCJlcnJvciIsInNldFRpbWVvdXQiLCJBcnJheSIsInByb3RvdHlwZSIsImN1c3RvbUZ1biIsIkZ1bmN0aW9uIiwiYmluZCIsImFyciIsImJGdW5jIiwiaXNOb3JtYWxQb3J0YWwiLCJ4Iiwic3F1YXJlIiwiZm4iXSwic291cmNlUm9vdCI6IiJ9