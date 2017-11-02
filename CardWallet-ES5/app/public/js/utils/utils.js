import localMock  from '../../mock-api/protocolFileCards.js';
const getCards = function getCards(method, url, callback ) {

  if(window.location.protocol !== 'http:') {
    console.log('serving local json');
    callback(localMock);
  } else {
    console.log('serving xhr mock json');

    let xhr = (window.ActiveXObject)
    ? new ActiveXObject("Microsoft.XMLHTTP")
    : (XMLHttpRequest && new XMLHttpRequest()) || null;

    xhr.open(method, url);
    xhr.setRequestHeader("Content-Type", 'application/json');

    xhr.onload = (event) => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        callback(JSON.parse(xhr.responseText));
      } else {
        console.error(xhr.responseText);
      }

    };
    xhr.onerror = (event) => console.error(xhr.statusText);
    xhr.send(null);
  }
};

const compileTemplate = function compileTemplate(templateStr, hash) {
    return templateStr.replace(/{{(\w+)}}/g, (match, capture1, offset) => {
      return hash[capture1];
    })
}

export default { getCards, compileTemplate};
