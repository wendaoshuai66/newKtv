import jsonp from '../assets/js/jsonp'
import {commonParams, options} from './common'

export function getTopList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

  const data = Object.assign({}, commonParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })

  return jsonp(url, data, options)
}

export function getMusicList(topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    platform: 'h5',
    needNewCode: 1,
    order: 'listen',
    begin: 0,
    uin: 0,
    num: 100,
    songstatus: 1,
    format: 'json',
    type: 'top',
    tpl: 3,
    page: 'detail',
    topid
  })

  return jsonp(url, data, options)
}
