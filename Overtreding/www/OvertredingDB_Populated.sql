-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 22, 2015 at 02:03 PM
-- Server version: 5.6.21
-- PHP Version: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `OvertredingDB`
--

-- --------------------------------------------------------

--
-- Table structure for table `Alchohol`
--

CREATE TABLE IF NOT EXISTS `Alchohol` (
`id` int(11) NOT NULL,
  `intoxication` int(11) NOT NULL,
  `text_id_1` int(11) NOT NULL,
  `text_id_2` int(11) NOT NULL,
  `text_id_3` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `Alchohol`
--

INSERT INTO `Alchohol` (`id`, `intoxication`, `text_id_1`, `text_id_2`, `text_id_3`) VALUES
(1, 1, 18, 19, 22),
(2, 3, 23, 24, 25),
(3, 5, 26, 24, 25),
(4, 6, 27, 28, 25),
(5, 7, 29, 30, 25),
(6, 8, 29, 31, 32),
(7, 9, 33, 31, 34),
(8, 10, 35, 31, 36),
(9, 11, 33, 31, 37);

-- --------------------------------------------------------

--
-- Table structure for table `Drugs`
--

CREATE TABLE IF NOT EXISTS `Drugs` (
`id` int(11) NOT NULL,
  `blood_test` int(11) NOT NULL,
  `driver` int(11) NOT NULL,
  `text_id_1` int(11) NOT NULL,
  `text_id_2` int(11) NOT NULL,
  `text_id_3` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `Drugs`
--

INSERT INTO `Drugs` (`id`, `blood_test`, `driver`, `text_id_1`, `text_id_2`, `text_id_3`) VALUES
(1, 0, 0, 33, 31, 32),
(2, 1, 0, 33, 31, 32);

-- --------------------------------------------------------

--
-- Table structure for table `Other`
--

CREATE TABLE IF NOT EXISTS `Other` (
`id` int(11) NOT NULL,
  `description` text COLLATE utf8_bin NOT NULL,
  `license` tinyint(1) NOT NULL,
  `text_id_1` int(11) NOT NULL,
  `text_id_2` int(11) NOT NULL,
  `text_id_3` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `Other_Tags`
--

CREATE TABLE IF NOT EXISTS `Other_Tags` (
  `tag_name` varchar(30) COLLATE utf8_bin NOT NULL,
  `offense_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `Speed`
--

CREATE TABLE IF NOT EXISTS `Speed` (
`id` int(11) NOT NULL,
  `exceed` int(11) NOT NULL,
  `road` tinyint(1) NOT NULL,
  `text_id_1` int(11) NOT NULL,
  `text_id_2` int(11) NOT NULL,
  `text_id_3` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `Speed`
--

INSERT INTO `Speed` (`id`, `exceed`, `road`, `text_id_1`, `text_id_2`, `text_id_3`) VALUES
(1, 0, 0, 1, 2, 3),
(2, 0, 1, 1, 2, 3),
(3, 1, 0, 4, 5, 3),
(4, 1, 1, 6, 7, 3),
(5, 2, 0, 8, 5, 3),
(6, 2, 1, 12, 7, 3),
(7, 3, 0, 13, 15, 16),
(8, 3, 1, 14, 7, 3),
(9, 4, 0, 13, 15, 16),
(10, 4, 1, 17, 15, 16);

-- --------------------------------------------------------

--
-- Table structure for table `Texts`
--

CREATE TABLE IF NOT EXISTS `Texts` (
`id` int(11) NOT NULL,
  `body` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `Texts`
--

INSERT INTO `Texts` (`id`, `body`) VALUES
(1, 'Uw rijbewijs kan niet onmiddellijk worden ingetrokken. U ontvangt een onmiddellijke inning van 50 EUR.'),
(2, 'Wanneer de onmiddellijke inning niet wordt betaald, ontvangt u een minnelijke schikking van 60 EUR.'),
(3, 'Wanneer ook de minnelijke schikking niet wordt betaald, ontvangt u een bevel tot betalen of een dagvaarding voor het gerecht. Ontvangt u een bevel tot betalen dan moet u binnen de 45 dagen betalen. Gaat u niet akkoord met het bevel, dan moet u binnen de 30 dagen bezwaar instellen. Werd geen bezwaar ingesteld en niet (tijdig) betaald, dan kan het bedrag worden afgehouden van de belastingen. Wordt u gedagvaard voor de rechtbank, dan bedraagt de boete #TOTALAMOUNT1#. Deze geldboetes worden verdubbeld wanneer u minder dan 3 jaar eerder reeds voor gelijkaardige feiten werd veroordeeld. Bedraagt de boete meer dan #TOTALAMOUNT2#, dan betaalt u bovendien een bijdrage aan het Slachtofferfonds van #TOTALAMOUNT2#. De rechter kan geen verval van het recht tot sturen uitspreken.  Opmerking: als u wordt veroordeeld voor overdreven snelheid Ã©n een ongeval met gekwetsten, dan moet een rijverbod van minstens 3 maanden worden uitgesproken'),
(4, 'Uw rijbewijs kan niet onmiddellijk worden ingetrokken. U ontvangt een onmiddellijke inning van #TOTALAMOUNT3#.'),
(5, 'Wanneer de onmiddellijke inning niet wordt betaald, ontvangt u een minnelijke schikking van #TOTALAMOUNT4#.'),
(6, 'Uw rijbewijs kan niet onmiddellijk worden ingetrokken. U ontvangt een onmiddellijke inning van #TOTALAMOUNT5#.'),
(7, 'Wanneer de onmiddellijke inning niet wordt betaald, ontvangt u een minnelijke schikking van #TOTALAMOUNT6#.'),
(8, 'Uw rijbewijs kan wel onmiddellijk worden ingetrokken. U ontvangt een onmiddellijke inning van #TOTALAMOUNT3#. Werd de overtreding begaan met een bus, een autocar of een vrachtwagen, of bij slechte weersomstandigheden, dan komt u in principe niet in aanmerking voor een onmiddellijke inning. De politiediensten moeten contact opnemen met de procureur, die in se uw rijbewijs moet intrekken.'),
(9, 'Heeft u uw rijbewijs minder dan 2 jaar op het ogenblik van de overtreding, dan kan uw rijbewijs onmiddellijk worden ingetrokken. U komt niet in aanmerking voor een onmiddellijke inning of minnelijke schikking. In principe wordt u sowieso gedagvaard voor de politierechtbank. Bovendien is de rechter verplicht u een rijverbod van minstens 8 dagen op te leggen. Bovendien dient u te kiezen of u uw praktisch of uw theoretisch examen opnieuw wenst af te leggen.'),
(10, 'U komt niet in aanmerking voor een onmiddellijke inning.'),
(11, 'U komt niet in aanmerking voor een minnelijke schikking.'),
(12, 'Uw rijbewijs kan niet onmiddellijk worden ingetrokken, tenzij de overtreding werd  begaan bij slechte weersomstandigheden. U ontvangt een onmiddellijke inning van #TOTALAMOUNT5#. Werd de overtreding begaan met een bus, een autocar of een vrachtwagen, of bij slechte weersomstandigheden, dan komt u in principe niet in aanmerking voor een onmiddellijke inning. De politiediensten moeten contact opnemen met de procureur, die in se uw rijbewijs moet intrekken.'),
(13, 'Uw rijbewijs kan wel onmiddellijk worden ingetrokken. U komt niet in aanmerking voor een onmiddellijke inning, tenzij u niet bent ingeschreven in BelgiÃ«.'),
(14, 'Uw rijbewijs kan wel onmiddellijk worden ingetrokken. U ontvangt een onmiddellijke inning van #TOTALAMOUNT5#.'),
(15, 'In principe komt u niet in aanmerking voor een minnelijke schikking, tenzij u niet bent ingeschreven in BelgiÃ«.'),
(16, 'Normaal gezien wordt u gedagvaard voor de rechtbank. In dat geval bedraagt de boete #TOTALAMOUNT1#. Deze geldboetes worden verdubbeld wanneer u minder dan 3 jaar eerder reeds voor gelijkaardige feiten werd veroordeeld. Bedraagt de boete meer dan #TOTALAMOUNT2#, dan betaalt u bovendien een bijdrage aan het Slachtofferfonds van #TOTALAMOUNT2#. De rechter moet een verval van het recht tot sturen uitspreken, tenzij hij de beslissing uitdrukkelijk motiveert. Opmerking: als u wordt veroordeeld voor overdreven snelheid Ã©n een ongeval met gekwetsten, dan moet een rijverbod van minstens 3 maanden worden uitgesproken'),
(17, 'Uw rijbewijs kan wel onmiddellijk worden ingetrokken. In principe komt u niet in aanmerking voor een onmiddellijke inning.'),
(18, 'U ontvangt een onmiddellijke inning van 170 EUR, tenzij u een ongeval hebt veroorzaakt. De politie kan u een tijdelijk rijverbod opleggen van 3 uur.'),
(19, 'Wanneer de onmiddellijke inning niet wordt betaald, ontvangt u een minnelijke schikking van 170 EUR wanneer een bloedanalyse werd uitgevoerd of 200 EUR wanneer een ademanalyse werd uitgevoerd.'),
(20, 'U ontvangt een onmiddellijke inning van 100 EUR. De politie kan u een tijdelijk rijverbod opleggen van 2 uur.'),
(21, 'Wanneer de onmiddellijke inning niet wordt betaald, ontvangt u een minnelijke schikking van 110 EUR.'),
(22, 'Wanneer ook de minnelijke schikking niet wordt betaald, ontvangt u een bevel tot betalen of een dagvaarding voor het gerecht. Ontvangt u een bevel tot betalen dan moet u binnen de 45 dagen betalen. Gaat u niet akkoord met het bevel, dan moet u binnen de 30 dagen bezwaar instellen. Werd geen bezwaar ingesteld en niet (tijdig) betaald, dan kan het bedrag worden afgehouden van de belastingen. Wordt u gedagvaard voor de rechtbank, dan bedraagt de boete #TOTALAMOUNT7#. Bedraagt de boete meer dan #TOTALAMOUNT2#, dan betaalt u bovendien een bijdrage aan het Slachtofferfonds van #TOTALAMOUNT2#. De rechter kan verval van het recht tot sturen van minimaal 8 dagen uitspreken.'),
(23, 'U ontvangt een onmiddellijke inning van 400 EUR, tenzij u een ongeval hebt veroorzaakt. De politie kan u een tijdelijk rijverbod opleggen van 6 uur.'),
(24, 'Wanneer de onmiddellijke inning niet wordt betaald, ontvangt u een minnelijke schikking tot 600 EUR, tenzij bij verkeersonveilig gedrag, een ongeval of dronkenschap. Uw rijbewijs kan door het parket worden ingetrokken voor een duur van minimaal 15 dagen.'),
(25, 'Wanneer ook de minnelijke schikking niet wordt betaald, ontvangt u een bevel tot betalen of een dagvaarding voor het gerecht. Ontvangt u een bevel tot betalen dan moet u binnen de 45 dagen betalen. Gaat u niet akkoord met het bevel, dan moet u binnen de 30 dagen bezwaar instellen. Werd geen bezwaar ingesteld en niet (tijdig) betaald, dan kan het bedrag worden afgehouden van de belastingen. Wordt u gedagvaard voor de rechtbank, dan bedraagt de boete #TOTALAMOUNT8#. Bedraagt de boete meer dan #TOTALAMOUNT2#, dan betaalt u bovendien een bijdrage aan het Slachtofferfonds van #TOTALAMOUNT2#. De rechter kan verval van het recht tot sturen van minimaal 8 dagen uitspreken.'),
(26, 'U ontvangt een onmiddellijke inning van 550 EUR, tenzij u een ongeval hebt veroorzaakt. De politie kan u een tijdelijk rijverbod opleggen van 6 uur.'),
(27, 'U komt niet in aanmerking voor een onmiddellijke inning, tenzij u geen vaste woonplaats heeft in BelgiÃ«. De politie kan u een tijdelijk rijverbod opleggen van 6 uur.'),
(28, 'U ontvangt een minnelijke schikking van 1200 EUR. Uw rijbewijs kan door het parket worden ingetrokken voor een duur van minimaal 15 dagen.'),
(29, 'U komt niet in aanmerking voor onmiddellijke inning. De politie kan u een tijdelijk rijverbod opleggen van 6 uur.'),
(30, 'U komt niet in aanmerking voor een minnelijke schikking, maar dient u wel een som van 1200 EUR in consignatie te geven. Uw rijbewijs kan door het parket worden ingetrokken voor een duur van minimaal 15 dagen.'),
(31, 'In principe komt u niet in aanmerking voor een minnelijke schikking. Uw rijbewijs kan door het parket worden ingetrokken voor een duur van minimaal 15 dagen.'),
(32, 'Omdat u principieel niet in aanmerking komt voor een minnelijke schikking, ontvangt u een bevel tot betalen of een dagvaarding voor het gerecht. Ontvangt u een bevel tot betalen dan moet u binnen de 45 dagen betalen.  Gaat u niet akkoord met het bevel, dan moet u binnen de 30 dagen bezwaar instellen. Werd geen bezwaar ingesteld en niet (tijdig) betaald, dan kan het bedrag worden afgehouden van de belastingen. Wordt u gedagvaard voor de rechtbank, dan bedraagt de boete #TOTALAMOUNT8#. Bedraagt de boete meer dan #TOTALAMOUNT2#, dan betaalt u bovendien een bijdrage aan het Slachtofferfonds van #TOTALAMOUNT2#. De rechter kan verval van het recht tot sturen van minimaal 8 dagen uitspreken.'),
(33, 'U komt in principe niet in aanmerking voor een onmiddellijke inning. De politie kan u een tijdelijk rijverbod opleggen van 12 uur.'),
(34, 'Omdat u principieel niet in aanmerking komt voor een minnelijke schikking, ontvangt u een bevel tot betalen of een dagvaarding voor het gerecht. Ontvangt u een bevel tot betalen dan moet u binnen de 45 dagen betalen. Gaat u niet akkoord met het bevel, dan moet u binnen de 30 dagen bezwaar instellen. Werd geen bezwaar ingesteld en niet (tijdig) betaald, dan kan het bedrag worden afgehouden van de belastingen. Wordt u gedagvaard voor de rechtbank, dan bedraagt de boete #TOTALAMOUNT8#. Bedraagt de boete meer dan #TOTALAMOUNT2#, dan betaalt u bovendien een bijdrage aan het Slachtofferfonds van #TOTALAMOUNT2#. De rechter moet verval van het recht tot sturen van minimaal 1 maand uitspreken.'),
(35, 'U komt in principe niet in aanmerking voor een onmiddellijke inning. De politie kan u een tijdelijk rijverbod opleggen van 6 uur.'),
(36, 'Omdat u principieel niet in aanmerking komt voor een minnelijke schikking, ontvangt u een bevel tot betalen of een dagvaarding voor het gerecht. Ontvangt u een bevel tot betalen dan moet u binnen de 45 dagen betalen. Gaat u niet akkoord met het bevel, dan moet u binnen de 30 dagen bezwaar instellen. Werd geen bezwaar ingesteld en niet (tijdig) betaald, dan kan het bedrag worden afgehouden van de belastingen. Wordt u gedagvaard voor de rechtbank, dan bedraagt de boete #TOTALAMOUNT9#. Bedraagt de boete meer dan #TOTALAMOUNT2#, dan betaalt u bovendien een bijdrage aan het Slachtofferfonds van #TOTALAMOUNT2#. De rechter moet verval van het recht tot sturen van minimaal 3 maand uitspreken.'),
(37, 'Omdat u principieel niet in aanmerking komt voor een minnelijke schikking, ontvangt u een bevel tot betalen of een dagvaarding voor het gerecht. Ontvangt u een bevel tot betalen dan moet u binnen de 45 dagen betalen. Gaat u niet akkoord met het bevel, dan moet u binnen de 30 dagen bezwaar instellen. Werd geen bezwaar ingesteld en niet (tijdig) betaald, dan kan het bedrag worden afgehouden van de belastingen. Wordt u gedagvaard voor de rechtbank, dan bedraagt de boete #TOTALAMOUNT10#. Bedraagt de boete meer dan #TOTALAMOUNT2#, dan betaalt u bovendien een bijdrage aan het Slachtofferfonds van #TOTALAMOUNT2#. De rechter moet verval van het recht tot sturen van minimaal 6 maand uitspreken.'),
(38, 'U ontvangt een onmiddellijke inning van 55 EUR. Uw rijbewijs kan niet onmiddellijk worden ingetrokken'),
(39, 'U ontvangt een onmiddellijke inning van 110 EUR. Uw rijbewijs kan wel onmiddellijk worden ingetrokken, wanneer u een gevaar voor andere weggebruikers inhoudt.'),
(40, 'U ontvangt een onmiddellijke inning van 165 EUR. Uw rijbewijs kan wel onmiddellijk worden ingetrokken, wanneer u een gevaar voor andere weggebruikers inhoudt.'),
(41, 'U komt niet in aanmerking voor een onmiddellijke inning, tenzij u niet bent ingeschreven in BelgiÃ«. In dat geval ontvangt u een onmiddellijke inning van 450 EUR. Uw rijbewijs kan wel onmiddellijk worden ingetrokken.'),
(42, 'Wanneer de onmiddellijke inning niet wordt betaald, ontvangt u een minnelijke schikking van 65 EUR'),
(43, 'Wanneer de onmiddellijke inning niet wordt betaald, ontvangt u een minnelijke schikking van 120 EUR'),
(44, 'Wanneer de onmiddellijke inning niet wordt betaald, ontvangt u een minnelijke schikking van 175 EUR'),
(45, 'U komt in principe niet in aanmerking voor een onmiddellijke inning, tenzij u niet bent ingeschreven in BelgiÃ«. In dat geval ontvangt u een onmiddellijke inning van 450 EUR.'),
(46, 'Wanneer ook de minnelijke schikking niet wordt betaald, ontvangt u een bevel tot betalen of een dagvaarding voor het gerecht. Ontvangt u een bevel tot betalen dan moet u binnen de 45 dagen betalen. Gaat u niet akkoord met het bevel, dan moet u binnen de 30 dagen bezwaar instellen. Werd geen bezwaar ingesteld en niet (tijdig) betaald, dan kan het bedrag worden afgehouden van de belastingen. Wordt u gedagvaard voor de rechtbank, dan bedraagt de boete #TOTALAMOUNT11#. Deze geldboetes worden verdubbeld wanneer u minder dan 3 jaar eerder reeds voor gelijkaardige feiten werd veroordeeld. Bedraagt de boete meer dan #TOTALAMOUNT2#, dan betaalt u bovendien een bijdrage aan het Slachtofferfonds van #TOTALAMOUNT2#. De rechter kan geen verval van het recht tot sturen uitspreken'),
(47, 'Wanneer ook de minnelijke schikking niet wordt betaald, ontvangt u een bevel tot betalen of een dagvaarding voor het gerecht. Ontvangt u een bevel tot betalen dan moet u binnen de 45 dagen betalen. Gaat u niet akkoord met het bevel, dan moet u binnen de 30 dagen bezwaar instellen. Werd geen bezwaar ingesteld en niet (tijdig) betaald, dan kan het bedrag worden afgehouden van de belastingen. - Wordt u gedagvaard voor de rechtbank, dan bedraagt de boete #TOTALAMOUNT12#. Deze geldboetes worden verdubbeld wanneer u minder dan 3 jaar eerder reeds voor gelijkaardige feiten werd veroordeeld. Bedraagt de boete meer dan #TOTALAMOUNT2#, dan betaalt u bovendien een bijdrage aan het Slachtofferfonds van #TOTALAMOUNT2#. De rechter kan wel een verval van het recht tot sturen uitspreken'),
(48, 'Wanneer ook de minnelijke schikking niet wordt betaald, ontvangt u een bevel tot betalen of een dagvaarding voor het gerecht. Ontvangt u een bevel tot betalen dan moet u binnen de 45 dagen betalen. Gaat u niet akkoord met het bevel, dan moet u binnen de 30 dagen bezwaar instellen. Werd geen bezwaar ingesteld en niet (tijdig) betaald, dan kan het bedrag worden afgehouden van de belastingen. Wordt u gedagvaard voor de rechtbank, dan bedraagt de boete #TOTALAMOUNT13#. Deze geldboetes worden verdubbeld wanneer u minder dan 3 jaar eerder reeds voor gelijkaardige feiten werd veroordeeld. Bedraagt de boete meer dan #TOTALAMOUNT2#, dan betaalt u bovendien een bijdrage aan het Slachtofferfonds van #TOTALAMOUNT2#. De rechter kan wel een verval van het recht tot sturen uitspreken.'),
(49, 'Wanneer ook de minnelijke schikking niet wordt betaald, ontvangt u een bevel tot betalen of een dagvaarding voor het gerecht. Ontvangt u een bevel tot betalen dan moet u binnen de 45 dagen betalen. Gaat u niet akkoord met het bevel, dan moet u binnen de 30 dagen bezwaar instellen. Werd geen bezwaar ingesteld en niet (tijdig) betaald, dan kan het bedrag worden afgehouden van de belastingen. Wordt u gedagvaard voor de rechtbank, dan bedraagt de boete #TOTALAMOUNT14#. Deze geldboetes worden verdubbeld wanneer u minder dan 3 jaar eerder reeds voor gelijkaardige feiten werd veroordeeld. Bedraagt de boete meer dan #TOTALAMOUNT2#, dan betaalt u bovendien een bijdrage aan het Slachtofferfonds van #TOTALAMOUNT2#. De rechter kan wel een verval van het recht tot sturen uitspreken.'),
(50, 'Uw rijbewijs kan wel onmiddellijk worden ingetrokken. U komt niet in aanmerking voor een onmiddellijke inning.'),
(51, 'Uw rijbewijs kan wel onmiddellijk worden ingetrokken. U komt niet in aanmerking voor een minnelijke schikking.'),
(52, 'Omdat u principieel niet in aanmerking komt voor een minnelijke schikking, ontvangt u een bevel tot betalen of een dagvaarding voor het gerecht. Ontvangt u een bevel tot betalen dan moet u binnen de 45 dagen betalen. Gaat u niet akkoord met het bevel, dan moet u binnen de 30 dagen bezwaar instellen. Werd geen bezwaar ingesteld en niet (tijdig) betaald, dan kan het bedrag worden afgehouden van de belastingen. Wordt u gedagvaard voor de rechtbank, dan bedraagt de boete #TOTALAMOUNT15#. De rechtbank kan u ook een gevangenisstraf van 15 dagen tot 3 maanden opleggen. Deze straffen worden verdubbeld bij herhaling binnen de 3 jaar. Bedraagt de boete meer dan #TOTALAMOUNT2#, dan betaalt u bovendien een bijdrage aan het Slachtofferfonds van #TOTALAMOUNT2#. De rechter kan verval van het recht tot sturen van minimaal 8 dagen uitspreken (bij een ongeval met gewonden is een rijverbod van minstens 3 maanden verplicht). De verklikker wordt verbeurd verklaard en vernietigd.'),
(53, 'Omdat u principieel niet in aanmerking komt voor een minnelijke schikking, ontvangt u een bevel tot betalen of een dagvaarding voor het gerecht. Ontvangt u een bevel tot betalen dan moet u binnen de 45 dagen betalen. Gaat u niet akkoord met het bevel, dan moet u binnen de 30 dagen bezwaar instellen. Werd geen bezwaar ingesteld en niet (tijdig) betaald, dan kan het bedrag worden afgehouden van de belastingen. Wordt u gedagvaard voor de rechtbank, dan bedraagt de boete #TOTALAMOUNT16#. De rechtbank kan u ook een gevangenisstraf van 15 dagen tot 6 maanden opleggen. Deze straffen worden verdubbeld bij herhaling binnen de 3 jaar. Bedraagt de boete meer dan #TOTALAMOUNT2#, dan betaalt u bovendien een bijdrage aan het Slachtofferfonds van #TOTALAMOUNT2#. De rechter kan geen verval van het recht tot sturen uitspreken.'),
(54, 'U ontvangt een minnelijke schikking van 990 EUR.'),
(55, 'Wanneer ook de minnelijke schikking niet wordt betaald, ontvangt u een bevel tot betalen of een dagvaarding voor het gerecht. Ontvangt u een bevel tot betalen dan moet u binnen de 45 dagen betalen. Gaat u niet akkoord met het bevel, dan moet u binnen de 30 dagen bezwaar instellen. Werd geen bezwaar ingesteld en niet (tijdig) betaald, dan kan het bedrag worden afgehouden van de belastingen. Wordt u gedagvaard voor de rechtbank, dan bedraagt de boete #TOTALAMOUNT17#. Bovendien kan de rechtbank een gevangenisstraf van 8 dagen tot 3 maanden opleggen. Bedraagt de boete meer dan #TOTALAMOUNT2#, dan betaalt u bovendien een bijdrage aan het Slachtofferfonds van #TOTALAMOUNT2#. De rechtbank kan de overtreder bovendien verbieden voertuigen te verkopen of verhuren in BelgiÃ«. De opgelegde straf wordt verdubbeld bij herhaling binnen de 2 jaar.'),
(56, 'U ontvangt een minnelijke schikking van 55 EUR.'),
(57, 'U ontvangt een minnelijke schikking van 1980 EUR.'),
(58, 'U komt niet in aanmerking voor een onmiddellijke inning. Het voertuig kan in beslag genomen/geÃ¯mmobiliseerd worden.'),
(59, 'In principe komt u niet in aanmerking voor een minnelijke schikking. Uw rijbewijs kan wel onmiddellijk worden ingetrokken.'),
(60, 'Wanneer ook de minnelijke schikking niet wordt betaald, ontvangt u een bevel tot betalen of een dagvaarding voor het gerecht. Ontvangt u een bevel tot betalen dan moet u binnen de 45 dagen betalen. Gaat u niet akkoord met het bevel, dan moet u binnen de 30 dagen bezwaar instellen. Werd geen bezwaar ingesteld en niet (tijdig) betaald, dan kan het bedrag worden afgehouden van de belastingen. Wordt u gedagvaard voor de rechtbank, dan bedraagt de boete #TOTALAMOUNT18#. De rechtbank kan ook een gevangenisstraf van 8 dagen tot 6 maanden opleggen. Bedraagt de boete meer dan #TOTALAMOUNT2#, dan betaalt u bovendien een bijdrage aan het Slachtofferfonds van #TOTALAMOUNT2#. De rechter kan verval van het recht tot sturen van minimaal 8 dagen uitspreken.'),
(61, 'U krijgt een PV van waarschuwing'),
(62, 'Wanneer u het verzekeringsbewijs niet toont, kan u een minnelijke schikking worden voorgesteld. '),
(63, 'Wanneer ook de minnelijke schikking niet wordt betaald, ontvangt u een bevel tot betalen of een dagvaarding voor het gerecht. Ontvangt u een bevel tot betalen dan moet u binnen de 45 dagen betalen. Gaat u niet akkoord met het bevel, dan moet u binnen de 30 dagen bezwaar instellen. Werd geen bezwaar ingesteld en niet (tijdig) betaald, dan kan het bedrag worden afgehouden van de belastingen. Wordt u gedagvaard voor de rechtbank, dan bedraagt de boete #TOTALAMOUNT11#. Bedraagt de boete meer dan #TOTALAMOUNT2#, dan betaalt u bovendien een bijdrage aan het Slachtofferfonds van #TOTALAMOUNT2#.'),
(64, 'In principe komt u niet in aanmerking voor een minnelijke schikking. Uw rijbewijs kan niet worden ingetrokken (tenzij u geÃ¯ntoxiceerd of dronken was).'),
(65, 'In principe komt u niet in aanmerking voor een minnelijke schikking'),
(66, 'Wanneer ook de minnelijke schikking niet wordt betaald, ontvangt u een bevel tot betalen of een dagvaarding voor het gerecht. Ontvangt u een bevel tot betalen dan moet u binnen de 45 dagen betalen. Gaat u niet akkoord met het bevel, dan moet u binnen de 30 dagen bezwaar instellen. Werd geen bezwaar ingesteld en niet (tijdig) betaald, dan kan het bedrag worden afgehouden van de belastingen. Wordt u gedagvaard voor de rechtbank, dan bedraagt de boete #TOTALAMOUNT8#. De rechtbank kan ook een gevangenisstraf van 15 dagen tot 6 maanden opleggen. Bedraagt de boete meer dan #TOTALAMOUNT2#, dan betaalt u bovendien een bijdrage aan het Slachtofferfonds van #TOTALAMOUNT2#. De rechter kan verval van het recht tot sturen van minimaal 8 dagen uitspreken.'),
(67, 'Wanneer ook de minnelijke schikking niet wordt betaald, ontvangt u een bevel tot betalen of een dagvaarding voor het gerecht. Ontvangt u een bevel tot betalen dan moet u binnen de 45 dagen betalen. Gaat u niet akkoord met het bevel, dan moet u binnen de 30 dagen bezwaar instellen. Werd geen bezwaar ingesteld en niet (tijdig) betaald, dan kan het bedrag worden afgehouden van de belastingen. Wordt u gedagvaard voor de rechtbank, dan bedraagt de boete #TOTALAMOUNT19#. De rechtbank kan ook een gevangenisstraf van 15 dagen tot 2 jaar opleggen. Bedraagt de boete meer dan #TOTALAMOUNT2#, dan betaalt u bovendien een bijdrage aan het Slachtofferfonds van #TOTALAMOUNT2#. De rechter moet verval van het recht tot sturen van minimaal 3 maand uitspreken en minstens een praktische, theoretische en psychologische proef opleggen.'),
(68, 'Wanneer ook de minnelijke schikking niet wordt betaald, ontvangt u een bevel tot betalen of een dagvaarding voor het gerecht. Ontvangt u een bevel tot betalen dan moet u binnen de 45 dagen betalen. Gaat u niet akkoord met het bevel, dan moet u binnen de 30 dagen bezwaar instellen. Werd geen bezwaar ingesteld en niet (tijdig) betaald, dan kan het bedrag worden afgehouden van de belastingen. Wordt u gedagvaard voor de rechtbank, dan bedraagt de boete #TOTALAMOUNT8#. De rechtbank kan ook een gevangenisstraf van 15 dagen tot 2 jaar opleggen. Bedraagt de boete meer dan #TOTALAMOUNT2#, dan betaalt u bovendien een bijdrage aan het Slachtofferfonds van #TOTALAMOUNT2#. De rechter kan verval van het recht tot sturen van minimaal 8 dagen uitspreken.'),
(69, 'Wanneer ook de minnelijke schikking niet wordt betaald, ontvangt u een bevel tot betalen of een dagvaarding voor het gerecht. Ontvangt u een bevel tot betalen dan moet u binnen de 45 dagen betalen. Gaat u niet akkoord met het bevel, dan moet u binnen de 30 dagen bezwaar instellen.  Werd geen bezwaar ingesteld en niet (tijdig) betaald, dan kan het bedrag worden afgehouden van de belastingen. Wordt u gedagvaard voor de rechtbank, dan bedraagt de boete #TOTALAMOUNT20#.  De rechtbank kan ook een gevangenisstraf van 15 dagen tot 2 jaar opleggen. Bedraagt de boete meer dan #TOTALAMOUNT2#, dan betaalt u bovendien een bijdrage aan het Slachtofferfonds van #TOTALAMOUNT2#. De rechter kan geen verval van het recht tot sturen uitspreken.'),
(70, 'Wanneer ook de minnelijke schikking niet wordt betaald, ontvangt u een bevel tot betalen of een dagvaarding voor het gerecht. Ontvangt u een bevel tot betalen dan moet u binnen de 45 dagen betalen. Gaat u niet akkoord met het bevel, dan moet u binnen de 30 dagen bezwaar instellen. Werd geen bezwaar ingesteld en niet (tijdig) betaald, dan kan het bedrag worden afgehouden van de belastingen. Wordt u gedagvaard voor de rechtbank, dan bedraagt de boete #TOTALAMOUNT8#. De rechtbank kan ook een gevangenisstraf van 3 maanden tot 2 jaar opleggen. Bedraagt de boete meer dan #TOTALAMOUNT2#, dan betaalt u bovendien een bijdrage aan het Slachtofferfonds van #TOTALAMOUNT2#. De rechter moet verval van het recht tot sturen van minimaal 3 maand uitspreken.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Alchohol`
--
ALTER TABLE `Alchohol`
 ADD PRIMARY KEY (`id`), ADD KEY `text_id_1` (`text_id_1`), ADD KEY `text_id_2` (`text_id_2`), ADD KEY `text_id_3` (`text_id_3`);

--
-- Indexes for table `Drugs`
--
ALTER TABLE `Drugs`
 ADD PRIMARY KEY (`id`), ADD KEY `text_id_1` (`text_id_1`), ADD KEY `text_id_2` (`text_id_2`), ADD KEY `text_id_3` (`text_id_3`);

--
-- Indexes for table `Other`
--
ALTER TABLE `Other`
 ADD PRIMARY KEY (`id`), ADD KEY `text_id_1` (`text_id_1`), ADD KEY `text_id_2` (`text_id_2`), ADD KEY `text_id_3` (`text_id_3`);

--
-- Indexes for table `Other_Tags`
--
ALTER TABLE `Other_Tags`
 ADD PRIMARY KEY (`tag_name`);

--
-- Indexes for table `Speed`
--
ALTER TABLE `Speed`
 ADD PRIMARY KEY (`id`), ADD KEY `text_id_1` (`text_id_1`), ADD KEY `text_id_2` (`text_id_2`), ADD KEY `text_id_3` (`text_id_3`);

--
-- Indexes for table `Texts`
--
ALTER TABLE `Texts`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Alchohol`
--
ALTER TABLE `Alchohol`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `Drugs`
--
ALTER TABLE `Drugs`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `Other`
--
ALTER TABLE `Other`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Speed`
--
ALTER TABLE `Speed`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `Texts`
--
ALTER TABLE `Texts`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=71;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
