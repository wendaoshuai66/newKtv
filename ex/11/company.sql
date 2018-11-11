-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2018-04-17 16:35:05
-- 服务器版本： 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `company`
--

-- --------------------------------------------------------

--
-- 表的结构 `category`
--

CREATE TABLE IF NOT EXISTS `category` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` char(100) NOT NULL,
  `parid` int(10) NOT NULL DEFAULT '0',
  `tem` char(100) NOT NULL DEFAULT 'list',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=22 ;

--
-- 转存表中的数据 `category`
--

INSERT INTO `category` (`id`, `name`, `parid`, `tem`) VALUES
(1, 'About', 0, 'list_about'),
(2, 'product', 0, 'list_catalog'),
(3, 'service', 0, 'list_blog'),
(20, 'Home', 0, 'list'),
(21, 'column', 20, 'list');

-- --------------------------------------------------------

--
-- 表的结构 `content`
--

CREATE TABLE IF NOT EXISTS `content` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `title` char(200) NOT NULL,
  `picture` varchar(3000) DEFAULT NULL,
  `con` text NOT NULL,
  `count` int(200) DEFAULT '0',
  `keyWord` varchar(500) DEFAULT NULL,
  `categoryid` int(10) NOT NULL,
  `keyTitle` char(255) DEFAULT NULL,
  `time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `author` char(100) DEFAULT NULL,
  `pid` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=60 ;

--
-- 转存表中的数据 `content`
--

INSERT INTO `content` (`id`, `title`, `picture`, `con`, `count`, `keyWord`, `categoryid`, `keyTitle`, `time`, `author`, `pid`) VALUES
(20, 'Catering to your requirements, handling your needs with care', '', '<span style="color:#999999;font-family:;">Our store is more than just another average online retailer. We sell not only top quality products, but give our customers a positive online shopping experience. Forget about struggling to do everything at once: taking care of the family, running your business, walking your dog, cleaning the house, doing the shopping, etc. Purchase the goods you need every day or just like in a few clicks or taps, depending on the device you use to access the Internet. We work to make your life more enjoyable.</span>', 0, NULL, 1, NULL, '2017-10-25 11:00:58', NULL, 0),
(21, 'Icon block with text', '', '<span style="color:#999999;font-family:;">We think about the convenience of your choice. Our products are supplied with star rating that should help hesitant buyers to take a decision. What’s more, you can search our site if you know exactly what you are looking for or use a bunch of different filters that will considerably save your time and efforts.</span>', 0, NULL, 7, NULL, '2017-10-25 11:04:07', NULL, 0),
(22, 'Delivery to all regions', '', '<span style="color:#999999;font-family:;">We deliver our goods worldwide. No matter where you live, your order will be shipped in time and delivered right to your door or to any other location you have stated. The packages are handled with utmost care, so the ordered products will be handed to you safe and sound, just like you expect them to be.</span>', 0, NULL, 7, NULL, '2017-10-25 11:04:23', NULL, 0),
(23, 'The highest quality of products', NULL, '<span style="color:#999999;font-family:&quot;">We guarantee the highest quality of the products we sell. Several decades of successful operation and millions of happy customers let us feel certain about that. Besides, all items we sell pass thorough quality control, so no characteristics mismatch can escape the eye of our professionals.</span>', 0, NULL, 7, NULL, '2017-10-25 11:05:16', NULL, 0),
(24, 'John Doe', 'http://localhost/PHP/myMvc/uploadfile/2017-10-26/1508979588.3477about_1_270x270_34a1d327-fceb-4516-8b37-67e0004650d4_270x270.jpg', '<span style="color:#999999;font-family:Lato;font-weight:800;">Senior salesman with 15 years of experience. He knows everything about the products he offers.</span>', 0, NULL, 8, NULL, '2017-10-26 00:59:50', NULL, 0),
(25, 'Mike', 'http://localhost/PHP/myMvc/uploadfile/2017-10-26/1508979570.9217about_3_270x270_5d011038-b87d-4bf3-a95c-a42f1c85c7dd_270x270.jpg', '<span style="color:#999999;font-family:Lato;font-weight:800;">Mega positive shop assistant always ready to help you make the right choice and charm you with a smile.</span>', 0, NULL, 8, NULL, '2017-10-26 00:59:34', NULL, 0),
(26, 'Shary', 'http://localhost/PHP/myMvc/uploadfile/2017-10-26/1508979602.3055about_2_270x270_bff4e7d0-731a-4a1a-a36f-61b56d7e5c7f_270x270.jpg', '<span style="color:#999999;font-family:Lato;font-weight:800;">Wholesale manager. Contact him if you want to buy a batch of the products offered at our store.</span>', 0, NULL, 8, NULL, '2017-10-26 01:00:04', NULL, 0),
(27, 'Quaty', 'http://localhost/PHP/myMvc/uploadfile/2017-10-26/1508979615.7323about_4_270x270_ea9ee208-aa72-44ec-8c97-da1f6c773e47_270x270.jpg', '<span style="color:#999999;font-family:Lato;font-weight:800;">Quality control manager. Her mission is to check the products we ship and settle quality issues if any.</span>', 0, NULL, 8, NULL, '2017-10-26 01:00:17', NULL, 0),
(28, 'Mary Taba', NULL, '<span style="color:#999999;font-family:&quot;">Guys, you rock! Made a purchase at your store recently. The order has been shipped and delivered on time. The quality is superb! The price is quite reasonable. Told all my friends about your excellent service and the variety of choice. I think I’ll be your loyal customer in future as well. I wish your store many more years of prosperity.</span>', 0, NULL, 9, NULL, '2017-10-25 11:10:05', NULL, 0),
(29, 'Virginia Ubert', NULL, '<span style="color:#999999;font-family:&quot;">Thank you again and again! I have experienced the fastest support ever. My order arrived on my door step the following day. Your team is always, friendly and very helpful. You managed to exceed my expectations!</span>', 0, NULL, 9, NULL, '2017-10-25 11:10:40', NULL, 0),
(30, 'count', 'http://localhost/PHP/myMvc/uploadfile/2017-10-26/1508981817.2089collection-1.jpg', '15 products', 0, NULL, 13, NULL, '2017-10-26 01:37:01', NULL, 0),
(31, 'count', 'http://localhost/PHP/myMvc/uploadfile/2017-10-26/1508981849.7482collection-2.jpg', '8 products', 0, NULL, 12, NULL, '2017-10-26 01:37:41', NULL, 0),
(32, 'count', 'http://localhost/PHP/myMvc/uploadfile/2017-10-26/1508981881.1561collection-3.png', '<span>8 products</span>', 0, NULL, 14, NULL, '2017-10-26 01:38:05', NULL, 0),
(33, 'count', 'http://localhost/PHP/myMvc/uploadfile/2017-10-26/1508981954.272collection-2.jpg', '<span>15 products</span>', 0, NULL, 15, NULL, '2017-10-26 01:39:16', NULL, 0),
(34, 'count', 'http://localhost/PHP/myMvc/uploadfile/2017-10-26/1508981922.884collection-1.jpg', '<span>8 products</span>', 0, NULL, 17, NULL, '2017-10-26 01:38:44', NULL, 0),
(35, 'count', 'http://localhost/PHP/myMvc/uploadfile/2017-10-26/1508981997.5278collection-2.jpg', '<span>10 products</span>', 0, NULL, 18, NULL, '2017-10-26 01:40:04', NULL, 0),
(36, 'count', 'http://localhost/PHP/myMvc/uploadfile/2017-10-26/1508982041.8456collection-3.png', '<span>9 products</span>', 0, NULL, 19, NULL, '2017-10-26 01:40:52', NULL, 0),
(37, 'count', 'http://localhost/PHP/myMvc/uploadfile/2017-10-26/1508982156.1079collection-2.jpg', '<span>20 products</span>', 0, NULL, 16, NULL, '2017-10-26 01:42:42', NULL, 0),
(38, 'BING TRIM FIT COTTON JERSEY POLO', 'http://localhost/PHP/myMvc/uploadfile/2017-10-26/1508984088.4184sale.01.jpg', '<span style="color:#999999;font-family:;">Fashion has always been so temporary and uncertain. You can’t keep up with it. This social phenomenon is very whimsical, thus we as the consumers always try to stay in touch with all the latest fashion tendencies. Obviously there is nothing wrong about it because fashion satisfies our willingness to be attractive. And also fashion is the detector of prosperity and social rank.But nowadays fashion is not such unavailable as it was a couple of centuries ago. It will suit you best of all You ha...</span>', 0, NULL, 4, NULL, '2017-10-26 02:14:50', NULL, 0),
(39, 'BING TRIM FIT COTTON JERSEY POLO', 'http://localhost/PHP/myMvc/uploadfile/2017-10-26/1508984118.1451sale.02.png', '<span style="color:#999999;font-family:&quot;">Fashion has always been so temporary and uncertain. You can’t keep up with it. This social phenomenon is very whimsical, thus we as the consumers always try to stay in touch with all the latest fashion tendencies. Obviously there is nothing wrong about it because fashion satisfies our willingness to be attractive. And also fashion is the detector of prosperity and social rank.But nowadays fashion is not such unavailable as it was a couple of centuries ago. It will suit you best of all You ha...</span>', 0, NULL, 4, NULL, '2017-10-26 02:15:48', NULL, 0),
(40, 'BING TRIM FIT COTTON JERSEY POLO', 'http://localhost/PHP/myMvc/uploadfile/2017-10-26/1508984161.4306sale.03.jpg', '<span style="color:#999999;font-family:&quot;">Fashion has always been so temporary and uncertain. You can’t keep up with it. This social phenomenon is very whimsical, thus we as the consumers always try to stay in touch with all the latest fashion tendencies. Obviously there is nothing wrong about it because fashion satisfies our willingness to be attractive. And also fashion is the detector of prosperity and social rank.But nowadays fashion is not such unavailable as it was a couple of centuries ago. It will suit you best of all You ha...</span>', 0, NULL, 4, NULL, '2017-10-26 02:16:10', NULL, 0),
(41, 'BING TRIM FIT COTTON JERSEY POLO', 'http://localhost/PHP/myMvc/uploadfile/2017-10-26/1508984185.5999sale.04.jpg', '<span style="color:#999999;font-family:&quot;">Fashion has always been so temporary and uncertain. You can’t keep up with it. This social phenomenon is very whimsical, thus we as the consumers always try to stay in touch with all the latest fashion tendencies. Obviously there is nothing wrong about it because fashion satisfies our willingness to be attractive. And also fashion is the detector of prosperity and social rank.But nowadays fashion is not such unavailable as it was a couple of centuries ago. It will suit you best of all You ha...</span>', 0, NULL, 4, NULL, '2017-10-26 02:16:49', NULL, 0),
(42, 'BING TRIM FIT COTTON JERSEY POLO', 'http://localhost/PHP/myMvc/uploadfile/2017-10-26/1508984224.6772sale.05.png', '<span style="color:#999999;font-family:&quot;">Fashion has always been so temporary and uncertain. You can’t keep up with it. This social phenomenon is very whimsical, thus we as the consumers always try to stay in touch with all the latest fashion tendencies. Obviously there is nothing wrong about it because fashion satisfies our willingness to be attractive. And also fashion is the detector of prosperity and social rank.But nowadays fashion is not such unavailable as it was a couple of centuries ago. It will suit you best of all You ha...</span>', 0, NULL, 4, NULL, '2017-10-26 02:17:11', NULL, 0),
(43, 'BING TRIM FIT COTTON JERSEY POLO', 'http://localhost/PHP/myMvc/uploadfile/2017-10-26/1508984242.4862sale.06.png', '<span style="color:#999999;font-family:;">Fashion has always been so temporary and uncertain. You can’t keep up with it. This social phenomenon is very whimsical, thus we as the consumers always try to stay in touch with all the latest fashion tendencies. Obviously there is nothing wrong about it because fashion satisfies our willingness to be attractive. And also fashion is the detector of prosperity and social rank.But nowadays fashion is not such unavailable as it was a couple of centuries ago. It will suit you best of all You ha...</span>', 0, NULL, 4, NULL, '2017-10-26 02:18:23', NULL, 0),
(44, 'BING TRIM FIT COTTON JERSEY POLO', 'http://localhost/PHP/myMvc/uploadfile/2017-10-26/1508984277.5892sale.08.png', '<span style="color:#999999;font-family:;">Fashion has always been so temporary and uncertain. You can’t keep up with it. This social phenomenon is very whimsical, thus we as the consumers always try to stay in touch with all the latest fashion tendencies. Obviously there is nothing wrong about it because fashion satisfies our willingness to be attractive. And also fashion is the detector of prosperity and social rank.But nowadays fashion is not such unavailable as it was a couple of centuries ago. It will suit you best of all You ha...</span>', 0, NULL, 4, NULL, '2017-10-26 02:18:31', NULL, 0),
(45, 'BING TRIM FIT COTTON JERSEY POLO', 'http://localhost/PHP/myMvc/uploadfile/2017-10-26/1508984352.8335sale.07.jpg', '<span style="color:#999999;font-family:&quot;">Fashion has always been so temporary and uncertain. You can’t keep up with it. This social phenomenon is very whimsical, thus we as the consumers always try to stay in touch with all the latest fashion tendencies. Obviously there is nothing wrong about it because fashion satisfies our willingness to be attractive. And also fashion is the detector of prosperity and social rank.But nowadays fashion is not such unavailable as it was a couple of centuries ago. It will suit you best of all You ha...</span>', 0, NULL, 4, NULL, '2017-10-26 02:19:15', NULL, 0),
(46, 'Our goods was made up by best experts with the help of most advanced technologies', 'http://localhost/PHP/myMvc/uploadfile/2017-10-26/1508984762.3339blog-1.jpg', '<span style="color:#999999;font-family:&quot;">Obviously there is nothing wrong about it because fashion satisfies our willingness to be attractive. And also fashion is the detector of prosperity and social rank. So, our natural desire to wear fashionable clothes has many reasons such as historical,...</span>', 0, NULL, 3, NULL, '2017-10-26 02:26:04', NULL, 0),
(47, 'Our goods was made up by best experts with the help of most advanced technologies', 'http://localhost/PHP/myMvc/uploadfile/2017-10-26/1508984801.5282blog-2.jpg', '<span style="color:#999999;font-family:&quot;">Obviously there is nothing wrong about it because fashion satisfies our willingness to be attractive. And also fashion is the detector of prosperity and social rank. So, our natural desire to wear fashionable clothes has many reasons such as historical,...</span>', 0, NULL, 3, NULL, '2017-10-26 02:26:43', NULL, 0),
(48, 'Our goods was made up by best experts with the help of most advanced technologies', 'http://localhost/PHP/myMvc/uploadfile/2017-10-26/1508984820.3613blog-03.jpg', '<span style="color:#999999;font-family:&quot;">Obviously there is nothing wrong about it because fashion satisfies our willingness to be attractive. And also fashion is the detector of prosperity and social rank. So, our natural desire to wear fashionable clothes has many reasons such as historical,...</span>', 0, NULL, 3, NULL, '2017-10-26 02:27:10', NULL, 0),
(50, 'Be Fresh & Blossom Flower', 'http://localhost/PHP/myMvc/uploadfile/2017-10-26/1508986260.8856img_2_670x416_crop_center.jpg', '<h4 style="font-weight:300;font-size:24px;font-family:;">\r\n	Every skirt style &amp; length you''re looking for is right here.\r\n</h4>', 0, NULL, 0, 'BIG SALE 50-70% OFF*', '2017-10-26 03:07:57', NULL, 11),
(51, 'More Styles, More Colors!', 'http://localhost/PHP/myMvc/uploadfile/2017-10-26/1508986811.7792img_4_670x416_crop_top.jpg', '<h4 style="font-weight:300;font-size:24px;font-family:;">\r\n	Follow and enjoy the latest fashion trends for men and women.\r\n</h4>', 0, NULL, 0, 'BRAND NEW ITEMS!', '2017-10-26 03:21:30', NULL, 14),
(52, 'Summer 2017 Collection', 'http://localhost/PHP/myMvc/uploadfile/2017-10-26/1508986886.4004banner1.jpg', '<h3 style="color:#FFFFFF;font-size:18px;font-family:" text-align:center;"=""> <strong></strong>LIMITED TIME · ONLINE ONLY!\r\n	</h3>', 0, NULL, 0, 'LIMITED TIME · ONLINE ONLY!', '2017-10-26 03:07:18', NULL, 10),
(53, 'Get 10% off Your First Order', 'http://localhost/PHP/myMvc/uploadfile/2017-10-26/1508986957.3455banner2.jpg', '<h4 style="color:#FFFFFF;font-weight:300;font-size:20px;font-family:" text-align:center;"="">\r\n	As a welcome to all our new customers we have a special code which you can use to get 10% off your first order.\r\n	</h4>', 0, NULL, 0, 'SPECIAL OFFER FOR NEWCOMERS', '2017-10-26 03:07:04', NULL, 10),
(54, 'Simple, Comfy and Practical!', 'http://localhost/PHP/myMvc/uploadfile/2017-10-26/1508987112.6814banner3.jpg', '<h4 style="color:#FFFFFF;font-weight:300;font-size:20px;font-family:" text-align:center;"="">\r\n	Comfy clothes are actually really trendy. Make your weekend plans a lot more stylish with our comfortable outfit ideas. Our comfortable clothes come in many styles &amp; colors.\r\n	</h4>', 0, NULL, 0, '', '2017-10-26 03:06:54', NULL, 10),
(55, 'UNDERWEAR', 'http://localhost/PHP/myMvc/uploadfile/2017-10-26/1508987343.8876img_5_370x_crop_top.jpg', '<span style="font-family:" font-size:14px;"="">DISCOVER THE SPRING/SUMMER 2017</span><br />\r\n<span style="font-family:" font-size:14px;"="">COLLECTION.</span>', 0, NULL, 0, '', '2017-10-26 03:21:47', NULL, 12),
(56, 'SUMMER JACKETS', 'http://localhost/PHP/myMvc/uploadfile/2017-10-26/1508987432.4177img_6_370x_crop_top.jpg', '<span style="font-family:" font-size:14px;"="">SUNNY YELLOW, MINT, CANDY PINK BE BRIGHTER THIS SEASON!</span>', 0, NULL, 0, '', '2017-10-26 03:21:58', NULL, 12),
(57, 'EXCLUSIVE LINGERIE', 'http://localhost/PHP/myMvc/uploadfile/2017-10-26/1508987463.6904img_7_370x_crop_top.jpg', '<span style="font-family:" font-size:14px;"="">SEXY BLACK COLLECTION FOR THE MOST PASSIONATE LADIES</span>', 0, NULL, 0, '', '2017-10-26 03:22:12', NULL, 12),
(58, 'JEANS CLOTHES', 'http://localhost/PHP/myMvc/uploadfile/2017-10-26/1508987503.8647img_8_570x_crop_top.jpg', '<span style="font-family:" font-size:14px;"="">ONE STOP PLACE FOR DESIGNER DENIM</span>', 0, NULL, 0, '', '2017-10-26 03:22:23', NULL, 13),
(59, 'BRAND NEW T-SHIRTS', 'http://localhost/PHP/myMvc/uploadfile/2017-10-26/1508987532.6874img_9_570x_crop_top.jpg', '<span style="font-family:" font-size:14px;"="">STAY ELEGANT, LOOK AND FEEL NEW</span>', 0, NULL, 0, '', '2017-10-26 03:22:35', NULL, 13);

-- --------------------------------------------------------

--
-- 表的结构 `email`
--

CREATE TABLE IF NOT EXISTS `email` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` char(100) NOT NULL,
  `email` char(200) NOT NULL,
  `phone` int(10) NOT NULL,
  `message` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `position`
--

CREATE TABLE IF NOT EXISTS `position` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` char(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=15 ;

--
-- 转存表中的数据 `position`
--

INSERT INTO `position` (`id`, `name`) VALUES
(9, '首页'),
(10, '首页标题'),
(11, '首页标题内容1'),
(12, '首页标题内容2'),
(13, '首页标题内容3'),
(14, '首页标题内容4');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` char(100) NOT NULL,
  `pass` varchar(500) NOT NULL DEFAULT 'e10adc3949ba59abbe56e057f20f883e',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `name`, `pass`) VALUES
(1, 'admin', 'e10adc3949ba59abbe56e057f20f883e');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
