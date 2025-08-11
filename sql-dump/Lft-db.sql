-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: note-app-db
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `categories_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`categories_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Personal'),(2,'Work'),(3,'Todo');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `note_categories`
--

DROP TABLE IF EXISTS `note_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `note_categories` (
  `note_id` int NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`note_id`,`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `note_categories`
--

LOCK TABLES `note_categories` WRITE;
/*!40000 ALTER TABLE `note_categories` DISABLE KEYS */;
INSERT INTO `note_categories` VALUES (19,1),(19,3),(23,1),(23,2),(24,1),(24,3),(25,2),(25,3),(26,1),(26,2),(27,1),(28,1),(28,3),(29,1),(30,2),(31,1),(31,3),(32,2),(33,1),(34,1),(34,3),(35,1);
/*!40000 ALTER TABLE `note_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notes`
--

DROP TABLE IF EXISTS `notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notes` (
  `note_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `title` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `content` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_completed` tinyint DEFAULT '0',
  PRIMARY KEY (`note_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notes`
--

LOCK TABLES `notes` WRITE;
/*!40000 ALTER TABLE `notes` DISABLE KEYS */;
INSERT INTO `notes` VALUES (24,2,'Premier League','Starts Aug 17','2025-08-10 10:17:41',NULL,1),(25,2,'Client Meeting','Discuss Requirements','2025-08-10 10:18:28',NULL,1),(27,4,'Client Meeting Today','This client note is designed to capture all essential and relevant information regarding interactions, meetings, or communications with a client. It serves as a comprehensive record that helps maintain continuity, track progress, and ensure that all team members are aligned on the client’s requirements, concerns, and next steps.','2025-08-10 11:52:56','2025-08-10 15:14:22',1),(30,5,'Client Meeting','Discuss Client Requirements and then address blockers encountered\n','2025-08-10 17:18:43','2025-08-10 17:19:13',1),(31,4,'Grocery List','I need to buy some groceries this week. I should get milk, eggs, and bread as the essentials. Also, I want to pick up some fresh apples and chicken breasts for dinner recipes. Don’t forget to buy rice to stock up for the week.','2025-08-11 01:40:55',NULL,0),(32,4,'Meeting Notes - Project Alpha','During the meeting, we discussed the overall project timeline and upcoming deadlines. Tasks were assigned to different team members based on their expertise. We reviewed the progress made in the last sprint and planned out the deliverables for the next phase. The next team meeting is scheduled for Friday at 2 PM.','2025-08-11 01:41:13',NULL,0),(33,4,'Book Recommendations','Here are some books I recommend for personal growth and programming. Atomic Habits by James Clear offers practical strategies for building good habits. Deep Work by Cal Newport explains how to focus deeply on important tasks. For developers, The Pragmatic Programmer and Clean Code provide essential insights into writing maintainable code.','2025-08-11 01:41:29',NULL,0),(34,4,'Ideas for Blog Posts','I have several ideas for upcoming blog posts. One idea is to write a guide on building a note-taking application from scratch. Another topic could be the benefits of meditation for improving productivity. I’m also considering writing a beginner’s guide to React.js, as well as a list of the top productivity tools in 2025.','2025-08-11 01:43:14',NULL,1),(35,4,' Travel Checklist for Nepal Trip','For my trip to Nepal, I need to prepare several essential items. These include my passport and visa documents, hiking shoes for trekking, and warm clothing for the cooler weather. I should pack my camera and extra batteries to capture memories, ensure I have travel insurance, bring some local currency, and carry a basic first aid kit for emergencies.','2025-08-11 01:50:08','2025-08-11 01:51:04',0);
/*!40000 ALTER TABLE `notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'testuser','test@example.com','$2b$10$YLUa44mQ9ps3vhBslBP1u.Ls3fUz82RlmF24k/Xfcu8XGsu6aLZI.'),(2,'SahilTuladhar','sailratna11@gmail.com','$2b$10$J9jxzzjhm8i55wDInDPuiuZlMmOShVcgGbsflJQoYlQVHGSDMyQ6m'),(3,'admin','admin@example.com','$2b$10$bVOevvQaggOS7k1Knxo6pONKNIIaZ.TSWzKX3PcO8rnoabiL3gzZO'),(4,'TestUser1','testuser1@gmail.com','$2b$10$8TiD9YadNmSF47uxrCNE9OMsZsS5ggTAWr7aNDqkW/GvUwhOPsGoi'),(5,'Test2','testuser2@gmail.com','$2b$10$hdw8I0aYB/K.t4br.gqmBulOKPiQ85m2pGv9VyYn.tTrL5GdKMcMe');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-11 20:57:15
