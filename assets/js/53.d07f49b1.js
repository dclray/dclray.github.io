(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{527:function(e,n,t){"use strict";t.r(n);var a=t(6),r=function(e){e.options.__data__block__={mermaid_1a962853:"graph TD\n    A[OSI模型] --\x3e B[物理层]\n    A--\x3e C[数据链路层]\n    A--\x3e D[网络层]\n    A--\x3e E[传输层]\n    A--\x3e F[会话层]\n    A--\x3e G[表示层]\n    A--\x3e H[应用层]\n",mermaid_382ee145:'graph LR\n    B[物理层]--\x3e B1["1.通过光缆、电缆、无线电波等方式将设备连接起来组网"]\n    B--\x3e B2["2.两个不同局域网（移动、电信）通信，需要ISP互联网服务供应商的物理连接"]\n    B--\x3e B3["3.作用：传送比特流 0和1"]\n',mermaid_382ee146:'graph LR\n    C[数据链路层]--\x3e C1["1.作用"]\n    C1--\x3eC11["根据以太网协议将一组电信号组成一个数据包，称作“帧”，并控制它的传输"]\n    C1--\x3eC12["有两部分：1.标头head:标明数据发送者、接收者、数据类型2.数据data"]\n    C--\x3e C2["2.MAC地址"]\n    C2--\x3eC21["作用：定位数据包的路径，如发送者、接收者"]\n    C2--\x3eC22["网卡地址，每个网卡都是独一无二的12个16进制数"]\n    C2--\x3eC23["前6个表示厂商，后6个表示流水号"]\n    C--\x3eC3["3.广播方式"]\n    C3--\x3eC31["发送者吧数据包，发送给局域网内的所有PC，让每个PC根据MAC地址自动匹配"]\n    C3--\x3eC32["发送媒介：分组交换机/网络交换机"]\n    C--\x3eC4["网络交换机（network switch）"]\n    C4--\x3eC41["扩展网络的机器"]\n    C4--\x3eC42["作用：为子网提供更多的接口，以连接更多的PC"]\n',mermaid_382ee147:'graph LR\n    D[网络层]--\x3eD1["作用"]\n    D1--\x3eD11["建立 主机-主机的连接"]\n    D--\x3eD2["引入新的地址模式-IP地址/网络地址，可以区分哪些PC是在同一子网（局域网）内"]\n  \n    D--\x3eD3["IPv4:32个二进制，4字节*8位"]\n    D3--\x3eD31["前24位表示网络同一子网下，必须相同"]\n    D3--\x3eD32["后8位表示主机"]\n    D--\x3eD4["IPv6:128个二进制，8字节*16位"]\n    D--\x3eD5["子网掩码"]\n    D5--\x3eD51["通过&运算判断是否在同一子网下  ip & 255.255.255.0"]\n    D--\x3eD6["路由"]\n    D6--\x3eD61["作用：通过网络把数据从与地址到目标地址，引导分组传送，经过一些中间节点后，到达目的地"]\n    D6--\x3eD62["实现方法：定义一条路径，经过因特网把包发送到目的地，但不指定完全路径，只定义两个网关之间的路径段"]\n    D6--\x3eD63["路由器router：连接两个或多个网络并实现路由功能的及其：可看作配有多个网卡的专用电脑，让网卡接入不同的网络中"]\n    D6--\x3eD64["网关gateway：网络层使用的路由器，通常指路由器的IP"]\n    D--\x3eD7["ARP协议"]\n    D7--\x3eD71["作用：局域网内IP和MAC地址的对应关系"]\n    D7--\x3eD72["作用位置：介于数据链路层和网络层之间"]\n    D7--\x3eD73["局限：仅限于ipv4,ipv6用Neighbor Disovery Protocol替代"]\n',mermaid_382ee148:'graph LR\n    E[传输层]--\x3e E1["作用"]\n    E1--\x3e E11["建立 端口-端口间的连接"]\n    E--\x3eE2["端口号"]\n    E2--\x3eE21["取值：0-65535"]\n    E21--\x3eE211["0-1023系统占用"]\n    E21--\x3eE212["应用程序随机选取"]\n    E21--\x3eE213["http 80"]\n    E21--\x3eE214["代理服务 8080"]\n    E2--\x3eE22["指定IP包具体给哪个进程；另外，一个进程可能与多个计算机连接，会有多个端口"]\n    E--\x3eE3["socket"]\n    E3--\x3eE31["进程间通信：需要双方IP，端口号，通信采用的协议栈"]\n    E3--\x3eE32["格式：无符号整型变量，用来表示一个通信进程"]\n    E3--\x3eE33["本质：是编程接口API，对TCP/IP协议的封装"]\n    E--\x3eE4["UDP/TCP"]\n    E4--\x3eE41["作用：在数据包标头加上端口号"]\n    E4--\x3eE42["TCP:复杂，稳定，有包遗失，会重发"]\n    E4--\x3eE43["UDP:简单，但不稳定，不能确定对方是否成功接收"]\n',mermaid_382ee149:'graph LR\n   H[应用层]--\x3eH1[作用]\n   H1--\x3eH11[规定应用程序的数据格式]\n   H1--\x3eH12["如ftp，网页、smtp的数据格式"]\n   H--\x3eH2["是对OSI模型中最高3层的合并，直接面向用户"]\n',mermaid_382ee14d:'graph LR\n A["应用层数据包"]\n B["TCP/UDP头部"]\n C["IP头部"]\n D["以太网头部"]\n subgraph "以太网数据包"\nsubgraph "IP数据包"\nsubgraph "TCP/UDP数据包"\n   A \nend\n   A --\x3eB\nend\n   B--\x3eC\n   end\n   C--\x3eD\n\n'}},_=Object(a.a)({},(function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h2",{attrs:{id:"模型"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#模型"}},[e._v("#")]),e._v(" 模型")]),e._v(" "),t("p",[e._v("OSI：open system interconnection 开放式系统互联参考模型"),t("br"),e._v("\nOSI和TCP/IP的对应关系和协议\n"),t("table",[t("thead",[t("th",[e._v("OSI七层网络模型")]),e._v(" "),t("th",[e._v("TCP/IP四层概念模型")]),e._v(" "),t("th",[e._v("对应的网络协议")]),e._v(" "),t("th",[e._v("OSI各层基本作用")])]),e._v(" "),t("tr",[t("td",[e._v("应用层（application）")]),e._v(" "),t("td",{attrs:{rowspan:"3"}},[e._v("应用层")]),e._v(" "),t("td",[e._v("HTTP、TFTP、FTP、NFS、WAIS、SMTP")]),e._v(" "),t("td",[e._v("为应用程序提供网络服务")])]),e._v(" "),t("tr",[t("td",[e._v("表示层（Presentation）")]),e._v(" "),t("td",[e._v("Telnet，Rlogin，SNMP，Gopher")]),e._v(" "),t("td",[e._v("数据格式化，加密，解密")])]),e._v(" "),t("tr",[t("td",[e._v("会话层（Session）")]),e._v(" "),t("td",[e._v("SMTP，DNS")]),e._v(" "),t("td",[e._v("建立、维护、管理会话连接")])]),e._v(" "),t("tr",[t("td",[e._v("传输层（Transport）")]),e._v(" "),t("td",[e._v("传输层")]),e._v(" "),t("td",[e._v("TCP，UDP")]),e._v(" "),t("td",[e._v("建立、维护、管理端到端连接")])]),e._v(" "),t("tr",[t("td",[e._v("网络层（Network）")]),e._v(" "),t("td",[e._v("网络层")]),e._v(" "),t("td",[e._v("IP，ICMP，ARP，RARP，AKP，UUCP")]),e._v(" "),t("td",[e._v("IP寻址和路由选择")])]),e._v(" "),t("tr",[t("td",[e._v("数据链路层（Data Link）")]),e._v(" "),t("td",{attrs:{rowspan:"2"}},[e._v("数据链路层")]),e._v(" "),t("td",[e._v("FDDI，Ethernet，Arpanet，PDN，SLIP，PPP")]),e._v(" "),t("td",[e._v("控制网络层于物理层之间通信")])]),e._v(" "),t("tr",[t("td",[e._v("物理层")]),e._v(" "),t("td",[e._v("IEEE 802.1A，IEEE 802.0到IEEE 802.11")]),e._v(" "),t("td",[e._v("比特流传输")])])])]),e._v(" "),t("h2",{attrs:{id:"osi模型详解"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#osi模型详解"}},[e._v("#")]),e._v(" OSI模型详解")]),e._v(" "),t("Mermaid",{attrs:{id:"mermaid_1a962853",graph:e.$dataBlock.mermaid_1a962853}}),t("Mermaid",{attrs:{id:"mermaid_382ee145",graph:e.$dataBlock.mermaid_382ee145}}),t("Mermaid",{attrs:{id:"mermaid_382ee146",graph:e.$dataBlock.mermaid_382ee146}}),t("Mermaid",{attrs:{id:"mermaid_382ee147",graph:e.$dataBlock.mermaid_382ee147}}),t("Mermaid",{attrs:{id:"mermaid_382ee148",graph:e.$dataBlock.mermaid_382ee148}}),t("Mermaid",{attrs:{id:"mermaid_382ee149",graph:e.$dataBlock.mermaid_382ee149}}),t("p",[e._v("数据链路层数据包（以太网数据包）格式，除了应用层没有头部，其他都有")]),e._v(" "),t("Mermaid",{attrs:{id:"mermaid_382ee14d",graph:e.$dataBlock.mermaid_382ee14d}}),t("p",[e._v("由于以太网数据包的数据部分，最大长度为1500字节，当IP包过大时，会分割下来，但是每个分割包的头部都一样")]),e._v(" "),t("h2",{attrs:{id:"参考链接"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#参考链接"}},[e._v("#")]),e._v(" 参考链接")]),e._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/32059190",target:"_blank",rel:"noopener noreferrer"}},[e._v("OSI 7层模型和TCP/IP 4层模型"),t("OutboundLink")],1)])])],1)}),[],!1,null,null,null);"function"==typeof r&&r(_);n.default=_.exports}}]);