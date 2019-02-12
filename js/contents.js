function expandGroups(event) {
  var els = document.getElementsByClassName('title');
  if (event === 'touchend') {
    event.preventDefault();
  }
  Array.prototype.forEach.call(els, function(el) {
    el.addEventListener(event, function () {
      el.parentElement.classList.toggle('expand');
      if(el.classList.contains('flash')) {
        el.classList.remove('flash');
      }
    }, false);
  });
}

// build headers for requests
function buildHeader() {
  var head = new Headers();
  head.append('pragma', 'no-cache');
  head.append('cache-control', 'no-cache');

  var init = {
    method: 'GET',
    headers: head
  };

  return init;
}

// pull highlights content
function pullHighlights() {
  return fetch('contents/highlights.json', buildHeader()).then(function(response) {
    return response.json();
  });
}

function highlights() {
  if( document.getElementById('highlights') !== null) {
    var h = document.getElementById('highlights');
    pullHighlights().then(function(r) {
      document.getElementsByClassName('loading')[0].classList.add('hide');
      r.data.forEach(function (x) {
        emphasisSuffix = x.description.suffix == undefined ? '' : (' ' + x.description.suffix);
        h.innerHTML += '<li class="' + x.type +
          '"><div class="left">' + x.date +
          '</div><div class="desc"><div>' + x.description.what + ' ' +
          '<em>' + x.description.emphasis + '</em>' + 
          emphasisSuffix + '</div><div class="info">' +
          x.description.info + '</div></div></li>';
      });
    });
  }
}

// get all the contents jazz
(function () {
  window.addEventListener('load', function() {
    highlights();
    expandGroups('click');
    expandGroups('touchend');
  }, false);
})();