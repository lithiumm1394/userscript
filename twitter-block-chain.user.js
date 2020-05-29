// ==UserScript==
// @name     Twitter Block Followers
// @version  0.1
// @grant    none
// @match    https://twitter.com/*
// @require  https://cdn.jsdelivr.net/npm/vue/dist/vue.js
// ==/UserScript==

'use strict';

function getCookieByName (name) {
  const nameEQ = `${name}=`;
  const cookie = document.cookie.split(';')
    .find(str => str.trim().startsWith(nameEQ));
  return cookie === undefined ? null : cookie.slice(nameEQ.length + 1);
}

const apis = {
  'friendships/lookup': {
    url: 'https://api.twitter.com/1.1/friendships/lookup.json',
    method: 'GET',
  },

  // queries is a object of parameters
  request(api_name, queries) {
    const api = this[api_name];

    const init = {
      method: api.method,
      headers: {
        'authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
        'x-csrf-token': getCookieByName('ct0'),
      },
      credentials: 'include',
    };

    const query_string = Object.entries(queries).map(query => `${query[0]}=${query[1]}`).join('&');

    return fetch(`${api.url}?${query_string}`, init)
      .then(response => response.json())
      // TODO: catch request failure
  }
}

async function main () {
  const match = document.title.match(/\(@(\w+)\)/);
  if (match === null) {
    console.log('this is not a user page.');
    return;
  }

  const screen_name = match[1];

  // TODO: temperary set is_blocked = true to bypass http request.
  // const [{connections}] = await apis.request('friendships/lookup', {screen_name: screen_name});
  // const is_blocked = connections.includes('blocking');
  const is_blocked = true;
  if (!is_blocked) return;

  // TODO: add UI:
  // 1. a button, text: block all @screen_name's followers.
  // 2. option: skip (do not block) my following.
  // 3. option: skip those user whose followers number > {arbitray number: default 1000}.
  // 4. option: list all skipped users, including 2. & 3.
  // 5. option: stop when encoutering failures.
  // 6. display info: all followers: number
  //                  already blocked: number
  //                  in my following: number
  //                  pending block: number (-1 everytime successfully block a user)

  const app = new Vue({
    el: document.querySelector('main [data-testid=primaryColumn]').appendChild(document.createElement('div')),
    data: {
      screen_name: screen_name,
      start: false,
      my_following_block: false,
      total_followers: undefined,
      already_blocked: undefined,
      in_my_following: undefined,
      pending_block: undefined,
      status: '',
    },
    template: `
    <div>
      <span class='title'>block @{{screen_name}}'s followers</span>
      <button type='button' @click='handle_click'>{{start ? 'stop' : 'start'}}</button>
      <div>
        <input type='checkbox' id='my-following-block' v-model='my_following_block'>
        <label for='my-following-block'>block my following</label>
      </div>
      <div>
        <p>{{total_followers || '??'}} Followers</p>
        <p>{{already_blocked || '??'}} Already Blocked</p>
        <p>{{in_my_following || '??'}} In My Following</p>
        <p>{{pending_block || '??'}} Pending Block</p>
      </div>
      <p>Status: {{status}}</p>
    </div>`,
    methods: {
      handle_click: function () {
        console.log('click');
        this.start = !this.start;
      },
    },
  });

  // TODO: feature
  // 1. GET followers/ids, fetch all followers
  // 2. GET friends/ids, fetch my followings
  // 3. GET blocks/ids, fetch my current_block list
  // 4. use filter: pending_block_list = followers - followings - current_block_list
  // 5. loop: POST blocks/create, be aware of 'rate limiting'

  const my_id = getCookieByName('twid').slice(4);
  console.log(my_id);

}

window.addEventListener('load', main);
