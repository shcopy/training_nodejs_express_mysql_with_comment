-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2024-06-08 10:11:14
-- 伺服器版本： 10.4.32-MariaDB
-- PHP 版本： 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `app`
--

-- --------------------------------------------------------

--
-- 資料表結構 `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `username` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- 傾印資料表的資料 `comments`
--

INSERT INTO `comments` (`id`, `username`, `content`, `created_at`) VALUES
(1, 'user1', '123', '2024-06-08 13:06:46'),
(2, 'user1', '456', '2024-06-08 13:06:49'),
(3, 'user1', '456', '2024-06-08 13:06:52'),
(4, 'user1', 'dfasdfasd', '2024-06-08 13:06:54'),
(5, 'user1', 'asdfsdf', '2024-06-08 13:06:56'),
(6, 'user1', 'ababab', '2024-06-08 13:07:10'),
(10, 'user1', '123', '2024-06-08 16:07:23'),
(11, 'user1', 'cdd', '2024-06-08 16:07:25'),
(12, 'user1', 'bababa', '2024-06-08 16:07:26'),
(13, 'user1', 'aa', '2024-06-08 16:07:28'),
(14, 'user2', 'sdfdfd', '2024-06-08 16:10:36'),
(15, 'user2', 'abababa', '2024-06-08 16:10:39'),
(16, 'user2', 'sadfsdfasdf', '2024-06-08 16:10:41');

-- --------------------------------------------------------

--
-- 資料表結構 `todos`
--

CREATE TABLE `todos` (
  `id` int(11) NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_german2_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- 傾印資料表的資料 `todos`
--

INSERT INTO `todos` (`id`, `content`, `created_at`) VALUES
(1, 'todo1', '2024-06-07 11:15:18'),
(2, 'todo2', '2024-06-07 11:15:24'),
(3, 'todo3', '2024-06-07 11:15:40'),
(4, 'todo4', '2024-06-07 11:15:44'),
(5, 'dd', '2024-06-07 17:10:43'),
(6, '23232', '2024-06-07 21:23:16'),
(7, '12', '2024-06-07 21:40:10'),
(8, '121', '2024-06-07 21:40:14'),
(9, '45545', '2024-06-07 21:40:19'),
(10, '', '2024-06-07 21:52:27');

-- --------------------------------------------------------

--
-- 資料表結構 `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(128) NOT NULL,
  `nickname` varchar(32) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- 傾印資料表的資料 `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `nickname`, `created_at`) VALUES
(1, 'aaa', '1234567', 'bbb', '2024-06-08 12:06:26'),
(2, 'bbb', '$2a$10$QNBH229hMW870PBhlISxZexK7D8G9/UqNEYNc6HVy7L3vo2HPsJWy', 'bbb', '2024-06-08 12:08:46'),
(3, 'user1', '$2a$10$vzLpRos65RlIxuNoLupK7ugNo47woG68Lxp2UIjh727nc0sCQDzWy', 'user1', '2024-06-08 12:25:48'),
(4, 'user2', '$2a$10$Xk8GvPhND8tljpD17N1RnuMrK3W9.4.z49LolLqMtlI/lTGnmDMOO', 'user2', '2024-06-08 16:10:32');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `todos`
--
ALTER TABLE `todos`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `todos`
--
ALTER TABLE `todos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
