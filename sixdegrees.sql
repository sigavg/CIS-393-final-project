-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 29, 2023 at 10:34 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sixdegrees`
--

-- --------------------------------------------------------

--
-- Table structure for table `connections`
--

CREATE TABLE `connections` (
  `p1id` int(11) DEFAULT NULL,
  `p2id` int(11) DEFAULT NULL,
  `filename` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `connections`
--

INSERT INTO `connections` (`p1id`, `p2id`, `filename`) VALUES
(0, 0, ' filename'),
(0, 1, '0-1.jpg'),
(0, 5, '0-5.jpg'),
(0, 7, '0-7.jpg'),
(1, 0, '0-1.jpg'),
(1, 2, '1-2.jpg'),
(2, 1, '1-2.jpg'),
(2, 3, '2-3.jpg'),
(3, 2, '2-3.jpg'),
(3, 4, '2-4.jpg'),
(3, 5, '3-5.jpg'),
(3, 10, '3-10.jpg'),
(4, 3, '3-4.jpg'),
(4, 6, '4-6.jpg'),
(5, 0, '0-5.jpg'),
(5, 1, '1-5.jpg'),
(5, 3, '3-5.jpg'),
(6, 4, '4-6.jpg'),
(6, 11, '6-11.jpg'),
(7, 0, '0-7.jpg'),
(7, 8, '7-8.jpg'),
(7, 9, '7-9.jpg'),
(8, 7, '7-8.jpg'),
(8, 9, '8-9.jpg'),
(8, 11, '8-11.jpg'),
(9, 7, '7-9.jpg'),
(9, 8, '8-9.jpg'),
(10, 3, '3-10.jpg'),
(11, 4, '4-11.jpg'),
(11, 6, '6-11.jpg'),
(11, 8, '8-11.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `people`
--

CREATE TABLE `people` (
  `id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `people`
--

INSERT INTO `people` (`id`, `name`) VALUES
(0, 'Kevin Bacon'),
(1, 'Tom Hanks'),
(2, 'Barack Obama'),
(3, 'Donald Trump'),
(4, 'Brian Urlacher'),
(5, 'Sandra Bullock'),
(6, 'Marcy Lesimple'),
(7, 'Chris Pratt'),
(8, 'Wyatt Oleff'),
(9, 'Michael Rooker'),
(10, 'Emmanuel Macron'),
(11, 'Lauren Lesimple');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `connections`
--
ALTER TABLE `connections`
  ADD KEY `p1id` (`p1id`),
  ADD KEY `p2id` (`p2id`);

--
-- Indexes for table `people`
--
ALTER TABLE `people`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `people`
--
ALTER TABLE `people`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `connections`
--
ALTER TABLE `connections`
  ADD CONSTRAINT `connections_ibfk_1` FOREIGN KEY (`p1id`) REFERENCES `people` (`id`),
  ADD CONSTRAINT `connections_ibfk_2` FOREIGN KEY (`p2id`) REFERENCES `people` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
