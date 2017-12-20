class TrendingRepoModel {
  constructor(fullName, url, description, language, meta, contributors, contributorsUrl) {
    this.fullName = fullName;
    this.url = url;
    this.description = description;
    this.language = language;
    this.meta = meta;
    this.contributors = contributors;
    this.contributorsUrl = contributorsUrl;
  }
}

class StringUtil {
  /*
  * 去掉字符串左右空格、换行
  */
  static trim(text) {
    if (typeof (text) === 'string') {
      return text.replace(/^\s*|\s*$/g, '');
    }
    return text;
  }
}

// // 从网页中解析出需要的trending数据
// export default class TrendingUtil {
//   static htmlToRepo(responseData) {
//     responseData = responseData.substring(responseData.indexOf('<li class="repo-list'), responseData.indexOf('</ol>')).replace(/\n/, '');
//     const repos = [];
//     const splitWithH3 = responseData.split('<h3');
//     splitWithH3.shift();
//     for (let i = 0; i < splitWithH3.length; i += 1) {
//       const repo = new TrendingRepoModel();
//       const html = splitWithH3[i];

//       this.parseRepoBaseInfo(repo, html);

//       const metaNoteContent = this.parseContentOfNode(html, 'repo-list-meta');
//       this.parseRepoMeta(repo, metaNoteContent);
//       this.parseRepoContributors(repo, metaNoteContent);
//       repos.push(repo);
//     }
//     return repos;
//   }

//   static parseContentOfNode(htmlStr, classFlag) {
//     const noteEnd = htmlStr.indexOf(' class="' + classFlag);
//     const noteStart = htmlStr.lastIndexOf('<', noteEnd) + 1;
//     const note = htmlStr.substring(noteStart, noteEnd);

//     const sliceStart = htmlStr.indexOf(classFlag) + classFlag.length + 2;
//     const sliceEnd = htmlStr.indexOf('</' + note + '>', sliceStart);
//     const content = htmlStr.substring(sliceStart, sliceEnd);
//     return StringUtil.trim(content);
//   }

//   static parseRepoBaseInfo(repo, htmlBaseInfo) {
//     const urlIndex = htmlBaseInfo.indexOf('<a href="') + '<a href="'.length;
//     const url = htmlBaseInfo.slice(urlIndex, htmlBaseInfo.indexOf('">', urlIndex));
//     repo.url = url;
//     repo.fullName = url.slice(1, url.length);

//     let description = this.parseContentOfNode(htmlBaseInfo, 'repo-list-description');
//     const index = description.indexOf('</g-emoji>');
//     if (index !== -1) {
//       const indexEmoji = description.indexOf('</g-emoji>');
//       const emoji = description.substring(description.indexOf('>') + 1, indexEmoji)
//       description = emoji + description.substring(indexEmoji + '</g-emoji>'.length);
//     }
//     repo.description = description;
//   }

//   static parseRepoMeta(repo, htmlMeta) {
//     const splitWit_n = htmlMeta.split('\n');
//     if (splitWit_n[0].search('stars') === -1) {
//       repo.language = splitWit_n[0];
//     }
//     for (let i = 0; i < splitWit_n.length; i += 1) {
//       if (splitWit_n[i].search('stars') !== -1) {
//         repo.meta = StringUtil.trim(splitWit_n[i]);
//         break;
//       }
//     }
//   }

//   static parseRepoContributors(repo, htmlContributors) {
//     const splitWitSemicolon = htmlContributors.split('"');
//     repo.contributorsUrl = splitWitSemicolon[1];
//     const contributors = [];
//     for (let i = 0; i < splitWitSemicolon.length; i += 1) {
//       const url = splitWitSemicolon[i];
//       if (url.search('http') !== -1) {
//         contributors.push(url);
//       }
//     }
//     repo.contributors = contributors;
//   }
// }


var TAGS = {
  meta: {
      start: '<span class="d-inline-block float-sm-right">',
      end: '</span>'
  },
  forkCount: {
      start: '<a class="muted-link d-inline-block mr-3"',
      flag: '/stargazers">',
      end: '</a>'
  },
  starCount: {
      start: '<a class="muted-link d-inline-block mr-3"',
      flag: '/network">',
      end: '</a>'
  }

}
export default class TrendingUtil {
  static htmlToRepo(responseData) {
      responseData = responseData.substring(responseData.indexOf('<li class="repo-list'), responseData.indexOf('</ol>')).replace(/\n/, '');
      var repos = [];
      var splitWithH3 = responseData.split('<h3');
      splitWithH3.shift();
      for (var i = 0; i < splitWithH3.length; i++) {
          var repo = new TrendingRepoModel();
          var html = splitWithH3[i];

          this.parseRepoBaseInfo(repo, html);

          var metaNoteContent = this.parseContentWithNote(html, 'class="f6 text-gray mt-2">', '</li>');
          repo.meta = this.parseRepoLabelWithTag(repo, metaNoteContent, TAGS.meta);
          repo.starCount = this.parseRepoLabelWithTag(repo, metaNoteContent, TAGS.starCount);
          repo.forkCount = this.parseRepoLabelWithTag(repo, metaNoteContent, TAGS.forkCount);

          this.parseRepoLang(repo, metaNoteContent);
          this.parseRepoContributors(repo, metaNoteContent);
          repos.push(repo);
      }
      return repos;
  }

  static parseContentWithNote(htmlStr, startFlag, endFlag) {
      var noteStar = htmlStr.indexOf(startFlag);
      if (noteStar == -1) {
          return '';
      } else {
          noteStar += +startFlag.length;
      }

      var noteEnd = htmlStr.indexOf(endFlag, noteStar);
      var content = htmlStr.substring(noteStar, noteEnd);
      return StringUtil.trim(content)
  }

  static parseRepoBaseInfo(repo, htmlBaseInfo) {
      var urlIndex = htmlBaseInfo.indexOf('<a href="') + '<a href="'.length;
      var url = htmlBaseInfo.slice(urlIndex, htmlBaseInfo.indexOf('">', urlIndex));
      repo.url = url;
      repo.fullName = url.slice(1, url.length);

      var description = this.parseContentWithNote(htmlBaseInfo, '<p class="col-9 d-inline-block text-gray m-0 pr-4">', '</p>');
      repo.description = description;
  }

  static parseRepoLabelWithTag(repo, noteContent, tag) {
      let startFlag;
      if (TAGS.starCount === tag || TAGS.forkCount === tag) {
          startFlag = tag.start + ' href="/' + repo.fullName + tag.flag;
      } else {
          startFlag = tag.start;
      }
      let content = this.parseContentWithNote(noteContent, startFlag, tag.end);
      let metaContent = content.substring(content.indexOf('</svg>') + '</svg>'.length, content.length);
      return StringUtil.trim(metaContent);
  }

  static parseRepoLang(repo, metaNoteContent) {
      var content = this.parseContentWithNote(metaNoteContent, 'programmingLanguage">', '</span>');
      repo.language = StringUtil.trim(content);
  }

  static parseRepoContributors(repo, htmlContributors) {
      htmlContributors = this.parseContentWithNote(htmlContributors, 'Built by', '</a>');
      var splitWitSemicolon = htmlContributors.split('"');
      repo.contributorsUrl = splitWitSemicolon[1];
      var contributors = [];
      for (var i = 0; i < splitWitSemicolon.length; i++) {
          var url = splitWitSemicolon[i];
          if (url.search('http') !== -1) {
              contributors.push(url);
          }
      }
      repo.contributors = contributors;
  }
}