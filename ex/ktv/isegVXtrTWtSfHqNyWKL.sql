-- phpMyAdmin SQL Dump
-- http://www.phpmyadmin.net
--
-- 生成日期: 2018 年 05 月 21 日 20:50

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `isegVXtrTWtSfHqNyWKL`
--

-- --------------------------------------------------------

--
-- 表的结构 `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
  `pid` int(10) NOT NULL AUTO_INCREMENT,
  `user` varchar(20) NOT NULL,
  `pass` varchar(10) NOT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `admin`
--

INSERT INTO `admin` (`pid`, `user`, `pass`) VALUES
(1, 'admin', 'admin'),
(2, 'lvjian', '135246');

-- --------------------------------------------------------

--
-- 表的结构 `game`
--

CREATE TABLE IF NOT EXISTS `game` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `gname` varchar(20) NOT NULL,
  `type` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=62 ;

--
-- 转存表中的数据 `game`
--

INSERT INTO `game` (`id`, `gname`, `type`) VALUES
(3, '真心话', '2'),
(4, '大冒险', '1'),
(41, '大冒险', '1'),
(39, '大冒险1', '1'),
(56, '真心话', '2'),
(55, '大冒险', '1'),
(46, '真心话33', '2'),
(45, '大冒险423', '1'),
(44, '真心话', '2'),
(43, '大冒险13', '1'),
(32, '真心话', '2'),
(38, '大冒险2324', '1'),
(60, '大冒险', '1'),
(61, '恶趣味', '2');

-- --------------------------------------------------------

--
-- 表的结构 `musicclass`
--

CREATE TABLE IF NOT EXISTS `musicclass` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `cname` varchar(10) NOT NULL,
  `cimg` varchar(255) NOT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=34 ;

--
-- 转存表中的数据 `musicclass`
--

INSERT INTO `musicclass` (`cid`, `cname`, `cimg`) VALUES
(24, '内地男歌手', '/pulic/upload/17-11-17/nan1.png'),
(26, '日韩女歌手', '/pulic/upload/17-11-17/gs-11_11.png'),
(23, '内地偶像组合', '/pulic/upload/17-11-17/xgs.png'),
(25, '港台歌手', '/pulic/upload/17-11-17/gs-11_09.png'),
(27, '内地女歌手', '/pulic/upload/17-11-17/gs-11_15.png'),
(28, '青春偶像男歌手', '/pulic/upload/17-11-17/gs-11_17.png');

-- --------------------------------------------------------

--
-- 表的结构 `musicmanage`
--

CREATE TABLE IF NOT EXISTS `musicmanage` (
  `Mid` int(10) NOT NULL AUTO_INCREMENT,
  `Mname` varchar(10) NOT NULL,
  `Sname` varchar(10) NOT NULL,
  `Mtime` varchar(255) NOT NULL,
  `Mdescribe` varchar(255) NOT NULL,
  `Mcontent` varchar(255) NOT NULL,
  `Mcount` int(10) NOT NULL,
  `Mnum` int(10) NOT NULL,
  `Mimg` varchar(255) NOT NULL,
  `sid` int(10) NOT NULL COMMENT '父栏目ID',
  `Msong` varchar(255) NOT NULL COMMENT '歌曲链接',
  PRIMARY KEY (`Mid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=55 ;

--
-- 转存表中的数据 `musicmanage`
--

INSERT INTO `musicmanage` (`Mid`, `Mname`, `Sname`, `Mtime`, `Mdescribe`, `Mcontent`, `Mcount`, `Mnum`, `Mimg`, `sid`, `Msong`) VALUES
(1, '谢谢你的爱', '刘德华', ' 04:39 ', '无', ' 无', 2136, 2342, '/pulic/upload/17-11-18/timg.jpg', 15, '../../pulic/audio/谢谢你的爱.mp3'),
(2, '笨小孩', '刘德华', ' 03:50 ', '', ' ', 5864, 7659, '/pulic/upload/17-11-18/timg.jpg', 15, '../../pulic/audio/笨小孩.mp3'),
(3, '17岁-刘德华', '刘德华', '05:03', '', ' ', 5864, 7659, '/pulic/upload/17-11-18/timg.jpg', 15, '../../pulic/audio/17岁-刘德华.mp3'),
(19, '我们不一样', '大壮', '04:30', '', '', 624, 764, '/pulic/upload/17-11-19/sing-10.jpg', 18, '../../pulic/audio/ 我们不一样.mp3'),
(20, '李荣浩 - 老街', '李荣浩', ' 05:18 ', '无', ' 无', 1345, 667, '/pulic/upload/17-11-19/sing-14.jpg', 20, '../../pulic/audio/李荣浩 - 老街.mp3'),
(21, '戒烟', '李荣浩', ' 04:52 ', '无', ' 无', 1345, 667, '/pulic/upload/17-11-19/sing-14.jpg', 20, '../../pulic/audio/戒烟.mp3'),
(22, '我看着你的时候', '李荣浩', ' 04:53 ', '无', ' 无', 1345, 667, '/pulic/upload/17-11-19/sing-14.jpg', 20, '../../pulic/audio/我看着你的时候.mp3'),
(23, '祝你幸福', '李荣浩', ' 04:37 ', '无', ' 无', 1345, 667, '/pulic/upload/17-11-19/sing-14.jpg', 20, '../../pulic/audio/祝你幸福.mp3'),
(24, '不将就', '李荣浩', ' 05:12 ', '无', ' 无', 1345, 667, '/pulic/upload/17-11-19/sing-14.jpg', 20, '../../pulic/audio/不将就.mp3'),
(25, '后裔', '李荣浩', ' 03:25 ', '无', ' 无', 1345, 667, '/pulic/upload/17-11-19/sing-14.jpg', 20, '../../pulic/audio/后裔.mp3'),
(26, '俩个人', '蔡妍', ' 03:07 ', '无', ' 无', 875, 246, '/pulic/upload/17-11-20/singer-08.png', 6, '../../pulic/audio/俩个人.mp3'),
(27, '不堪一击', '林夕', ' 04:10 ', '无', ' 无', 246, 522, '/pulic/upload/17-11-20/singer-02.png', 7, '../../pulic/audio/不堪一击.mp3'),
(28, '匆匆那年', '王菲', ' 04:01 ', '无', ' 无', 845, 4556, '/pulic/upload/17-11-20/singer-03.png', 565, '../../pulic/audio/匆匆那年.mp3'),
(29, '默', '那英', ' 05:25 ', '无 ', ' 无', 553, 566, '/pulic/upload/17-11-20/singer-04.png', 9, '../../pulic/audio/默.mp3'),
(30, '绿光森林', '孙燕姿', ' 04:39 ', '无', ' 无', 3534, 345, '/pulic/upload/17-11-20/singer-05.png', 10, '../../pulic/audio/ 绿光森林.mp3'),
(31, '他不爱我', '莫文蔚', ' 05:18 ', '无', ' 无', 2423, 2344, '/pulic/upload/17-11-20/singer-06.png', 11, '../../pulic/audio/他不爱我.mp3'),
(32, '不该', '张惠妹', ' 04:50 ', '无 ', ' 无', 877, 546, '/pulic/upload/17-11-20/singer-07.png', 12, '../../pulic/audio/不该.mp3'),
(33, '关于她', '叮当', ' 03:01 ', '无 ', ' 无', 1424, 4242, '/pulic/upload/17-11-20/singer-08.png', 13, '../../pulic/audio/关于她.mp3'),
(34, '逃', '朱克', ' 05:07 ', '无', ' 无', 4312, 8531, '/pulic/upload/17-11-20/sing-12.jpg', 16, '../../pulic/audio/逃.mp3'),
(35, '辛德瑞拉', '刘心', ' 05:18 ', '无', ' 无', 1326, 852, '/pulic/upload/17-11-20/sing-11.jpg', 17, '../../pulic/audio/辛德瑞拉.mp3'),
(36, '成都', '赵雷', ' 05:28 ', '无', ' 无', 4234, 2342, '/pulic/upload/17-11-20/sing-13.jpg', 19, '../../pulic/audio/成都.mp3'),
(37, '红玫瑰', '陈奕迅', ' 03:59 ', '无', ' 无', 2343, 2323, '/pulic/upload/17-11-20/sing-15.jpeg', 21, '../../pulic/audio/红玫瑰.mp3'),
(39, '开心的马骝', '刘德华', ' 02:12 ', '无', ' 无', 1242, 5766, '/pulic/upload/17-11-22/timg.jpg', 15, '../../pulic/audio/开心的马骝.mp3'),
(50, '李荣浩', '李荣浩', ' 05:30 ', '无', ' 无', 2134, 123, '/pulic/upload/17-11-23/play.png', 20, '/pulic/uploadmusic/17-11-23/151145078843.mp3'),
(53, '阴天', '莫文蔚', ' 03:53 ', '无', ' 无', 2134, 653, '/pulic/upload/17-11-23/109951162783381.jpg', 26, '/pulic/uploadmusic/17-11-23/151145148394.mp3'),
(54, '沙', '南二巷乐队', ' 04:30 ', '无', ' 无', 3234, 3123, '/pulic/upload/17-11-23/singer123.jpg', 22, '/pulic/uploadmusic/17-11-23/151145202030.mp3');

-- --------------------------------------------------------

--
-- 表的结构 `musicsinger`
--

CREATE TABLE IF NOT EXISTS `musicsinger` (
  `Sid` int(10) NOT NULL AUTO_INCREMENT,
  `Simg` varchar(255) NOT NULL,
  `Sname` varchar(10) NOT NULL,
  `Snum` int(10) NOT NULL,
  `cid` int(10) NOT NULL COMMENT '父栏目id',
  PRIMARY KEY (`Sid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=24 ;

--
-- 转存表中的数据 `musicsinger`
--

INSERT INTO `musicsinger` (`Sid`, `Simg`, `Sname`, `Snum`, `cid`) VALUES
(6, '/pulic/upload/17-11-18/singer-01.png', '蔡妍', 382, 23),
(7, '/pulic/upload/17-11-18/singer-02.png', '林夕', 463, 27),
(8, '/pulic/upload/17-11-18/singer-03.png', '王菲', 233, 25),
(9, '/pulic/upload/17-11-18/singer-04.png', '那英', 312, 24),
(10, '/pulic/upload/17-11-18/singer-05.png', '孙燕姿', 213, 23),
(11, '/pulic/upload/17-11-18/singer-06.png', '莫文蔚', 987, 26),
(12, '/pulic/upload/17-11-18/singer-07.png', '张惠妹', 456, 27),
(13, '/pulic/upload/17-11-18/singer-08.png', '叮当', 123, 23),
(16, '/pulic/upload/17-11-18/sing-12.jpg', '朱克', 324, 25),
(15, '/pulic/upload/17-11-18/timg.jpg', '刘德华', 1231, 28),
(17, '/pulic/upload/17-11-18/sing-11.jpg', '刘心', 234, 23),
(18, '/pulic/upload/17-11-18/sing-10.jpg', '大壮', 123, 23),
(19, '/pulic/upload/17-11-18/sing-13.jpg', '赵雷', 332, 23),
(20, '/pulic/upload/17-11-18/sing-14.jpg', '李荣浩', 752, 25),
(21, '/pulic/upload/17-11-18/sing-15.jpeg', '陈奕迅', 999, 26),
(23, '/pulic/upload/17-12-02/qw.jpg', '南二巷乐队', 1234, 24);

-- --------------------------------------------------------

--
-- 表的结构 `orders`
--

CREATE TABLE IF NOT EXISTS `orders` (
  `oid` int(10) NOT NULL AUTO_INCREMENT,
  `user` varchar(10) NOT NULL,
  `times` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `state` varchar(10) NOT NULL,
  PRIMARY KEY (`oid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=103 ;

--
-- 转存表中的数据 `orders`
--

INSERT INTO `orders` (`oid`, `user`, `times`, `state`) VALUES
(62, 'zhangsan', '2017-11-24 09:58:12', '0'),
(61, 'zhangsan', '2017-11-24 09:58:12', '0'),
(60, 'zhangsan', '2017-11-24 09:58:10', '0'),
(59, 'zhangsan', '2017-11-24 09:58:10', '0'),
(58, 'zhangsan', '2017-11-22 14:48:31', '0'),
(57, 'zhangsan', '2017-11-22 14:48:31', '0'),
(56, 'zhangsan', '2017-11-22 14:47:44', '0'),
(55, 'zhangsan', '2017-11-22 14:47:44', '0'),
(54, 'zhangsan', '2017-11-16 11:46:05', '0'),
(53, 'zhangsan', '2017-11-16 11:46:05', '0'),
(52, 'zhangsan', '2017-11-16 11:42:38', '0'),
(51, 'zhangsan', '2017-11-16 11:42:38', '0'),
(50, 'zhangsan', '2017-11-16 11:11:43', '0'),
(49, 'zhangsan', '2017-11-16 11:11:43', '0'),
(63, 'zhangsan', '2017-12-01 11:18:10', '0'),
(64, 'zhangsan', '2017-12-01 11:18:10', '0'),
(65, 'zhangsan', '2017-12-01 11:18:13', '0'),
(66, 'zhangsan', '2017-12-01 11:18:13', '0'),
(67, 'zhangsan', '2017-12-01 11:18:14', '0'),
(68, 'zhangsan', '2017-12-01 11:18:14', '0'),
(69, 'zhangsan', '2017-12-01 11:18:24', '0'),
(70, 'zhangsan', '2017-12-01 11:18:24', '0'),
(71, 'zhangsan', '2017-12-01 11:18:25', '0'),
(72, 'zhangsan', '2017-12-01 11:18:25', '0'),
(73, 'zhangsan', '2017-12-01 11:18:26', '0'),
(74, 'zhangsan', '2017-12-01 11:18:26', '0'),
(75, 'zhangsan', '2017-12-01 11:18:26', '0'),
(76, 'zhangsan', '2017-12-01 11:18:26', '0'),
(77, 'zhangsan', '2017-12-01 11:18:26', '0'),
(78, 'zhangsan', '2017-12-01 11:18:26', '0'),
(79, 'zhangsan', '2017-12-01 11:18:27', '0'),
(80, 'zhangsan', '2017-12-01 11:18:27', '0'),
(81, 'zhangsan', '2017-12-01 11:18:27', '0'),
(82, 'zhangsan', '2017-12-01 11:18:27', '0'),
(83, 'zhangsan', '2017-12-01 11:18:39', '0'),
(84, 'zhangsan', '2017-12-01 11:18:39', '0'),
(85, 'zhangsan', '2017-12-01 19:31:01', '0'),
(86, 'zhangsan', '2017-12-01 19:31:01', '0'),
(87, 'zhangsan', '2017-12-01 19:31:05', '0'),
(88, 'zhangsan', '2017-12-01 19:31:05', '0'),
(89, 'zhangsan', '2017-12-01 19:31:06', '0'),
(90, 'zhangsan', '2017-12-01 19:31:06', '0'),
(91, 'zhangsan', '2017-12-02 06:55:30', '0'),
(92, 'zhangsan', '2017-12-02 06:55:30', '0'),
(93, 'zhangsan', '2017-12-02 06:55:34', '0'),
(94, 'zhangsan', '2017-12-02 06:55:34', '0'),
(95, 'zhangsan', '2017-12-02 06:55:37', '0'),
(96, 'zhangsan', '2017-12-02 06:55:37', '0'),
(97, 'zhangsan', '2017-12-02 13:03:50', '0'),
(98, 'zhangsan', '2017-12-02 13:03:50', '0'),
(99, 'zhangsan', '2017-12-02 13:03:52', '0'),
(100, 'zhangsan', '2017-12-02 13:03:52', '0'),
(101, 'zhangsan', '2017-12-02 13:03:53', '0'),
(102, 'zhangsan', '2017-12-02 13:03:53', '0');

-- --------------------------------------------------------

--
-- 表的结构 `ordervice`
--

CREATE TABLE IF NOT EXISTS `ordervice` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `sid` int(10) NOT NULL,
  `num` int(10) NOT NULL,
  `Total` float NOT NULL,
  `oid` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=81 ;

--
-- 转存表中的数据 `ordervice`
--

INSERT INTO `ordervice` (`id`, `sid`, `num`, `Total`, `oid`) VALUES
(32, 5, 1, 98, 61),
(31, 5, 1, 98, 59),
(30, 26, 1, 168, 49),
(29, 5, 1, 98, 49),
(28, 6, 1, 8.6, 49),
(27, 23, 1, 9.8, 49),
(33, 23, 1, 9.8, 63),
(34, 6, 1, 8.6, 63),
(35, 5, 1, 98, 63),
(36, 26, 1, 168, 63),
(37, 23, 1, 9.8, 65),
(38, 6, 1, 8.6, 65),
(39, 5, 1, 98, 65),
(40, 26, 1, 168, 65),
(41, 23, 1, 9.8, 67),
(42, 6, 1, 8.6, 67),
(43, 5, 1, 98, 67),
(44, 26, 1, 168, 67),
(45, 23, 1, 9.8, 69),
(46, 6, 1, 8.6, 69),
(47, 5, 1, 98, 69),
(48, 26, 1, 168, 69),
(49, 23, 1, 9.8, 71),
(50, 6, 1, 8.6, 71),
(51, 5, 1, 98, 71),
(52, 26, 1, 168, 71),
(53, 23, 1, 9.8, 73),
(54, 6, 1, 8.6, 73),
(55, 5, 1, 98, 73),
(56, 26, 1, 168, 73),
(57, 23, 1, 9.8, 75),
(58, 6, 1, 8.6, 75),
(59, 5, 1, 98, 75),
(60, 26, 1, 168, 75),
(61, 23, 1, 9.8, 77),
(62, 6, 1, 8.6, 77),
(63, 5, 1, 98, 77),
(64, 26, 1, 168, 77),
(65, 23, 1, 9.8, 79),
(66, 6, 1, 8.6, 79),
(67, 5, 1, 98, 79),
(68, 26, 1, 168, 79),
(69, 23, 1, 9.8, 81),
(70, 6, 1, 8.6, 81),
(71, 5, 1, 98, 81),
(72, 26, 1, 168, 81),
(73, 5, 1, 98, 83),
(74, 6, 1, 8.6, 83),
(75, 23, 4, 39.2, 85),
(76, 23, 4, 39.2, 87),
(77, 23, 4, 39.2, 89),
(78, 23, 4, 39.2, 97),
(79, 23, 4, 39.2, 99),
(80, 23, 4, 39.2, 101);

-- --------------------------------------------------------

--
-- 表的结构 `shop`
--

CREATE TABLE IF NOT EXISTS `shop` (
  `sid` int(10) NOT NULL AUTO_INCREMENT,
  `sname` varchar(20) NOT NULL,
  `stype` int(10) NOT NULL,
  `spicture` varchar(255) NOT NULL,
  `sprice` float NOT NULL,
  `sCompany` varchar(20) NOT NULL,
  `scontent` varchar(255) NOT NULL,
  `hot` varchar(20) NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=30 ;

--
-- 转存表中的数据 `shop`
--

INSERT INTO `shop` (`sid`, `sname`, `stype`, `spicture`, `sprice`, `sCompany`, `scontent`, `hot`) VALUES
(23, 'SNUEDAN啤酒 ', 1, '/pulic/upload/17-11-14/sd3.png', 9.8, '瓶', '', '2'),
(6, 'HELMSAN', 1, '/pulic/upload/17-11-13/sd2.png', 8.6, '瓶', '', '3'),
(5, 'MUIC', 1, '/pulic/upload/17-11-13/sd3.png', 98, '件', '可以让你飞的鸡尾酒', '3'),
(25, 'MSAN啤酒', 1, '/pulic/upload/17-11-14/sd6.png', 9.8, '瓶', '', '2'),
(26, 'MUIC', 2, '/pulic/upload/17-11-14/sd8.png', 168, '瓶', '', '3'),
(27, 'NFHS', 2, '/pulic/upload/17-11-14/sd9.png', 1, '袋', '', '5'),
(28, '红牛', 1, '/pulic/upload/17-11-16/sd2.png', 18, '瓶', '做不一样的男人', '3'),
(29, '冰纯', 1, '/pulic/upload/17-11-16/sd2.png', 18, '瓶', '在炎热的夏日让你无比愉悦', '4');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
