'use strict'
//wqe
const express = require("express");
const path = require("path")
var mysql = require('mysql')
var request = require('request')
const bodyParser = require('body-parser');
const axios=require('axios')
var link = mysql.createConnection({
  host: 'sqld.duapp.com',
  user: '564de1437be0465a84c60e9b205ca969',
  password: '7ce406b1be38431c86e9bc0a3f7612b8',
  port: 4050,
  database: 'TaMKtVAgXeogTdDXevLy',
  charset:'utf8_general_ci'
})
// var link = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   port: 3306,
//   database: 'ktv',
//   charset:'utf8_general_ci'
// })
var server = express()
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());
server.use(express.static(path.resolve(path.join(__dirname, 'public'))));

server.get("/", (req, res) => {
	res.sendFile(path.resolve("./public/index/index.html"))
})

server.get('/admin', (req, res) => {
    res.sendfile(path.resolve("./public/admin/index.html"));
})

server.get("/admin/*", (req, res) =>{
    res.sendfile(path.resolve("./public/admin/index.html"));
})

//商品列表
server.get('/ktv/good',(req,res)=>{
	let sql="select * from goods"
	link.query(sql,(err,data)=>{
		if(err){
			res.send(err.message)
		}else{
			res.json(data)
		}
	})
})

//商品删除
server.get('/ktv/good/delete',(req,res)=>{
    let id=req.query.id
    let sql='delete from goods where id = ?'
    link.query(sql,[id],(err,data)=>res.send(data.rowsAffected?1:0))
})

//商品增加
server.post('/ktv/good/add',(req,res)=>{
    let name=JSON.parse(req.body.name)
    let price=JSON.parse(req.body.price)
    link.query(sql,[name,price],(err,data)=>{res.send(data.insertId?1:0)})
})
//交付
server.post('/ktv/order',(req,res)=>{
	let arr=JSON.parse(req.body.goods)
	// let mess=JSON.parse(req.body.mess)
	let mess={'tell':1234567890,'room':1706}
	// var trans = link.startTransaction();
	let sql="insert into order_goods(tell,room) values(?,?)"
	link.beginTransaction((err)=>{
		if(err){
		    throw err
		}else{
            link.query(sql,[mess.tell,mess.room],(err,data)=>{
                if(err){
                    return link.rollback(()=>{
                        throw err
                    })
                }
                let oid=data.insertId
                let str=[]
                arr.forEach(v=>{
                    str.push([v.id,v.count,oid])
                })
                let sql1="insert into orders(gid,count,oid) values ?"
                link.query(sql1,[str],(err,data)=>{
                    if(err){
                        return link.rollback(()=>{
                            throw err
                        })
                    }
                    link.commit((err)=>{
                        if(err){
                            return link.rollback(()=>{
                                res.send('no')
                            })
                        }else{
                            res.send('yes')
                        }
                    })
                })
            })
        }
	})
})

//订单查看
server.post('/ktv/order_goods',(req,res)=>{
	// let mess=JSON.parse(req.body.tell)
    let mess=1234567890
	let sql="select * from order_goods where tell = ?"
	link.query(sql,[mess],(err,data)=>{
		if(err){
			res.send(err.message)
		}else{
			res.json(data)
		}
	})
})


//订单详情
server.post('/ktv/detail',(req,res)=>{
	let id=JSON.parse(req.body.id)
	let sql=`select orders.id AS id,orders.gid AS gid,orders. count AS count,
	orders.oid AS oid,goods.name AS name, goods.img AS img,goods.price AS price,
	goods.hot AS hot from (orders join goods on((goods.id = orders.gid))) where oid=?`
	link.query(sql,[id],(err,data)=>{
		if(err){
			res.send(err.message)
		}else{
			res.json(data)
		}
	})
})

//大冒险
server.get('/ktv/risk',(req,res)=>{
	let sql="select * from risk"
	link.query(sql,(err,data)=>{
		if(err){
			res.send(err.message)
		}else{
			res.json(data)
		}
	})
})

//猜谜
server.get('/ktv/guess',(req,res)=>{
	let sql="select * from guess"
	link.query(sql,(err,data)=>{
		if(err){
			res.send(err.message)
		}else{
			res.json(data)
		}
	})
})

server.get('/api/getDiscList',function (req,res) {
	var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
	axios.get(url, {
	  headers: {
		referer: 'https://c.y.qq.com/',
		host: 'c.y.qq.com'
	  },
	  params: req.query
	}).then(response => {
	  res.json(response.data)
	}).catch((e) => {
	  console.log(e)
	})
  })
  
server.get('/api/lyric', function (req, res) {
var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

axios.get(url, {
	headers: {
	referer: 'https://c.y.qq.com/',
	host: 'c.y.qq.com'
	},
	params: req.query
}).then((response) => {
	var ret = response.data
	if (typeof ret === 'string') {
	var reg = /^\w+\(({[^()]+})\)$/
	var matches = ret.match(reg)
	if (matches) {
		ret = JSON.parse(matches[1])
	}
	}
	res.json(ret)
}).catch((e) => {
	console.log(e)
})
})

server.get('/api/getSongList', function (req, res) {
var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
axios.get(url, {
	headers: {
	referer: 'https://c.y.qq.com/',
	host: 'c.y.qq.com'
	},
	params: req.query
}).then((response) => {
	var ret = response.data
	// 返回的是JSONP格式的话
	if (typeof ret === 'string') {
	var reg = /^\w+\(({.+})\)$/
	var matches = ret.match(reg)
	if (matches) {
		ret = JSON.parse(matches[1])
	}
	}
	res.json(ret)
}).catch((e)=> {
	console.log(e)
})

})
// server.listen(80)
server.listen(18080)