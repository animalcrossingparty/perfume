# 백엔드

## 배포

### WSGI

 Web Server Gateway Interface. 파이썬에서 어플리케이션, 즉 파이썬 스크립트(웹 어플리케이션)가 웹 서버와 통신하기 위한 인터페이스입니다.

### Nginx

 엔진엑스(Nginx)는 Igor Sysoev라는 러시아 개발자가 `동시접속 처리에 특화된` 웹 서버 프로그램이다. `Apache`보다 동작이 단순하고, 전달자 역할만 하기 때문에 동시접속 처리에 특화되어 있다.

 동시접속자(약 700명) 이상이라면 서버를 증설하거나 Nginx 환경을 권장한다고 한다. 지금은 아파치가 시장 점유율이 압도적(?)이지만, 아마존웹서비스(AWS) 상에서는 시장 점유율 44%에 달할정도로 가볍고, 성능이 좋은 엔진이라고 한다.

### [SSH](https://baked-corn.tistory.com/52)

  Secure Shell Protocol, 즉 네트워크 프로토콜 중 하나로 컴퓨터와 컴퓨터가 인터넷과 같은 Public Network를 통해 서로 통신을 할 때 보안적으로 안전하게 통신을 하기 위해 사용하는 프로토콜입니다.

 1. 데이터 전송
 2. 원격 제어

 이 둘은 개발 공부를 하시는 분이라면 한 번쯤은 사용해보셨을 것이라고 생각합니다. 먼저 데이터 전송의 예로는 원격 저장소인 깃헙이 있을 수 있습니다. 소스 코드를 원격 저장소인 깃헙에 푸쉬할 때 여러분은 SSH를 활용해 파일을 전송하게 됩니다.

 다음으로는 원격 제어입니다. 웹 개발 공부를 하시는 분이시라면 AWS와 같은 클라우드 서비스를 이용해보셨을 것입니다. 우리는 AWS의 인스턴스 서버에 접속하여 해당 머신에 명령을 내리기 위해서도 SSH를 통한 접속을 해야 합니다.

 그렇다면 FTP나 Telnet과 같은 다른 컴퓨터와 통신을 위해 사용되는 프로토콜도 있는데 SSH를 사용하는가를 생각해볼 수 있습니다. 그 이유는 물론 **"보안"**입니다. 만일 예로 언급한 두 프로토콜을 통해 민감한 정보(예를 들어 로그인 정보)를 주고받는다면 정보를 직접 네트워크를 통해 넘기기 때문에 누구나 해당 정보를 열어볼 수 있어 보안에 상당히 취약합니다.

 반면 SSH는 먼저 보안적으로 훨씬 안전한 채널을 구성한 뒤 정보를 교환하기 때문에 보다 보안적인 면에서 훨씬 뛰어납니다.

### PuTTY

Mac OS 및 Linux의 인스턴스와 다른 플랫폼으로의 비공식 포트가있는 Microsoft Windows용으로 설계된 오픈 소스 터미널 에뮬레이터입니다. 작업 환경 구성을위한 그래픽 사용자 인터페이스(GUI)를 제공하고 대부분의 다른 터미널 작업을 지원하며, 특히 Telnet 및 SSH를 사용하여 다른 서버에 원격으로 접속할 수 있습니다.

### Docker

참조: [초보를 위한 도커 안내서 - 설치하고 컨테이너 실행하기](https://subicura.com/2017/01/19/docker-guide-for-beginners-2.html)

도커를 실행하는 명령어는 다음과 같다.

```
docker run [OPTIONS] IMAGE[:TAG|@DIGEST] [COMMAND] [ARG...]
```

다음은 자주 사용하는 옵션들이다.

| 옵션  | 설명                                                   |
| :---- | :----------------------------------------------------- |
| -d    | detached mode 흔히 말하는 백그라운드 모드              |
| -p    | 호스트와 컨테이너의 포트를 연결 (포워딩)               |
| -v    | 호스트와 컨테이너의 디렉토리를 연결 (마운트)           |
| -e    | 컨테이너 내에서 사용할 환경변수 설정                   |
| –name | 컨테이너 이름 설정                                     |
| –rm   | 프로세스 종료시 컨테이너 자동 제거                     |
| -it   | -i와 -t를 동시에 사용한 것으로 터미널 입력을 위한 옵션 |
| –link | 컨테이너 연결 [컨테이너명:별칭]                        |

#### 1, MySQL Docker

cmd를 켜서 다음과 같은 명령어를 입력한다. Docker에 있는 MySQL 최신 버전을 pull한다는 뜻이다.

```powershell
C:\Users\multicampus>docker pull mysql
Using default tag: latest
latest: Pulling from library/mysql
c499e6d256d6: Pull complete
22c4cdf4ea75: Pull complete
6ff5091a5a30: Pull complete
2fd3d1af9403: Pull complete
0d9d26127d1d: Pull complete
54a67d4e7579: Pull complete
fe989230d866: Pull complete
3a808704d40c: Pull complete
826517d07519: Pull complete
69cd125db928: Pull complete
b5c43b8c2879: Pull complete
1811572b5ea5: Pull complete
Digest: sha256:b69d0b62d02ee1eba8c7aeb32eba1bb678b6cfa4ccfb211a5d7931c7755dc4a8
Status: Downloaded newer image for mysql:latest
docker.io/library/mysql:latest
```

```powershell
C:\Users\multicampus>docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password --name mysql_laure_richis mysql
e2da4340b06d07f577cb530e0e362c5aecf4577d773ea10de64d57bf2209f037
```

* `-d` : 백그라운드에서 실행
* `-p` : 포트 설정. 앞에 껀 호스트, 뒤에꺼가 컨테이너
* `-e` : 환경변수 설정
* `--name` : 컨테이너 이름 짓기

```powershell
C:\Users\multicampus>docker exec -it mysql_laure_richis /bin/bash
```

라고 치면 MySQL이 실행됨

```dockerfile
root@e2da4340b06d:/# mysql -ppassword
```

위에서 `-p`는 비밀번호를 입력하는 옵션이고, `-p` 뒤에 띄어쓰기 없이 쓴 `password`는 DB의 비밀번호임. 그러면 MySQL이 진짜 실행됨. 아래는 경고문? 안내문?이니까 건너 뛰면 됨.

```mysql
mysql: [Warning] Using a password on the command line interface can be insecure.
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 9
Server version: 8.0.19 MySQL Community Server - GPL

Copyright (c) 2000, 2020, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
```

`cntl + C` 누르면 MySQL을 나갈 수 있음.

**도커에서 실행한 MySQL의 HOST가 `localhost`가 아니라서 뭔지 알아보려고 다음과 같이 명령어 작성함**

```powershell
C:\Users\multicampus>docker inspect mysql_laure_richis
[
    {
        "Id": "e2da4340b06d07f577cb530e0e362c5aecf4577d773ea10de64d57bf2209f037",
        "Created": "2020-04-14T14:38:29.808054589Z",
        "Path": "docker-entrypoint.sh",
        "Args": [
            "mysqld"
        ],
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 4626,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2020-04-14T14:38:30.297295287Z",
            "FinishedAt": "0001-01-01T00:00:00Z"
        },
        "Image": "sha256:9228ee8bac7a8143818a7b028ee3386ea93e30a8f2e8bbf1440ca1ea3c26aa3e",
        "ResolvConfPath": "/var/lib/docker/containers/e2da4340b06d07f577cb530e0e362c5aecf4577d773ea10de64d57bf2209f037/resolv.conf",
        "HostnamePath": "/var/lib/docker/containers/e2da4340b06d07f577cb530e0e362c5aecf4577d773ea10de64d57bf2209f037/hostname",
        "HostsPath": "/var/lib/docker/containers/e2da4340b06d07f577cb530e0e362c5aecf4577d773ea10de64d57bf2209f037/hosts",
        "LogPath": "/var/lib/docker/containers/e2da4340b06d07f577cb530e0e362c5aecf4577d773ea10de64d57bf2209f037/e2da4340b06d07f577cb530e0e362c5aecf4577d773ea10de64d57bf2209f037-json.log",
        "Name": "/mysql_laure_richis",
        "RestartCount": 0,
        "Driver": "overlay2",
        "Platform": "linux",
        "MountLabel": "",
        "ProcessLabel": "",
        "AppArmorProfile": "",
        "ExecIDs": [
            "bb6f756a683f175f247b300c752cd69a6defd0c59f5744a7dfe992f1f412420c"
        ],
        "HostConfig": {
            "Binds": null,
            "ContainerIDFile": "",
            "LogConfig": {
                "Type": "json-file",
                "Config": {}
            },
            "NetworkMode": "default",
            "PortBindings": {
                "3306/tcp": [
                    {
                        "HostIp": "",
                        "HostPort": "3306"
                    }
                ]
            },
            "RestartPolicy": {
                "Name": "no",
                "MaximumRetryCount": 0
            },
            "AutoRemove": false,
            "VolumeDriver": "",
            "VolumesFrom": null,
            "CapAdd": null,
            "CapDrop": null,
            "Capabilities": null,
            "Dns": [],
            "DnsOptions": [],
            "DnsSearch": [],
            "ExtraHosts": null,
            "GroupAdd": null,
            "IpcMode": "private",
            "Cgroup": "",
            "Links": null,
            "OomScoreAdj": 0,
            "PidMode": "",
            "Privileged": false,
            "PublishAllPorts": false,
            "ReadonlyRootfs": false,
            "SecurityOpt": null,
            "UTSMode": "",
            "UsernsMode": "",
            "ShmSize": 67108864,
            "Runtime": "runc",
            "ConsoleSize": [
                30,
                120
            ],
            "Isolation": "",
            "CpuShares": 0,
            "Memory": 0,
            "NanoCpus": 0,
            "CgroupParent": "",
            "BlkioWeight": 0,
            "BlkioWeightDevice": [],
            "BlkioDeviceReadBps": null,
            "BlkioDeviceWriteBps": null,
            "BlkioDeviceReadIOps": null,
            "BlkioDeviceWriteIOps": null,
            "CpuPeriod": 0,
            "CpuQuota": 0,
            "CpuRealtimePeriod": 0,
            "CpuRealtimeRuntime": 0,
            "CpusetCpus": "",
            "CpusetMems": "",
            "Devices": [],
            "DeviceCgroupRules": null,
            "DeviceRequests": null,
            "KernelMemory": 0,
            "KernelMemoryTCP": 0,
            "MemoryReservation": 0,
            "MemorySwap": 0,
            "MemorySwappiness": null,
            "OomKillDisable": false,
            "PidsLimit": null,
            "Ulimits": null,
            "CpuCount": 0,
            "CpuPercent": 0,
            "IOMaximumIOps": 0,
            "IOMaximumBandwidth": 0,
            "MaskedPaths": [
                "/proc/asound",
                "/proc/acpi",
                "/proc/kcore",
                "/proc/keys",
                "/proc/latency_stats",
                "/proc/timer_list",
                "/proc/timer_stats",
                "/proc/sched_debug",
                "/proc/scsi",
                "/sys/firmware"
            ],
            "ReadonlyPaths": [
                "/proc/bus",
                "/proc/fs",
                "/proc/irq",
                "/proc/sys",
                "/proc/sysrq-trigger"
            ]
        },
        "GraphDriver": {
            "Data": {
                "LowerDir": "/var/lib/docker/overlay2/818268004c3fd1e65653639be401338ecaf5d89636f0506b0256cc9ad19af44d-init/diff:/var/lib/docker/overlay2/a9138c579f5e3eb33bc3ff620319c1f937c171d82e0432e66f53210fa2f245fc/diff:/var/lib/docker/overlay2/b56f568085f04e87fc3a672ad463019025cdcf909708845ebaba3c7538d01623/diff:/var/lib/docker/overlay2/46f82e8068f9a9e6e3adbcc4ce3b7acb2d88bc031d671e27662841d54a50052c/diff:/var/lib/docker/overlay2/4b0cf7980591b7a5590f999ca72eff8db50d19b1305985b2f19e9b78586f41f6/diff:/var/lib/docker/overlay2/f2d26d88c9147186ecc22581934e41c180aab2f593c7a79189ee2cd8ba246b25/diff:/var/lib/docker/overlay2/ce0a8494866753b2b8e0c5399c0e1807010495c626889897cb86ed9a5dd72fbd/diff:/var/lib/docker/overlay2/ae7ebcc6eec5eef5a9f7401b66ed6e3acb6f909d882f5689be2735457c9ca430/diff:/var/lib/docker/overlay2/08fd3a8bc75e4fd9099d89447bc1ed1ad409b9e88c3155f2de9ef85a1f0fb9d1/diff:/var/lib/docker/overlay2/55002ca04306cb26ee58813ddc26e98e251a83f78c87f92a22ed9913e6d5f938/diff:/var/lib/docker/overlay2/b387c78bc81ef4ad88d87ddfc70f6a6ec517622d91aae5c8e99d3632d3baeadb/diff:/var/lib/docker/overlay2/34453a20dd5e5a6d3b518e5f9ee8255513e35d281e0cf2728a18746e74cee581/diff:/var/lib/docker/overlay2/937d32d8ef9a32ab5761be75548ddc3de7b3577e4b2b03109a31f324021e407a/diff",
                "MergedDir": "/var/lib/docker/overlay2/818268004c3fd1e65653639be401338ecaf5d89636f0506b0256cc9ad19af44d/merged",
                "UpperDir": "/var/lib/docker/overlay2/818268004c3fd1e65653639be401338ecaf5d89636f0506b0256cc9ad19af44d/diff",
                "WorkDir": "/var/lib/docker/overlay2/818268004c3fd1e65653639be401338ecaf5d89636f0506b0256cc9ad19af44d/work"
            },
            "Name": "overlay2"
        },
        "Mounts": [
            {
                "Type": "volume",
                "Name": "3672cfea36fa1ffb7c93fd3e4a2698ca4edb66cb7e28c7e343448149200c32e9",
                "Source": "/var/lib/docker/volumes/3672cfea36fa1ffb7c93fd3e4a2698ca4edb66cb7e28c7e343448149200c32e9/_data",
                "Destination": "/var/lib/mysql",
                "Driver": "local",
                "Mode": "",
                "RW": true,
                "Propagation": ""
            }
        ],
        "Config": {
            "Hostname": "e2da4340b06d",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": false,
            "AttachStderr": false,
            "ExposedPorts": {
                "3306/tcp": {},
                "33060/tcp": {}
            },
            "Tty": false,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": [
                "MYSQL_ROOT_PASSWORD=password",
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
                "GOSU_VERSION=1.7",
                "MYSQL_MAJOR=8.0",
                "MYSQL_VERSION=8.0.19-1debian10"
            ],
            "Cmd": [
                "mysqld"
            ],
            "Image": "mysql",
            "Volumes": {
                "/var/lib/mysql": {}
            },
            "WorkingDir": "",
            "Entrypoint": [
                "docker-entrypoint.sh"
            ],
            "OnBuild": null,
            "Labels": {}
        },
        "NetworkSettings": {
            "Bridge": "",
            "SandboxID": "d74943ee1e0c0fc72aaee207df67eb80902927871e4c656c9e5754a63a9358c8",
            "HairpinMode": false,
            "LinkLocalIPv6Address": "",
            "LinkLocalIPv6PrefixLen": 0,
            "Ports": {
                "3306/tcp": [
                    {
                        "HostIp": "0.0.0.0",
                        "HostPort": "3306"
                    }
                ],
                "33060/tcp": null
            },
            "SandboxKey": "/var/run/docker/netns/d74943ee1e0c",
            "SecondaryIPAddresses": null,
            "SecondaryIPv6Addresses": null,
            "EndpointID": "6c4d0bbd3b10bcb77456deeb16045db49df47de1a0b863c1053a7f912ef67d61",
            "Gateway": "172.17.0.1",
            "GlobalIPv6Address": "",
            "GlobalIPv6PrefixLen": 0,
            "IPAddress": "172.17.0.3",
            "IPPrefixLen": 16,
            "IPv6Gateway": "",
            "MacAddress": "02:42:ac:11:00:03",
            "Networks": {
                "bridge": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": null,
                    "NetworkID": "415482e2c524f7559e0084e0161af0c1bf85e32ffb47f17b6c526ad23ce48374",
                    "EndpointID": "6c4d0bbd3b10bcb77456deeb16045db49df47de1a0b863c1053a7f912ef67d61",
                    "Gateway": "172.17.0.1",
                    "IPAddress": "172.17.0.3",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "MacAddress": "02:42:ac:11:00:03",
                    "DriverOpts": null
                }
            }
        }
    }
]
```

위에서 잘 찾아보면 아래와 같은 정보를 발견할 수 있음

```
"IPAddress": "172.17.0.3"
```

`/bin/bash`는 `bin`이라는 디렉토리에서 바이너리로 실행시키겠다는 뜻(?)

```powershell
C:\Users\multicampus>docker exec -it mysql_laure_richis /bin/bash
```

다시 MySQL이 실행됨

```dockerfile
root@e2da4340b06d:/# mysql
ERROR 1045 (28000): Access denied for user 'root'@'localhost' (using password: NO)
```

그냥 MySQL 실행시켜보려 했더니 안 된다 함. 일단 비밀번호 입력해줌.

```dockerfile
root@e2da4340b06d:/# mysql -ppassword
mysql: [Warning] Using a password on the command line interface can be insecure.
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 12
Server version: 8.0.19 MySQL Community Server - GPL

Copyright (c) 2000, 2020, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
```

이건 왜 이렇게 한 거지.. 비밀번호가 자동으로 입력되게..?

```mysql
mysql> alter user 'root'@'%' identified with mysql_native_password by 'password';
Query OK, 0 rows affected (0.02 sec)
```

이름이 `laure_richis`인 DB 하나 만들어줌

```mysql
mysql> create database laure_richis;
Query OK, 1 row affected (0.01 sec)
```

#### 2. Django Docker

먼저, Django의 `settings.py`를 `base.py`, `local.py`, `production.py`로 나눈다. `local.py`는 개발할 때, `production.py`는 배포할 때 쓸 것이다.

```python
# production.py

import os
from .base import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'HOST': os.environ['MYSQL_ROOT_HOST'],
        'NAME': os.environ['MYSQL_DATABASE'],
        'USER': os.environ['MYSQL_USER'],
        'PASSWORD': os.environ['MYSQL_ROOT_PASSWORD'],
    }
}

DEBUG = False
```

```python
# local.py

from .base import *

DATABASES = {
    'default' : {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'laure_richis',
        'USER': 'root',
        'PASSWORD': 'password',
        'HOST': 'localhost',
        'PORT': '3307',
    }
}

DEBUG = True
```

`base.py`는 원래 `settings.py`에서 `DEBUG` 변수와 `DATABASES` 변수를 지우고 이름만 바꿔주면 된다.

앞으로 `manage.py`를 실행할 때

```bash
$ python manage.py runserver --settings=laure_richis.production
$ python manage.py migrate --settings=laure_richis.local
```

이런 식으로 `--settings` 옵션을 줘서 실행하면 된다.

**!!! 중요 !!!   `requirements.txt`에서 `pywin`을 지워준다. 이건 윈도우에서 쓸 때만 필요한 패키지인데, 이것 때문에 리눅스에서 `pip install -r requirements.txt`하면 자꾸 에러남**

두번째로, 왜인진 모르지만 Docker가 `C:\Users\multicampus` 디렉토리에서 실행되고 있으므로, 다음과 같은 내용이 담긴 `django_env.txt` 파일을 `C:\Users\multicampus` 경로에 생성한다.

```
MYSQL_ROOT_HOST=172.17.0.3
MYSQL_DATABASE=laure_richis
MYSQL_USER=root
MYSQL_ROOT_PASSWORD=password
```

`docker run` 명령을 실행할 때 환경변수 `-e` 옵션을 주고 싶었으나, 줘야 할 환경변수가 많아서인지 에러가 나서 아예 텍스트 파일을 만들었다.

그 다음, cmd를 켜서 다음과 같이 입력한다.

```powershell
C:\Users\multicampus>docker run  --env-file="django_env.txt" -it -p 7000-7009:7000-7009 -v "C:\Users\multicampus\Desktop\perfume\back:/perfume/back"  python:3.6.8-stretch /bin/bash
```

포트를 7000~7009를 주겠다고 설정했는데, 이건 장고 포트가 아니라 컨테이너 포트임. 그리고 배포할 땐 뭐였는진 기억 안 나는데 다른 세 자리 숫자로 배포해야 해서 지금은 아무 포트나 할당해도 됨

* `-v` : 마운트(?). 장고가 현재 있는 루트 디렉토리를 앞에 써주고, 컨테이너 안에 위치하길 바라는 경로를 `:` 뒤에 써준다. 프론트엔드도 같은 컨테이너 안에 넣어야 해서 처음부터 폴더를 저렇게 만들어놨다.

`bin/bash` 파일을 실행시켰다. 바이너리...로 실행..? 저장...? 한다는 뜻

```dockerfile
root@94521561a723:/# cd bin
root@94521561a723:/bin# bash
```

`apt-get`은 리눅스에서 패키지 설치하는(?) 건데 pip는 install할 때 dependencies가 처음부터 어느 정도 깔리지만, 리눅스에서는 처음에 아예 아무것도 없어서 꼭 `apt-get update`를 먼저 해줘야 한다.

```dockerfile
root@94521561a723:/bin# apt-get update
Get:1 http://security.debian.org/debian-security stretch/updates InRelease [94.3 kB]
Ign:2 http://deb.debian.org/debian stretch InRelease
Get:3 http://security.debian.org/debian-security stretch/updates/main amd64 Packages [521 kB]
...
Do you want to continue? [Y/n] y
...
```

`perfume/back`으로 들어가서 리눅스용 `venv` 만든다. 이름은 `docker_env`로 해놨다. 이러면 로컬에서도 `docker_env`가 생긴다. 신기하다. **그러니 git push 전에 꼭 `.gitignore`에 `docker_env/`를 추가해놓아야 한다!**

그런데 python의 `venv` 모듈로 만들려고 했더니 가상환경을 켜면 3.5.3 버전이 깔려 있어서, global에 `virtualenv` 모듈을 설치하고

```dockerfile
root@94521561a723:/perfume/back# pip install virtualenv
Collecting virtualenv
  Downloading https://files.pythonhosted.org/packages/82/34/ae98cb0c3eca73b871d51b8f27af0389c746f0e166cd3b2ab31f41085b82/virtualenv-20.0.17-py2.py3-none-any.whl (4.6MB)
     |████████████████████████████████| 4.6MB 3.1MB/s
  ...
```

이 모듈을 이용하여 가상환경을 만들었다.

```dockerfile
root@94521561a723:/perfume/back# virtualenv docker_env
created virtual environment CPython3.6.8.final.0-64 in 3625ms
  creator CPython3Posix(dest=/perfume/back/docker_env, clear=False, global=False)
  seeder FromAppData(download=False, pip=latest, setuptools=latest, wheel=latest, via=copy, app_data_dir=/root/.local/share/virtualenv/seed-app-data/v1.0.1)
  ...
```

가상환경을 activate한다. 윈도우에서는 `venv/Scripts/activate`였지만, 리눅스에서는 `venv/bin/activate`이다.

```dockerfile
root@94521561a723:/perfume/back# source docker_env/bin/activate
```

Dependencies를 깔고

```dockerfile
(docker_env) root@94521561a723:/perfume/back# pip install -r requirements_docker.txt
Requirement already satisfied: asgiref==3.2.7 in ./docker_env/lib/python3.6/site-packages (from -r requirements.txt (line 1)) (3.2.7)
Requirement already satisfied: astroid==2.3.3 in ./docker_env/lib/python3.6/site-packages (from -r requirements.txt (line 2)) (2.3.3)
...
```

migrate한다. 아까 위에서 MySQL에 `laure_richis`라는 database를 만들어놔서 에러가 나지 않는다.

```dockerfile
(docker_env) root@94521561a723:/perfume/back# python manage.py migrate --settings=laure_richis.production
Operations to perform:
  Apply all migrations: accounts, admin, auth, contenttypes, perfumes, sessions
Running migrations:
  Applying perfumes.0001_initial... OK
  Applying perfumes.0002_auto_20200409_1121... OK
  Applying contenttypes.0001_initial... OK
  ...
```

그러면 서버를 켤 수 있다!

```dockerfile
(docker_env) root@94521561a723:/perfume/back# python manage.py runserver --settings=laure_richis.production
Performing system checks...

System check identified no issues (0 silenced).
April 15, 2020 - 01:09:44
Django version 3.0.5, using settings 'laure_richis.production'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```





```dockerfile
(docker_env) root@bded4af9b7a8:/perfume/back# pip install uwsgi
Collecting uwsgi
  Downloading uwsgi-2.0.18.tar.gz (801 kB)
     |████████████████████████████████| 801 kB 232 kB/s
```



```dockerfile
(docker_env) root@bded4af9b7a8:/perfume/back# pip freeze > requirements_docker.txt
```



```dockerfile
(docker_env) root@bded4af9b7a8:/perfume/back# uwsgi --http :8000 --home perfume/back/docker_env --chdir laure_richis -w laure_richis.wsgi
*** Starting uWSGI 2.0.18 (64bit) on [Wed Apr 15 10:39:22 2020] ***
compiled with version: 6.3.0 20170516 on 15 April 2020 10:24:51
os: Linux-4.19.76-linuxkit #1 SMP Thu Oct 17 19:31:58 UTC 2019
nodename: bded4af9b7a8
machine: x86_64
clock source: unix
pcre jit disabled
detected number of CPU cores: 2
current working directory: /perfume/back
detected binary path: /perfume/back/docker_env/bin/uwsgi
uWSGI running as root, you can use --uid/--gid/--chroot options
*** WARNING: you are running uWSGI as root !!! (use the --uid flag) ***
chdir() to laure_richis
*** WARNING: you are running uWSGI without its master process manager ***
your memory page size is 4096 bytes
detected max file descriptor number: 1048576
lock engine: pthread robust mutexes
thunder lock: disabled (you can enable it with --thunder-lock)
uWSGI http bound on :8000 fd 4
spawned uWSGI http 1 (pid: 1165)
uwsgi socket 0 bound to TCP address 127.0.0.1:34013 (port auto-assigned) fd 3
uWSGI running as root, you can use --uid/--gid/--chroot options
*** WARNING: you are running uWSGI as root !!! (use the --uid flag) ***
Python version: 3.6.8 (default, Jun 11 2019, 01:16:11)  [GCC 6.3.0 20170516]
!!! Python Home is not a directory: perfume/back/docker_env !!!
Set PythonHome to perfume/back/docker_env
Fatal Python error: Py_Initialize: Unable to get the locale encoding
ModuleNotFoundError: No module named 'encodings'

Current thread 0x00007fc0a5288180 (most recent call first):
Aborted
```

```dockerfile
(docker_env) root@bded4af9b7a8:/perfume/back# uwsgi --http :8000 --home perfume/back/docker_env --chdir laure_richis -w laure_richis.wsgi
```





# 앞으로 해야 할 일

1. 웹서버를 설치하고

2. 웹서버로 돌아가는 장고 컨테이너를 만든다

3. mysql 컨테이너 + nginx 장고 컨테이너랑

4. 묶어서 빌드

5. 해서 생긴 docker-compose 이미지를

6. aws ec2에 올린다

7. 까지의 과정을 github과 연동한다

8. 까지의 과정을 자동화한다

9. 로컬 포트 7000에서 동작하는 도커 컨테이너를 제작 완료

   ```bash
   $ uwsgi --http :8000 --module main.wsgi
   ```

   이런 식으로 실행할 수 있게!



# 참고자료

https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/UserGuide/putty.html

SSH: Secure SHell

https://baejino.com/programing/django/how-to-run-server-with-uwsgi

AWS의 EC2 컨테이너에 가상 CPU 가상 메모리 가상 DB서버가 모두 존재한다

ssh 열고 wsgi 수정하고 nginx를 우분투 서버에 깔고

https://m.blog.naver.com/PostView.nhn?blogId=wideeyed&logNo=221355739161&proxyReferer=https:%2F%2Fwww.google.com%2F

https://www.hanumoka.net/2018/04/29/docker-20180429-docker-install-mysql/

