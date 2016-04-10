---                                                                                               
---Disclaimer: Submitted to Dublin City University, School of Computing for module CA675: Cloud   
---Technologies, 2016. We hereby certify that the work presented and the material contained       
---herein is our own except where explicitly stated references to other material are made.        
---                                                                                               
---Author, StudentId, Email                                                                       
---- John Segrave, 14212108, john.segravedaly2@mail.dcu.ie                                        
---- Paul O'Hara, 14212372, paul.ohara6@mail.dcu.ie                                               
---- Claire Breslin, 14210826, claire.breslin4@mail.dcu.ie                                        
---                                                                                               
---Code available online:                                                                         
---  https://github.com/oharapaGitHub/ca675assignment3backend                                     
---                                                                                               

-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ca675assignment3
-- ------------------------------------------------------
-- Server version	5.7.11-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clickdata`
--

DROP TABLE IF EXISTS `clickdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clickdata` (
  `clickDataId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'The primay key for the click data column',
  `pagetitle` longtext,
  `from` longtext,
  `fromCount` longtext,
  `to` longtext,
  `toCount` longtext,
  PRIMARY KEY (`clickDataId`),
  KEY `pageTitleIndex` (`pagetitle`(50)) USING BTREE COMMENT 'Index on the page title column, on which the read operations exist performed'
) ENGINE=InnoDB AUTO_INCREMENT=1412251 DEFAULT CHARSET=utf8 COMMENT='Holds the results of the map reduce task to process the click data into a format that can be displayed on screen to a user';
/*!40101 SET character_set_client = @saved_cs_client */;

