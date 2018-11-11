-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2017-11-27 04:09:16
-- 服务器版本： 5.6.17-log
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `ktv`
--

-- --------------------------------------------------------

--
-- 表的结构 `classify`
--

CREATE TABLE IF NOT EXISTS `classify` (
  `cid` int(10) NOT NULL AUTO_INCREMENT,
  `cname` varchar(30) NOT NULL,
  `cthumb` varchar(255) NOT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- 转存表中的数据 `classify`
--

INSERT INTO `classify` (`cid`, `cname`, `cthumb`) VALUES
(1, '内地偶像组合', '/php/11.8KTV/Public/upload17-11-16/banner1.png'),
(2, '内地男歌手', '/php/11.8KTV/Public/upload/17-11-16/nan1.png'),
(3, '港台歌手', '/php/11.8KTV/Public/upload/17-11-21/nvzhong.png'),
(4, '日韩歌手', '/php/11.8KTV/Public/upload/17-11-21/singer-04.png'),
(5, '内地-女歌手', '/php/11.8KTV/Public/upload/17-11-21/ndv.png'),
(6, '青春偶像男&nbsp歌&nbsp手', '/php/11.8KTV/Public/upload/17-11-21/qcox.png');

-- --------------------------------------------------------

--
-- 表的结构 `game`
--

CREATE TABLE IF NOT EXISTS `game` (
  `gid` int(10) NOT NULL AUTO_INCREMENT,
  `gname` varchar(50) NOT NULL,
  `type` int(50) NOT NULL,
  PRIMARY KEY (`gid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- 转存表中的数据 `game`
--

INSERT INTO `game` (`gid`, `gname`, `type`) VALUES
(1, '真心话', 1),
(2, '大冒险', 2),
(3, '真心话1', 1),
(4, '大冒险1', 2),
(5, '真心话2', 1),
(6, '真心话3', 1),
(7, '真心话222', 1),
(8, '真心', 1);

-- --------------------------------------------------------

--
-- 表的结构 `kadmin`
--

CREATE TABLE IF NOT EXISTS `kadmin` (
  `aid` int(10) NOT NULL AUTO_INCREMENT,
  `aname` varchar(50) NOT NULL,
  `apass` int(50) NOT NULL,
  PRIMARY KEY (`aid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `kadmin`
--

INSERT INTO `kadmin` (`aid`, `aname`, `apass`) VALUES
(1, 'ls', 13452),
(2, 'has', 123456);

-- --------------------------------------------------------

--
-- 表的结构 `orderextra`
--

CREATE TABLE IF NOT EXISTS `orderextra` (
  `eid` int(10) NOT NULL AUTO_INCREMENT,
  `sid` int(10) NOT NULL,
  `count` int(10) NOT NULL,
  `total` int(10) NOT NULL,
  `oid` int(10) NOT NULL,
  PRIMARY KEY (`eid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=21 ;

--
-- 转存表中的数据 `orderextra`
--

INSERT INTO `orderextra` (`eid`, `sid`, `count`, `total`, `oid`) VALUES
(1, 20, 1, 20, 6),
(2, 23, 1, 9, 6),
(3, 24, 1, 9, 6),
(4, 20, 3, 60, 7),
(5, 23, 3, 26, 7),
(6, 24, 4, 34, 7),
(7, 17, 4, 2, 7),
(8, 26, 3, 9, 7),
(9, 27, 5, 10, 7),
(10, 25, 5, 23, 7),
(11, 20, 1, 20, 8),
(12, 23, 1, 9, 8),
(13, 24, 1, 9, 8),
(14, 17, 1, 1, 8),
(15, 26, 3, 9, 8),
(16, 20, 3, 60, 9),
(17, 23, 1, 9, 9),
(18, 24, 1, 9, 9),
(19, 25, 2, 9, 9),
(20, 17, 3, 2, 9);

-- --------------------------------------------------------

--
-- 表的结构 `orders`
--

CREATE TABLE IF NOT EXISTS `orders` (
  `oid` int(10) NOT NULL AUTO_INCREMENT,
  `ouser` varchar(10) NOT NULL DEFAULT '张三',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`oid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- 转存表中的数据 `orders`
--

INSERT INTO `orders` (`oid`, `ouser`, `time`, `status`) VALUES
(6, '张三', '2017-11-16 03:13:10', 0),
(7, '张三', '2017-11-16 03:23:03', 0),
(8, '张三', '2017-11-16 03:30:13', 0),
(9, '张三', '2017-11-16 12:33:04', 0);

-- --------------------------------------------------------

--
-- 表的结构 `shoping`
--

CREATE TABLE IF NOT EXISTS `shoping` (
  `sid` int(10) NOT NULL AUTO_INCREMENT,
  `sname` varchar(20) NOT NULL,
  `sdescription` varchar(100) NOT NULL,
  `sprice` float NOT NULL,
  `shot` int(10) NOT NULL,
  `sr` varchar(20) NOT NULL,
  `simg` varchar(255) NOT NULL,
  `stype` int(10) NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=28 ;

--
-- 转存表中的数据 `shoping`
--

INSERT INTO `shoping` (`sid`, `sname`, `sdescription`, `sprice`, `shot`, `sr`, `simg`, `stype`) VALUES
(17, '辣条', '辣的飞起', 0.5, 2, '30g', '/php/11.8KTV/Public/upload17-11-14/sd9.png', 2),
(20, 'M1啤酒', '让你非得更高', 20, 2, '300ml', '/php/11.8KTV/Public/upload17-11-14/sd3.png', 1),
(23, 'Hel啤酒', '让你飞的鸡尾酒', 8.6, 3, '300ml', '/php/11.8KTV/Public/upload17-11-14/sd2.png', 1),
(24, 'M啤酒', '让你飞的M啤酒', 8.5, 2, '250ml', '/php/11.8KTV/Public/upload17-11-14/sd4.png', 1),
(25, 's啤酒', '让你飞的s啤酒', 4.5, 4, '250ml', '/php/11.8KTV/Public/upload17-11-14/sd6.png', 1),
(26, '薯条', '好吃的薯条', 3, 4, '20g', '/php/11.8KTV/Public/upload17-11-14/sd8.png', 2),
(27, '锅巴', '辣辣的锅巴', 2, 4, '15g', '/php/11.8KTV/Public/upload17-11-14/sd9.png', 2);

-- --------------------------------------------------------

--
-- 表的结构 `singer`
--

CREATE TABLE IF NOT EXISTS `singer` (
  `sid` int(10) NOT NULL AUTO_INCREMENT,
  `sname` varchar(30) NOT NULL,
  `snum` int(20) NOT NULL,
  `simg` varchar(255) NOT NULL,
  `dnum` int(20) NOT NULL,
  `cid` int(20) NOT NULL,
  `smv` int(50) NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=17 ;

--
-- 转存表中的数据 `singer`
--

INSERT INTO `singer` (`sid`, `sname`, `snum`, `simg`, `dnum`, `cid`, `smv`) VALUES
(4, '蔡妍', 22, '/php/11.8KTV/Public/upload/17-11-21/singer-01.png', 4562, 1, 111),
(5, '林夕', 224, '/php/11.8KTV/Public/upload/17-11-21/singer-02.png', 4123, 1, 14),
(6, '王菲', 100, '/php/11.8KTV/Public/upload/17-11-21/singer-03.png', 1234, 1, 55),
(7, '那英', 122, '/php/11.8KTV/Public/upload/17-11-21/singer-04.png', 1453, 1, 44),
(8, '孙燕姿', 367, '/php/11.8KTV/Public/upload/17-11-21/singer-05.png', 2354, 1, 5),
(9, '莫文蔚', 236, '/php/11.8KTV/Public/upload/17-11-21/singer-06.png', 4524, 1, 4),
(10, '张惠妹', 150, '/php/11.8KTV/Public/upload/17-11-21/singer-08.png', 4153, 2, 44),
(11, '叮当', 420, '/php/11.8KTV/Public/upload/17-11-21/singer-07.png', 4153, 2, 56),
(12, '蔡妍', 123, '/php/11.8KTV/Public/upload/17-11-21/singer-09.png', 4153, 2, 48),
(13, '李宇春', 155, '/php/11.8KTV/Public/upload/17-11-21/singer-04.png', 4153, 3, 56),
(14, '刘德华', 150, '/php/11.8KTV/Public/upload/17-11-21/singer-06.png', 4153, 4, 56),
(15, 'Angel', 115, '/php/11.8KTV/Public/upload/17-11-21/singer-03.png', 4153, 5, 78),
(16, '宋仲基', 451, '/php/11.8KTV/Public/upload/17-11-21/singer-02.png', 4153, 6, 48);

-- --------------------------------------------------------

--
-- 表的结构 `song`
--

CREATE TABLE IF NOT EXISTS `song` (
  `mid` int(10) NOT NULL AUTO_INCREMENT,
  `mname` varchar(255) NOT NULL,
  `msinger` varchar(30) NOT NULL,
  `mtime` varchar(255) NOT NULL,
  `mpic` varchar(255) NOT NULL,
  `sid` int(10) NOT NULL,
  `mauto` varchar(255) NOT NULL,
  PRIMARY KEY (`mid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=14 ;

--
-- 转存表中的数据 `song`
--

INSERT INTO `song` (`mid`, `mname`, `msinger`, `mtime`, `mpic`, `sid`, `mauto`) VALUES
(4, '画', '蔡妍', '03:46', '/php/11.8KTV/Public/upload/17-11-22/singer-08.png', 4, '/php/11.8KTV/Public/music/17-11-22/hua.mp3'),
(5, '成都', '蔡妍', '05:28', '/php/11.8KTV/Public/upload/17-11-22/singer-08.png', 4, '/php/11.8KTV/Public/music/17-11-22/chengdu.mp3'),
(6, '南方姑娘', '蔡妍', '05:32', '/php/11.8KTV/Public/upload/17-11-22/singer-08.png', 4, '/php/11.8KTV/Public/music/17-11-22/nanfang.mp3'),
(7, '火苗', '蔡妍', '03:32', '/php/11.8KTV/Public/upload/17-11-22/singer-08.png', 4, '/php/11.8KTV/Public/music/17-11-22/a.mp3'),
(8, ' 感觉自己萌萌哒', '蔡妍', '03:35', '/php/11.8KTV/Public/upload/17-11-22/singer-08.png', 4, '/php/11.8KTV/Public/music/17-11-22/b.mp3'),
(9, '我们不一样', '蔡妍', '03:42', '/php/11.8KTV/Public/upload/17-11-22/singer-08.png', 4, '/php/11.8KTV/Public/music/17-11-22/c.mp3'),
(10, '火花', '蔡妍', '03:53', '/php/11.8KTV/Public/upload/17-11-22/singer-08.png', 0, '/php/11.8KTV/Public/music/17-11-22/e.mp3'),
(11, ' 燃烧吧蔬菜', '蔡妍', '03:16', '/php/11.8KTV/Public/upload/17-11-22/singer-08.png', 4, '/php/11.8KTV/Public/music/17-11-22/g.mp3'),
(12, '歌在飞', '蔡妍', '03:53', '/php/11.8KTV/Public/upload/17-11-22/singer-08.png', 4, '/php/11.8KTV/Public/music/17-11-22/g1.mp3'),
(13, '平凡之路', '蔡妍', '05:01', '/php/11.8KTV/Public/upload/17-11-22/singer-08.png', 5, '/php/11.8KTV/Public/music/17-11-22/g3.mp3');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
