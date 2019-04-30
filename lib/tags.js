'use strict';

const { Stats } = require('./stats');
var urljoin = require('url-join');

class Tags extends Stats {
  constructor(data) {
    super(data);
    this.tag = data.tag;
  }
}

class TagsClient {
  constructor(request) {
    this.request = request;
  }

  _parseTags(response) {
    return new Tags(response.body);
  }

  getTags(domain, query) {
    return this.request.get(urljoin('/v3', domain, 'tags'), query).then(tags => tags.map(this._parseTags));
  }

  getTag(domain, tag, query) {
    return this.request.get(urljoin('/v3', domain, 'tags', tag), query).then(this._parseTags);
  }

  getTagStats(domain, tag, query) {
    return this.request.get(urljoin('/v3', domain, 'tags', tag, 'stats'), query).then(this._parseTags);
  }
}

module.exports = TagsClient;
