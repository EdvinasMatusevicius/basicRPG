# basicRPG
My first project made for first part of code academy full stack course.

exported mysql database:

--
-- Database: `game`
--

-- --------------------------------------------------------

--
-- Table structure for table `saves`
--

CREATE TABLE `saves` (
  `id` int(11) NOT NULL,
  `userName` mediumtext NOT NULL,
  `classType` tinytext NOT NULL,
  `health` int(6) NOT NULL,
  `maxHealth` int(6) NOT NULL,
  `strength` int(6) NOT NULL,
  `defence` int(6) NOT NULL,
  `agility` int(6) NOT NULL,
  `exp` int(7) NOT NULL,
  `lvl` int(4) NOT NULL,
  `coins` int(7) NOT NULL,
  `inventory` mediumtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `userName` tinytext NOT NULL,
  `psw` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `saves`
--
ALTER TABLE `saves`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `saves`
--
ALTER TABLE `saves`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
