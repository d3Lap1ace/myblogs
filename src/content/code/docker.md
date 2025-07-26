---
title: Docker 入门
excerpt: 安装、配置与常见问题
category: DevOps
icon: 🐳
color: blue
date: "2025-07-28"
---
# Docker

Docker的安装和卸载可以参考官方文档：

[https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/)

CentOS uninstall 

```bash
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```

CentOS install

```bash
# 安装依赖
sudo yum install -y yum-utils

# 安装docker的下载源
sudo yum-config-manager \
--add-repo \
 https://download.docker.com/linux/centos/docker-ce.repo

# 安装docker
sudo yum install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

# 阿里云镜像加速器

```bash
# 在etc目录下创建一个docker文件夹
sudo mkdir -p /etc/docker

# 在/etc/docker文件夹下创建一个daemon.json文件，然后写入如下内容
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://phtv51hj.mirror.aliyuncs.com"]
}
EOF

# 重新加载docker的守护进程
sudo systemctl daemon-reload

# 重启docker服务
sudo systemctl restart docker
```

or

```bash
vim /etc/docker/daemon.json

{
    "registry-mirrors": [
    "https://ghcr.io",
    "https://5yt01a9i.mirror.aliyuncs.com",
    "https://registry.docker-cn.com",
    "http://hub-mirror.c.163.com",
    "https://mirror.baidubce.com"
    ]
}

sudo systemctl daemon-reload
sudo systemctl restart docker
```

# docker镜像操作

```bash
# 搜索
docker serach 镜像名字
# 拉取
docker pull 镜像名字   # 默认最新
docker pull 镜像名称[:tag]
# 查看本地镜像
docker images name
                  -q, --quiet							# 查询镜像的id
                  -f, --filter string			# 按照指定的过滤条件进行查询
                      --format string			# 按照指定的格式化字符串进行结果格式化操作
                docker images -q
                docker images --filter reference="redis:*"	# 搜索镜像名称为redis，镜像标签是任意的所有镜像
                docker images --format "{{.Repository}}:{{.Tag}}" # 搜索结果中只包含仓库名称和标签名称
# 删除
docker rmi 镜像名称[:镜像标签]/镜像的id
```

# docker容器操作

```bash
# 查询容器
docker ps # 查看本地正在运行的容器

# 创建容器
docker run [OPTIONS] 镜像的名称:镜像标签/镜像id [COMMAND] [ARG...]
        -d,--detach								# 以后台的模式执行命令daemon
        -t, --tty								# 分配一个虚拟终端，通常和-i参数一起使用
        -i,--interactive						# 把交互界面一直保留，通常和-t参数一起使用
        docker run -it redis:7.0.10       # 创建一个交互型容器
        docker run -d  redis:7.0.10       # 创建一个守护型容器，容器在启动的时候打开一个shell窗口，并且让这个窗口一直保留
        --name   # 可以给创建的容器设置名称。如果没有加该参数，那么此时docker会为容器随机分配一个名字。
        docker run -d --name redis01 redis:7.0.10

# 删除容器
docker rm 容器名称/容器的id
          docker rm -f $(docker ps -aq)  #删除所有容器

 # 进入容器
 docker exec [OPTIONS] CONTAINER COMMAND [ARG...]
         -t, --tty  # 分配一个虚拟终端，通常和-i参数一起使用
         -i,--interactive  # 把交互界面一直保留，通常和-t参数一起使用
         docker exec -it redis01 /bin/bash	# 进入到容器中同时打开一个shell窗口

# 其他命令
docker logs -f 容器名称/容器的id		# 查询容器内进程日志，-f参数表示实时监控日志信息
docker inspect 容器名称/容器的id						# 查看容器的详情信息
docker cp 	 										 # 完成容器和宿主机之间的文件copy

```

- p

docker容器内部所运行的进程是无法被外部机器(windows)直接访问的, 如果外部机器向访问容器内的进程，那么在创建容器的时候就需要在linux宿主机上开一个端口号，并且需要建立这个端口号和容器内进程端口号之间的映射关系.

![](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719214909168-4827db94-8544-409c-bc1a-26a8d66243a5.png)

exp:      docker run -d --name redis01 -p 6379:6379 redis:7.0.10

# docker数据卷操作

数据卷是docker所提供的一个虚拟目录，这个虚拟目录会对应宿主机的一个真实目录。在创建容器的时候就可以将这个数据卷挂载到容器中的某一个目录下，那么此时在该目录下所产生的数据就会存储到宿主机的目录下，实现了容器和宿主机之间的文件共享。

![](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719216270722-0e65a083-8543-435f-8f31-580ed927c330.png)

数据卷作用：

1.可以将容器中的数据持久化到宿主机目录中,以后删除容器，容器中指定目录中的数据就可以保存下来了。

2.可以让多个容器共享数据卷目录的同一份数据(项目)。

```bash
#  查看数据卷
docker volume ls
#	创建数据卷
docker volume create 数据卷名称
# 查询数据卷详情
docker volume inspect 数据卷名称
# 删除数据卷
docker volume rm 数据卷名称  # 删除指定的数据卷
docker volume prune 		# 删除未使用的数据卷
# 数据卷挂载
-v 宿主机目录:容器目录
docker run -d --name redis03 -p 6381:6379 -v /redis-data:/data redis:7.0.10

```

# Docker图形化界面

```bash
# 搜索portainer
docker search portainer

# 拉取镜像
docker pull portainer/portainer

#创建并启动容器,注意需要做一个docker.sock文件的映射，后期portainer会通过这个文件和docker的守护进程进行通讯，管理docker的相关对象
# --restart=always: 表示随着docker服务的启动而启动
docker run -d -p 9000:9000  --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock   portainer/portainer
```

# Docker 安装配置

### 安装mysql

**已安装的忽略**

第一步：拉取镜像

docker pull mysql

第二步：启动

docker run --name mysql --restart=always -v mysql-data:/var/lib/mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -d mysql

第三步：测试mysql

进入容器：

docker exec -it spzx_mysql  /bin/bash

登录mysql：

mysql -u root -p

输入密码：root

如果顺利进入，安装成功

#修改默认密码校验方式 ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';

### 安装redis

已安装或能访问忽略

第一步：拉取镜像

docker pull redis

第二步：启动

docker run --name=redis -d -p 6379:6379  --restart=always redis

### 安装nacos

已安装或能访问忽略

第一步：拉取镜像

docker pull nacos/nacos-server

第二步：启动

```
docker run -d \
-e MODE=standalone \
-p 8848:8848 \
-p 9848:9848 \
-p 9849:9849 \
--name nacos \
--restart=always \
nacos/nacos-server
```

### 安装sentinel

已安装或能访问忽略

第一步：拉取镜像

docker pull bladex/sentinel-dashboard

第二步：启动

docker run --name=sentinel-dashboard --restart=always -p 8858:8858 -d bladex/sentinel-dashboard:latest

### 安装minio

第一步：拉取镜像

docker pull minio/minio

第二步：启动

```
docker run \
-p 9000:9000 \
-p 9001:9001 \
--name=minio \
-d --restart=always \
-e "MINIO_ROOT_USER=minioadmin" \
-e "MINIO_ROOT_PASSWORD=minioadmin" \
-v spzx_minio-data:/data \
-v spzx_minio-config:/root/.minio \
minio/minio server /data --console-address ":9001"
```

**注意**：文件上传时，需要调整一下linux 服务器的时间与windows 时间一致！

第一步：安装ntp服务 yum -y install ntp

第二步：开启开机启动服务 systemctl enable ntpd

第三步：启动服务 systemctl start ntpd

第四步：更改时区 timedatectl set-timezone Asia/Shanghai

第五步：启用ntp同步 timedatectl set-ntp yes

第六步：同步时间 ntpq -p

### 安装rabbitmq

第一步：拉取镜像

docker pull rabbitmq:3.12.0-management

第二步：启动

docker run -d --name=rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.12.0-management

第三步：安装延迟队列插件

1. 下载地址：[https://www.rabbitmq.com/community-plugins.html](https://www.rabbitmq.com/community-plugins.html)
2. 切换到插件所在目录，执行 `docker cp rabbitmq_delayed_message_exchange-3.12.0.ez rabbitmq:/plugins` 命令，将刚插件拷贝到容器内plugins目录下
3. 执行 `docker exec -it rabbitmq /bin/bash` 命令进入到容器内部
4. 执行 `cd plugins` 进入plugins目录,然后执行 `ls -l|grep delay` 命令查看插件是否copy成功
5. 在容器内plugins目录下，执行 `rabbitmq-plugins enable rabbitmq_delayed_message_exchange` 命令启用插件
6. exit命令退出RabbitMQ容器内部，然后执行 `docker restart rabbitmq`命令重启RabbitMQ容器

### 环境测试

使用mysql/redis客户端工具远程连接mysql/redis测试

nacos控制台访问测试:   `http://虚拟机IP:8848/nacos`          账号密码：nacos/nacos

rabbitmq控制台访问测试：`http://虚拟机IP:15672`  账号密码：guest/guest

minio控制台访问测试：`http://虚拟机IP:9001`  账号密码：minioadmin/minioadmin

sentinel控制台访问测试：`http://虚拟机IP:8858` 账号密码：sentinel/sentinel

**注意：如果访问失败**

1、检查容器是否创建启动成功，可能是端口号占用导致，需要先关闭占用端口号的进程或修改当前容器的端口号

2、检查防火墙是否关闭

3、配置虚拟机允许IPv4地址跳转

```
# 修改配置文件：
vim /usr/lib/sysctl.d/00-system.conf
# 添加
net.ipv4.ip_forward=1

# 保存退出 重启网络
systemctl restart network
# 重启docker
systemctl restart docker
```