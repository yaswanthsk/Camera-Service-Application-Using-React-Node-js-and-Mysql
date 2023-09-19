-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 19, 2023 at 04:34 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cameraservice`
--

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `id` int(11) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `username` varchar(20) NOT NULL,
  `mobileNumber` varchar(10) NOT NULL,
  `userRole` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `email`, `password`, `username`, `mobileNumber`, `userRole`) VALUES
(20395, 'demo@gmail.com', 'demo1234', 'demo', '1231231231', 'demo'),
(92119, 'test@gmail.com', 'test1234', 'testuser', '9876543210', 'user'),
(709977, 'demo@gmail.com', 'demo1234', 'demo', '9874564564', 'user'),
(774215, 'admin', 'admin', 'admin', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `productmodel`
--

CREATE TABLE `productmodel` (
  `id` int(11) NOT NULL,
  `productName` varchar(20) NOT NULL,
  `productModelNo` varchar(20) NOT NULL,
  `dateOfPurchase` date NOT NULL,
  `contactNumber` varchar(10) NOT NULL,
  `problemDescription` varchar(30) NOT NULL,
  `availableSlots` datetime DEFAULT NULL,
  `UserId` varchar(10) NOT NULL,
  `serviceCenterId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `productmodel`
--

INSERT INTO `productmodel` (`id`, `productName`, `productModelNo`, `dateOfPurchase`, `contactNumber`, `problemDescription`, `availableSlots`, `UserId`, `serviceCenterId`) VALUES
(8778, 'asd', 'asd', '2023-08-27', 'asd', 'asd', '2023-08-28 11:00:00', '546309', 3);

-- --------------------------------------------------------

--
-- Table structure for table `servicecentermodel`
--

CREATE TABLE `servicecentermodel` (
  `serviceCenterID` int(11) NOT NULL,
  `serviceCenterName` varchar(30) NOT NULL,
  `serviceCenterPhone` varchar(30) NOT NULL,
  `serviceCenterAddress` varchar(30) NOT NULL,
  `serviceCenterImageUrl` varchar(300) NOT NULL,
  `serviceCentermailId` varchar(30) NOT NULL,
  `serviceCenterCost` varchar(10) NOT NULL,
  `serviceCenterDescription` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `servicecentermodel`
--

INSERT INTO `servicecentermodel` (`serviceCenterID`, `serviceCenterName`, `serviceCenterPhone`, `serviceCenterAddress`, `serviceCenterImageUrl`, `serviceCentermailId`, `serviceCenterCost`, `serviceCenterDescription`) VALUES
(2, 'Short Lens Service', '9874561234', 'Vijayawada', 'https://images.pexels.com/photos/15127743/pexels-photo-15127743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'shortlens@gmail.com', '2000', 'any problem 1 solution'),
(3, 'Camera Service', '6578952121', 'guntur', 'https://images.pexels.com/photos/15127743/pexels-photo-15127743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'cameraservice@gmail.com', '1000', 'any problem 1 solution'),
(7, 'lens cleaning', '9874561234', 'banglore', 'https://images.pexels.com/photos/821642/pexels-photo-821642.jpeg', 'len@gmail.com', '3000', 'asdasdad'),
(14, 'CamRepairs', '9856471242', 'NewMumbai', 'https://media.gettyimages.com/id/1200888793/photo/technician-repairs-cctv-camera-on-the-table.jpg?s=612x612&w=0&k=20&c=d36Mn1vPIkyWgPRbPW252x4wYpEjSr-fK7Zc1k5jVM8=', 'camrs@gmail.com', '4000', 'asdasdasda');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `productmodel`
--
ALTER TABLE `productmodel`
  ADD PRIMARY KEY (`id`),
  ADD KEY `serviceCenterId` (`serviceCenterId`);

--
-- Indexes for table `servicecentermodel`
--
ALTER TABLE `servicecentermodel`
  ADD PRIMARY KEY (`serviceCenterID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=988100;

--
-- AUTO_INCREMENT for table `productmodel`
--
ALTER TABLE `productmodel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2147483648;

--
-- AUTO_INCREMENT for table `servicecentermodel`
--
ALTER TABLE `servicecentermodel`
  MODIFY `serviceCenterID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `productmodel`
--
ALTER TABLE `productmodel`
  ADD CONSTRAINT `productmodel_ibfk_1` FOREIGN KEY (`serviceCenterId`) REFERENCES `servicecentermodel` (`serviceCenterID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
