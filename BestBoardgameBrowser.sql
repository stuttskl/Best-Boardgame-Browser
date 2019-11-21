-- Katie Stutts & Zachary Jaffe-Notier
-- Group 27
-- CS 340, Project Step 4 Draft

-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: classmysql.engr.oregonstate.edu:3306
-- Generation Time: Nov 10, 2019 at 10:31 AM
-- Server version: 10.3.13-MariaDB-log
-- PHP Version: 7.0.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_stuttsk`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `category` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `category`) VALUES
(1, 'Party Game'),
(2, 'Card Game'),
(3, 'Bluffing'),
(4, 'Deck Builder'),
(5, 'Cooperative'),
(6, 'City Building'),
(7, 'Strategy'),
(8, 'Territory Building'),
(9, 'Deduction'),
(10, 'Adventure'),
(11, 'Family');

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `id` int(11) NOT NULL,
  `game_name` varchar(255) NOT NULL,
  `max_players` int(11) DEFAULT NULL,
  `min_players` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`id`, `game_name`, `max_players`, `min_players`) VALUES
(1, ':Spyfall:', 8, 4),
(2, ':Hanabi:', 4, 1),
(3, ':SET:', 4, 1),
(4, ':Gloomhaven:', 4, 1),
(5, ':Pandemic:', 4, 2),
(6, ':Azul:', 4, 2),
(7, ':Star Realms:', 2, 2),
(8, ':Anomia:', 8, 2),
(9, ':Risk:', 6, 2),
(10, ':Dominion:', 4, 2),
(11, ':Acquire:', 6, 2),
(12, ':Monopoly:', 6, 2);

-- --------------------------------------------------------

--
-- Table structure for table `game_category`
--

CREATE TABLE `game_category` (
  `id` int(11) NOT NULL,
  `game_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `game_category`
--

INSERT INTO `game_category` (`id`, `game_id`, `category_id`) VALUES
(1, 1, 9),
(2, 2, 5),
(3, 3, 2),
(4, 4, 10),
(5, 5, 5),
(6, 6, 7),
(7, 7, 4),
(8, 8, 1),
(9, 9, 7),
(10, 10, 2),
(11, 11, 7),
(12, 12, 11);

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `group_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `group_name`) VALUES
(1, ':Team Gryffindor:'),
(2, ':Team Voldemort:'),
(3, ':Blue Team:'),
(4, ':Team U.S.A:');

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE `players` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`id`, `first_name`, `last_name`) VALUES
(1, ':Katie:', ':Stutts:'),
(2, ':Zack:', ':Jaffe-Notier:'),
(3, ':Michael:', ':Scott:'),
(4, ':Jim:', ':Halpert:'),
(5, ':Kevin:', ':Malone:'),
(6, ':Leslie:', ':Knope:'),
(7, ':April:', ':Ludgate:'),
(8, ':Bert:', ':Macklin:'),
(9, ':Tom:', ':Haverford:'),
(10, ':Ben:', ':Wyatt:'),
(11, ':Chris:', ':Trager:'),
(12, ':Ann:', ':Perkins:');

-- --------------------------------------------------------

--
-- Table structure for table `player_games`
--

CREATE TABLE `player_games` (
  `id` int(11) NOT NULL,
  `player_id` int(11) DEFAULT NULL,
  `game_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `player_games`
--

INSERT INTO `player_games` (`id`, `player_id`, `game_id`) VALUES
(1, 1, 1),
(2, 2, 10),
(3, 3, 12),
(4, 4, 8),
(5, 5, 4),
(6, 6, 2),
(7, 7, 3),
(8, 8, 9),
(9, 9, 7),
(10, 10, 6),
(11, 11, 5),
(12, 12, 11);

-- --------------------------------------------------------

--
-- Table structure for table `player_groups`
--

CREATE TABLE `player_groups` (
  `id` int(11) NOT NULL,
  `group_id` int(11) DEFAULT NULL,
  `player_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `player_groups`
--

INSERT INTO `player_groups` (`id`, `group_id`, `player_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 2, 4),
(5, 2, 5),
(6, 2, 6),
(7, 3, 7),
(8, 3, 8),
(9, 3, 9),
(10, 4, 10),
(11, 4, 11),
(12, 4, 12);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `game_category`
--
ALTER TABLE `game_category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `game_id` (`game_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `player_games`
--
ALTER TABLE `player_games`
  ADD PRIMARY KEY (`id`),
  ADD KEY `player_id` (`player_id`),
  ADD KEY `game_id` (`game_id`);

--
-- Indexes for table `player_groups`
--
ALTER TABLE `player_groups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `group_id` (`group_id`),
  ADD KEY `player_id` (`player_id`);

--
-- AUTO_INCREMENT for dumped tables
--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `games`
--
ALTER TABLE `games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
  ON DELETE CASCADE;

--
-- AUTO_INCREMENT for table `game_category`
--
ALTER TABLE `game_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
  ON DELETE CASCADE;

--
-- AUTO_INCREMENT for table `players`
--
ALTER TABLE `players`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
  ON DELETE CASCADE;

--
-- AUTO_INCREMENT for table `player_games`
--
ALTER TABLE `player_games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `player_groups`
--
ALTER TABLE `player_groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `game_category`
--
ALTER TABLE `game_category`
  ADD CONSTRAINT `game_category_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`),
  ADD CONSTRAINT `game_category_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

--
-- Constraints for table `player_games`
--
ALTER TABLE `player_games`
  ADD CONSTRAINT `player_games_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `players` (`id`),
  ADD CONSTRAINT `player_games_ibfk_2` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`);

--
-- Constraints for table `player_groups`
--
ALTER TABLE `player_groups`
  ADD CONSTRAINT `player_groups_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`),
  ADD CONSTRAINT `player_groups_ibfk_2` FOREIGN KEY (`player_id`) REFERENCES `players` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
