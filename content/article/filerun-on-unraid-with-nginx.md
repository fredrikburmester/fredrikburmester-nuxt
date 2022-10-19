<!-- markdownlint-disable MD026 MD022 -->
<!-- markdownlint-disable MD026 MD041 MD033 -->

::page-title
---
title: FileRun on UnRaid
description: A guide on how to set up FileRun on UnRaid using NginxProxyManager and MariaDB.
publishedAt: 19th of May, 2019
tags: photography
---
::
![The Moon](){.rounded}

Hi all! This is a tutorial on how to set up FileRun (Nextcloud alternative) on your unRAID server in a Docker container running with HTTPS.

For the better part of a week, I've been trying to set up FileRun in a docker container. Posting on [r/unRAID](https://www.reddit.com/r/unRAID) for help and getting some really awesome feedback. Now I'd like to share what I've learned!

I'd like to thank [u/m-jeri](https://www.reddit.com/user/m-jeri) for all the help setting up the container: [https://www.reddit.com/r/unRAID/comments/an7225/trying\_to\_install\_filerun\_docker\_container/](https://www.reddit.com/r/unRAID/comments/an7225/trying_to_install_filerun_docker_container/)
and [u/theworldisweird_](https://www.reddit.com/user/theworldisweird_) for help with nginx.

Prerequisites:

* MariaDB (container already set up and working)
* NginxProxyManager (container and port forwarding already set up and working)
* A cname sub-domain that points to your external IP. (duckdns or similar is recommended).

Okay so let's start.

1. Start by creating a user and a database in MariaDB that FileRun can use. And of course, it's recommended to use secure passwords. Here are all the commands you need to enter one line at a time (ignore the comments):

```SQL
mysql -uroot -p; //Enter your mariadb password when prompted.
CREATE USER '<user_name>' IDENTIFIED by '<user_password>'; //Choose any username and password.
CREATE DATABASE IF NOT EXISTS <file_run_db_name>; //Choose any database name.
GRANT ALL PRIVILEGES ON <file_run_db_name>.* TO '<user_name>' IDENTIFIED BY '<user_password>';
FLUSH PRIVILEGES;
exit
```

Now you have a DB that FileRun can use.

2. Decide if you want to store all files within FileRun or link your current shares. If you want to link your shares you can create a folder within your appdata folder (or make it a share if you plan to store files in the FileRun instance) named `filerun`. Inside this folder, create three more, named: `html`, `db` and `user-files`. The file structure will look like this:

```bash
appdata
  +- filerun
  |    +- db
  |    +- html
  |    +- user-files
```

3. Now we can start setting up the Docker container. Images below show how the container should look.
   * Container setup: <https://imgur.com/a/d3Tif3z>
   * **Do not add Host Path 4 at the bottom, this is for step 7**
   * Icon URL is: <https://avatars2.githubusercontent.com/u/6422152?s=400&v=4>
   * Fill in the fields that are blank in the image with your MariaDB username, DB and password and so on (i used `filerun` as username and `mypassword` as password everywhere to make it easy for myself, do not do this of course).
   * Note that host paths do not have a slash at the end, for some reason it didn't work for me with a slash.
   * Also note that you don't need to change the WebUI. Leave it as `http://[IP]:[PORT:8080]/`.
   * You do **not** need to forward the port `8080` in your router.

4. You can now start up the container and enter the login credentials `superuser` and `superuser`.
Now you have a fully working FileRun setup. In the next step, I will explain how to access it from WAN with HTTPS.
5. Open NginxProxyManager and create a new proxy host according to this: <https://imgur.com/a/oRJG1TA>
The IP address is the address you entered in the container setup, which should be the ip of your unRAID server. Make sure the port is the port of your FileRun container. And because FileRun doesn't natively run on https you should have HTTP selected.
On the next page "SSL" you should request a new certificate.
Now you have your FileRun instance running HTTPS accessed by `https://filerun.mydomain.com`. In the next step, I will show how to link your existing unRAID shares to your FileRun account.
6. Logged in to the superuser account, create a new user, go to permissions for that user and give it the path `/user-files/username` and click create folder now. (You choose your username.)
7. Add the Host Path 4 mentioned in step 3. The container path should be `/user-files/username`. And host path should be `/mnt/user` if you want to add all your shares. If not, just specify that share, like `/mnt/user/Documents` for example.
The problem is that all the files that FileRun creates are locked and if you try to access those files from another application or SMB share you will not have permission to do so. Therefore we have to change the permission of all files that FileRun creates. Go to where you placed your filerun folder and open `/mnt/user/appdata/filerun/html/customizables/config.php` if the file doesn't exist then create it. And enter this:

```php
<?php
umask(000);
php?>
```

This is not considered safe because your files are not protected at all now.
See this for more info: <https://www.cyberciti.biz/tips/understanding-linux-unix-umask-value-usage.html>

8. Now if you're like me and don't want all shares showing up in FileRun you can add some lines to the `config.php` file to exclude them from FileRun.

```php
<?php
umask(000);
$config['app']['hidden_folder_names'][] = "appdata";
$config['app']['hidden_folder_names'][] = "appdata-backup";
$config['app']['hidden_folder_names'][] = "isos";
$config['app']['hidden_folder_names'][] = "domains";
$config['app']['hidden_folder_names'][] = "system";
php?>
```

For more info: <https://docs.filerun.com/advanced_configuration>.

Now you have FileRun all set up and ready to go! Have fun!

Hope this helps someone in their journey or maybe taught some of you something. I know that I've learned a lot from all this.
