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
function pullProjects() {
  return fetch('contents/projects.json', buildHeader()).then(function(response) {
    return response.json();
  });
}

// pull highlights content
function pullHighlights() {
  return fetch('contents/highlights.json', buildHeader()).then(function(response) {
    return response.json();
  });
}

// pull highlights content
function pullSoftwareAndMethodBooks() {
  return fetch('contents/softwareAndMethodBooks.json', buildHeader()).then(function(response) {
    return response.json();
  });
}

// {
//   "data": [
//     {
//       "type": "fun",
//       "date": "January 2018",
//       "description": {
//         "what": "Attended",
//         "emphasis": "Code Freeze",
//         "suffix": "for the First Time",
//         "info": "During a crazy blizzard, spent the day learning about <a href='https://www.umsec.umn.edu/events/Code-Freeze-2018-Microservice-Architectures'>Micro Services. </a>"
//       }
//     }
//   ]
// }
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

function projects() {
  if( document.getElementById('projects') !== null) {
    var h = document.getElementById('projects');
    pullProjects().then(function(r) {
      document.getElementsByClassName('loading')[0].classList.add('hide');
      r.data.forEach(function (x) {
        console.log(x);
        emphasisSuffix = x.description.suffix == undefined ? '' : (' ' + x.description.suffix);
        h.innerHTML += '<li class="' + x.type +
          '"><div class="left">' + x.type +
          '</div><div class="desc"><div>' + x.description.what + ' ' +
          '<em>' + x.description.emphasis + '</em>' + 
          emphasisSuffix + '</div><div class="info">' +
          x.description.info + '</div></div></li>';
        console.log(h.innerHTML);
      });
    });
  }
}

// {
//   "data": [
//     {
//       "title": "Software Reliability Engineer: How Google Runs Operation",
//       "description": {
//         "author": "Betsy Beyer, Chris Jones, Jennifer Petoff and Niall Richard Murphy",
//         "link": "https://www.amazon.com/Site-Reliability-Engineering-Production-Systems/dp/149192912X/ref=sr_1_1?ie=UTF8&qid=1526959201&sr=8-1&keywords=sre",
//         "info": "Google’s Site Reliability Team explain how and why their commitment to the entire lifecycle has enabled the company to successfully build, deploy, monitor, and maintain some of the largest software systems in the world."
//       }
//     },

function books() {
  if( document.getElementById('softwareMethodologies') !== null) {
    var h = document.getElementById('softwareMethodologies');
    console.log(h);
    pullSoftwareAndMethodBooks().then(function(r) {
      document.getElementsByClassName('loading')[0].classList.add('hide');
      console.log(r);
      r.data.forEach(function (x) {
        titleLink=x.title;
        if(x.description.link !== undefined) {
          titleLink = '<a href="' + x.description.link + '">' + x.title + '</a>';
        } else {
          titleLink = x.title;
        }
        h.innerHTML += '<li class="' + x.classType +
          '"><div class="left">' + x.type +
          '</div><div class="desc"><div>' + titleLink + 
          '</div><div class="info">' +
          x.description.author + '</div></div></li>';
        console.log(h);
      });
    });
  }
}

// get all the contents jazz
(function () {
  window.addEventListener('load', function() {
    highlights();
    projects();
    books();
    expandGroups('click');
    expandGroups('touchend');
  }, false);
})();