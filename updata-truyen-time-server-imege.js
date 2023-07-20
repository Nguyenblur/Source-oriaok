var update = {mainItem: ["Series"]};
update.run = function(category, page, num) {
  var start = (page - 1) * num + 1;
  var script = document.createElement("script");
  script.src = "/feeds/posts/default/-/" + category + "?alt=json-in-script&orderby=published&start-index=" + start + "&max-results=" + num + "&callback=update.vutran";
  document.body.appendChild(script);
};
update.vutran = function(data) {
  var entries = data.feed.entry;
  if (!entries) return;
  var total = data.feed.openSearch$totalResults.$t;
  var start = data.feed.openSearch$startIndex.$t;
  var num = data.feed.openSearch$itemsPerPage.$t;
  var mainItems = [];
  entries.forEach(function(entry) {
    var title = entry.title.$t;
    var categories = entry.category.map(function(cat) { return cat.term });
    var link = entry.link.find(function(link) { return link.rel === "alternate" }).href;
    var published = entry.published.$t;
    var thumbnail = entry.media$thumbnail ? entry.media$thumbnail.url.replace("s72", "w175-h235-rw") : imageString(entry.content.$t);
    if (update.mainItem.some(function(item) { return categories.includes(item) })) {
      mainItems.push({
        title: title,
        link: link,
        thumbnail: thumbnail,
        categories: categories
      });
    }
  });
  var mainHTML = "";
  mainItems.forEach(function(item) {
  var statusClass = {
    "Đang tiến hành": "in-progress-tranvu",
    "Hoàn thành": "completed-tranvu"
  };
  var categoryClass = {
    Manga: "manga-tranvu",
    Manhwa: "manhwa-tranvu",
    Manhua: "manhua-tranvu",
    "Light Novel": "Ln-tranvu",
    "Web Novel": "Wn-tranvu"
  };
  var labelClass = {
    Hot: "Hot-tranvu",
    New: "New-tranvu"
  };
  var categories = item.categories.flatMap(function(category) {
    return [statusClass[category], categoryClass[category], labelClass[category]]
      .filter(Boolean)
      .map(function(className) {
        return "<span class='" + className + "'></span>";
      });
  }).join("");
    mainHTML += "<div class='vuItem' label='" + filterLabels(item.categories).join(" ") + "'><a href='" + item.link + "' title='Đọc ngay " + item.title + "'><div class='bookCover'><img loading='lazy' src='" + item.thumbnail + "' alt='" + item.title + "'>" + categories + "</div><div class='bookDetails'><h3><div class='titleSeries' alt='Đọc ngay " + item.title + "'>" + item.title + "</div></h3></div></a><ul class='Chapter-list'><span class='loaders'></span></ul></div>";
  });
  var paginationHTML = "";
  if (total > num) {
    var currentPage = Math.floor((start - 1) / num) + 1;
    var totalPages = Math.ceil(total / num);
    var firstPage = Math.max(1, currentPage - 2);
    var lastPage = Math.min(totalPages, currentPage + 2);
    var prevPage = currentPage - 1;
    var nextPage = currentPage + 1;
    paginationHTML += "<div class='pagination-vu'><ul>";
    if (currentPage > 1) {
      paginationHTML += "<li class='prev-vu'><a href='?page=" + prevPage + "' title='Sang trang " + prevPage + "'><span>&laquo</span></a></li>";
      paginationHTML += "<link rel='prefetch' href='?page=" + prevPage + "'></link>";
    }
    if (firstPage > 1) {
      paginationHTML += "<li><a href='?page=1' title='Trang 1'><span>1</span></a></li>";
      paginationHTML += "<link rel='prefetch' href='?page=1'></link>";
      if (firstPage > 2) {
        paginationHTML += "<li class='disabled-vu'><span>...</span></li>";
      }
    }
    for (var i = firstPage; i <= lastPage; i++) {
      if (i === currentPage) {
        paginationHTML += "<li class='active-vu'><span>" + i + "</span></li>";
      } else {
        paginationHTML += "<li><a href='?page=" + i + "' title='Trang " + i + "'><span>" + i + "</span></a></li>";
        paginationHTML += "<link rel='prefetch' href='?page=" + i + "'></link>";
      }
    }
    if (lastPage < totalPages) {
      if (lastPage < totalPages - 1) {
        paginationHTML += "<li class='disabled'><span>...</span></li>";
      }
      paginationHTML += "<li><a href='?page=" + totalPages + "' title='Trang " + totalPages + "'><span>" + totalPages + "</span></a></li>";
      paginationHTML += "<link rel='prefetch' href='?page=" + totalPages + "'></link>";
    }
    if (currentPage < totalPages) {
      paginationHTML += "<li class='next-vu'><a href='?page=" + nextPage + "' title='Sang trang "+ nextPage +"'><span>&raquo;</span></a></li>";
      paginationHTML += "<link rel='prefetch' href='?page=" + nextPage + "'></link>";
    }
    paginationHTML += "</ul></div>";
  }

  var mainnnv = document.getElementById("mainnnv");
  var phantrannnv = document.getElementById("phantrannnv");
  if (mainnnv) mainnnv.innerHTML = mainHTML;
  if (phantrannnv) phantrannnv.innerHTML = paginationHTML;
};
function imageString(str) {
  var imgStart = str.indexOf("<img");
  if (imgStart === -1) return "";
  var srcStart = str.indexOf("src=\"", imgStart) + 5;
  var srcEnd = str.indexOf("\"", srcStart);
  return str.slice(srcStart, srcEnd);
}
var urlParams = new URLSearchParams(window.location.search);
var page = urlParams.get('page') || 1;
//****** Setting ******//
function filterLabels(categories){var excludedLabels = ["Action", "Adventure", "Comedy", "Cooking", "Drama", "Ecchi", "Fantasy", "Game", "Harem", "Historical", "Horror", "Isekai", "Josei", "Magic", "Manhua", "Manhwa", "Martial Arts", "Mature", "Mecha", "Medical", "Military", "Music", "Mystery", "Psychological", "Romance", "School Life", "Sci-Fi", "Seinen", "Shoujo", "Shounen", "Slice of Life", "Sports", "Supernatural", "Thriller", "Tragedy", "Vampire", "Series", "Project", "Light Novel", "WebNovel", "Web Novel", "Chapter", "Novel", "Novels", "Đang tiến hành", "Hoàn thành", "Hot", "New", "Manga", "Manhwa", "Manhua", "Cảnh báo", "Tạm dừng", "Sắp ra mắt"];
// You must add the "label" you are using for the posts "Series" to "excludedLabels".

var filteredLabels = categories.filter(function(cat){return!excludedLabels.includes(cat)});return filteredLabels}document.addEventListener('DOMContentLoaded',function(){
const replacements = [ 
  { name: 'Chapter', news: 'Chapter' },
  { name: 'Chương', news: 'Chương' },
  { name: 'Quyển', news: 'Quyển' },
  { name: 'Tập', news: 'Tập' },
  { name: 'Đặc biệt', news: 'Đặc biệt' },
  { name: 'ngoại truyện', news: 'ngoại truyện' },
  { name: 'Ngoài lề', news: 'Ngoài lề' }
];

update.run("Series", parseInt(page), 20) // Option to display the number of posts in 1 page.

function createChapterList(vuItem) {
  const numchar = 3; // Customize the number of chapters displayed
  const validLabels = ['chapter', 'novels']; // Do not write capital letters
//****** Setting [END] ******//
  
  const maxchar = numchar + 1;
  const website = window.location.origin;
  const label = vuItem.getAttribute('label');
  const feedUrl = `${website}/feeds/posts/summary/-/${label}?max-results=${maxchar}`;
  const xhttp = new XMLHttpRequest();
  
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      const parser = new DOMParser();
      const responseXML = parser.parseFromString(this.responseText, 'text/xml');
      const latestPostLink = responseXML.querySelector('link[rel="alternate"][type="text/html"]').getAttribute('href');
      const chapterList = vuItem.querySelector('.Chapter-list');
      chapterList.innerHTML = '';
      const entries = responseXML.querySelectorAll('entry');
      
      const filteredEntries = Array.from(entries).filter(function(entry) {
        const categories = entry.querySelectorAll('category');
        let hasValidLabel = false;
        categories.forEach(function(category) {
          const term = category.getAttribute('term').toLowerCase();
          if (validLabels.includes(term)) {
            hasValidLabel = true;
          }
        });
        return hasValidLabel;
      });
      
      filteredEntries.slice(0, numchar).forEach(function(entry) {
        const title = entry.querySelector('title').textContent;
        let modifiedTitle = title;
        replacements.forEach(function(replacement) {
          modifiedTitle = modifiedTitle.replace(new RegExp(replacement.name, 'g'), replacement.news);
        });
        replacements.forEach(function(replacement) {
          if (modifiedTitle.includes(replacement.news)) {
            modifiedTitle = modifiedTitle.replace(new RegExp(`.*${replacement.news}(.*)$`), `${replacement.news}$1`)
          }
        });
        const listItem = document.createElement('li');
        const linkItem = document.createElement('a');
        const timeAgoItem = document.createElement('span');
        linkItem.href = new URL(entry.querySelector('link[rel="alternate"][type="text/html"]').getAttribute('href'), feedUrl).href;
        linkItem.textContent = modifiedTitle;
        timeAgoItem.textContent = getTimeAgo(entry.querySelector('published').textContent);
        listItem.appendChild(linkItem);
        listItem.appendChild(timeAgoItem);
        chapterList.appendChild(listItem);
      });
    }
  };
  
  xhttp.open('GET', feedUrl, true);
  xhttp.send();
}
const vuItems = document.getElementsByClassName('vuItem');
if (vuItems.length === 0) {
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length > 0) {
        const addedNodes = mutation.addedNodes;
        addedNodes.forEach(function(node) {
          if (node.classList && node.classList.contains('vuItem')) {
            observer.disconnect();
            createChapterList(node);
          }
        });
      }
    });
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
} else {
  Array.from(vuItems).forEach(function(vuItem) {
    createChapterList(vuItem);
  });
}
function getTimeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  
  if (seconds < 60) {
    return 'ngay bây giờ';
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} phút trước`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours} giờ trước`;
  } else if (seconds < 2629746) {
    const days = Math.floor(seconds / 86400);
    return `${days} ngày trước`;
  } else if (seconds < 31556952) {
    const months = Math.floor(seconds / 2629746);
    return `${months} tháng trước`;
  } else {
    const years = Math.floor(seconds / 31556952);
    return `${years} năm trước`;
  }
}
    var mainnnv = document.getElementById("mainnnv");
    var observer = new MutationObserver(function(mutations, observer) {
        if (mutations.some(mutation => mutation.addedNodes.length > 0)) {
            observer.disconnect();
            mainnnv.style.display = "";
            document.getElementById("phantrannnv").style.display = "";
            document.querySelector(".lzozazdziznzg").style.display = "none";
        }
    });
    observer.observe(mainnnv, {
        childList: true
    });
});
function ser_ver_imege(){
            location.reload();
        }
function timeAgo(o){var t=(new Date).getTime()-o.getTime(),e=Math.floor(t/1e3),r=Math.floor(e/60),a=Math.floor(r/60),g=Math.floor(a/24),h=Math.floor(g/30),n=Math.floor(h/12);return 0===t?"Just now":e<60?e+" seconds Ago":r<60?r+" min Ago":a<24?a+" hours Ago":g<30?g+" days Ago":h<12?h+" months":n+" years Ago"}
