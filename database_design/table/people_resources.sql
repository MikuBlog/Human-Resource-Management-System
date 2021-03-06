USE [master]
GO
/****** Object:  Database [people_resoures]    Script Date: 2019/1/23 19:48:50 ******/
CREATE DATABASE [people_resoures]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'people_resoures', FILENAME = N'G:\SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\people_resoures.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'people_resoures_log', FILENAME = N'G:\SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\people_resoures_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [people_resoures] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [people_resoures].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [people_resoures] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [people_resoures] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [people_resoures] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [people_resoures] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [people_resoures] SET ARITHABORT OFF 
GO
ALTER DATABASE [people_resoures] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [people_resoures] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [people_resoures] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [people_resoures] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [people_resoures] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [people_resoures] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [people_resoures] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [people_resoures] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [people_resoures] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [people_resoures] SET  DISABLE_BROKER 
GO
ALTER DATABASE [people_resoures] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [people_resoures] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [people_resoures] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [people_resoures] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [people_resoures] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [people_resoures] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [people_resoures] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [people_resoures] SET RECOVERY FULL 
GO
ALTER DATABASE [people_resoures] SET  MULTI_USER 
GO
ALTER DATABASE [people_resoures] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [people_resoures] SET DB_CHAINING OFF 
GO
ALTER DATABASE [people_resoures] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [people_resoures] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [people_resoures] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'people_resoures', N'ON'
GO
ALTER DATABASE [people_resoures] SET QUERY_STORE = OFF
GO
USE [people_resoures]
GO
/****** Object:  Table [dbo].[address]    Script Date: 2019/1/23 19:48:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[address](
	[fileNo] [varchar](12) NOT NULL,
	[address] [varchar](50) NULL,
	[code] [varchar](10) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[experience]    Script Date: 2019/1/23 19:48:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[experience](
	[fileNo] [varchar](12) NOT NULL,
	[resume] [varchar](1000) NULL,
	[homemessage] [varchar](1000) NULL,
	[remark] [varchar](1000) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[grant_money]    Script Date: 2019/1/23 19:48:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[grant_money](
	[grantNo] [varchar](12) NOT NULL,
	[first] [varchar](20) NOT NULL,
	[second] [varchar](20) NOT NULL,
	[third] [varchar](20) NOT NULL,
	[people] [int] NULL,
	[sumary] [money] NULL,
	[status] [varchar](20) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[job]    Script Date: 2019/1/23 19:48:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[job](
	[fileNo] [varchar](12) NOT NULL,
	[jobtype] [varchar](20) NULL,
	[jobname] [varchar](20) NULL,
	[jobsay] [varchar](20) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[manager]    Script Date: 2019/1/23 19:48:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[manager](
	[name] [varchar](50) NOT NULL,
	[loginName] [varchar](20) NOT NULL,
	[password] [varchar](20) NOT NULL,
	[role] [int] NOT NULL,
	[roleName] [varchar](10) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[mechanism]    Script Date: 2019/1/23 19:48:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[mechanism](
	[fileNo] [varchar](12) NOT NULL,
	[first] [varchar](10) NULL,
	[second] [varchar](10) NULL,
	[third] [varchar](10) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[opinion]    Script Date: 2019/1/23 19:48:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[opinion](
	[standardNo] [varchar](12) NOT NULL,
	[opinion] [varchar](1000) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[salary]    Script Date: 2019/1/23 19:48:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[salary](
	[fileNo] [varchar](12) NOT NULL,
	[standard] [varchar](12) NOT NULL,
	[openingbank] [varchar](10) NULL,
	[account] [varchar](20) NULL,
	[loginman] [varchar](10) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[standard]    Script Date: 2019/1/23 19:48:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[standard](
	[standardNo] [varchar](12) NOT NULL,
	[loginname] [varchar](100) NOT NULL,
	[logintime] [datetime] NULL,
	[standardtotal] [money] NOT NULL,
	[fileNo] [varchar](12) NOT NULL,
	[status] [varchar](100) NOT NULL,
	[standardname] [varchar](100) NULL,
	[grantNo] [varchar](12) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[standard_items]    Script Date: 2019/1/23 19:48:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[standard_items](
	[standardNo] [varchar](12) NOT NULL,
	[basic] [money] NOT NULL,
	[traffic] [money] NOT NULL,
	[lunch] [money] NOT NULL,
	[communication] [money] NOT NULL,
	[pension] [money] NOT NULL,
	[unemployment] [money] NOT NULL,
	[medical] [money] NOT NULL,
	[housing] [money] NOT NULL,
	[reward] [money] NULL,
	[reducereward] [money] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[status]    Script Date: 2019/1/23 19:48:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[status](
	[fileNo] [varchar](12) NOT NULL,
	[status] [varchar](10) NOT NULL,
	[exist] [varchar](10) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[worker_detail]    Script Date: 2019/1/23 19:48:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[worker_detail](
	[fileNo] [varchar](12) NOT NULL,
	[name] [varchar](50) NULL,
	[sex] [char](2) NOT NULL,
	[phone] [varchar](15) NULL,
	[socialcode] [varchar](20) NULL,
	[QQ] [varchar](20) NULL,
	[mobile] [varchar](20) NULL,
	[time] [datetime] NULL,
	[speciality] [varchar](100) NULL,
	[age] [varchar](3) NULL,
	[education] [varchar](50) NULL,
	[favor] [varchar](100) NULL,
	[country] [varchar](100) NULL,
	[birthplace] [varchar](100) NULL,
	[birthday] [varchar](20) NULL,
	[profession] [varchar](50) NULL,
	[nation] [varchar](100) NULL,
	[religion] [varchar](5) NULL,
	[political] [varchar](100) NULL,
	[idcard] [varchar](20) NULL,
	[educationlimit] [varchar](10) NULL,
	[head] [varchar](1000) NULL,
	[email] [varchar](100) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[worker_status]    Script Date: 2019/1/23 19:48:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[worker_status](
	[fileNo] [varchar](12) NOT NULL,
	[workerstatus] [varchar](10) NOT NULL,
	[exist] [varchar](10) NOT NULL
) ON [PRIMARY]
GO
USE [master]
GO
ALTER DATABASE [people_resoures] SET  READ_WRITE 
GO
