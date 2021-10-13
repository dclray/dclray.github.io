module.exports = {
    "nav": [
        {
            "text": "首页",
            "link": "/",
            "icon": "reco-home"
        },
        {
            "text": "TimeLine",
            "link": "/timeline/",
            "icon": "reco-date"
        },

        {
            "text": "心得",
            "icon": "reco-message",
            "items": [
                {
                    "text": "计算机",
                    "link": "/experience/computer/"
                },
                {
                    "text": "数据结构和算法",
                    "link": "/experience/datastructure/"
                },
                {
                    "text": "浏览器",
                    "link": "/experience/browser/"
                },
                {
                    "text": "网络",
                    "link": "/experience/network/"
                },
                {
                    "text": "网页",
                    "link": "/experience/webpage/"
                },
                {
                    "text": "框架",
                    "link": "/experience/frame/"
                },
                {
                    "text": "工程化",
                    "link": "/experience/engine/"
                },
                {
                    "text": "容器化",
                    "link": "/experience/container/"
                },
                {
                    "text": "业务",
                    "link": "/experience/business/"
                },
            ]
        },
        {
            "text": "资源",
            "link": "/resources/list",
            "icon": "reco-api"
        },
        {
            "text": "GitHub",
            "icon": "reco-github",
            "link": "https://github.com/dclray/dclray.github.io"
        }
        // {
        //   "text": "Contact",
        //   "icon": "reco-message",
        //   "items": [
        //     {
        //       "text": "GitHub",
        //       "link": "https://github.com/recoluan",
        //       "icon": "reco-github"
        //     }
        //   ]
        // }
    ],
    "sidebar": {
        "/experience/computer/": [
           {
                title:"计算机",
                collapsable:false,
                children:[
                    ["","计算机导航"],
                    "base",
                ]
            },
           
        ],
        "/experience/datastructure/":[
            {
                title:"数据结构和算法",
                collapsable:false,
                children:[
                    ["","数据机构和算法导航"],
                    "structure",
                    "algorithm"
                ]
            },
        ],
        "/experience/browser/": [
             {
                 title:"浏览器",
                 collapsable:false,
                 children:[
                     ["","浏览器导航"],
                     "framework",
                     "work",
                     "tabcommunication",
                     "hashhistory",
                     "worker"
                 ]
             },  
         ],

         "/experience/network/": [
            {
                title:"网络",
                collapsable:false,
                children:[
                    ["","网络导航"],
                    "netmodle",
                    "tcp",
                    "tcpconnect",
                    "http",
                    "websocket",
                    "security",
                    "xhr"
                ]
            },  
            
        ],
        "/experience/webpage/": [
            ["","网页导航"],
            "optimize",
            {
                title:"HTML",
                children:[
                    ["html/","HTML导航"]
                ]
            },  
            {
                title:"CSS",
                children:[
                    ["css/","CSS导航"],
                    "css/layout"
                ]
            },  
            {
                title:"JavaScript",
                children:[
                   ["js/","JavaScript导航"],
                   {
                       title:"JavaScript核心概念",
                       children:[
                        "js/context",
                        "js/declaration",
                        "js/scope",
                        "js/closure"
                       ]
                   },
                    "js/mastermethod",
                    "js/string",
                ]
            },
           
        ],

        "/experience/frame/": [
            ["","框架导航"],
            {
                title:"Vue",
                collapsable:false,
                children:[
                    ["vue/","Vue导航"],
                    "vue/interview"
                ]
            },
            {
                title:"React",
                collapsable:false,
                children:[
                    ["react/","React导航"],
                    "react/principle",
                    "react/hooks"
                ]
            }
        ],
        "/experience/engine/": [
            {
                title:"工程化",
                collapsable:false,
                children:[
                    ["","工程化导航"],
                ]
            },
            {
                title:"Webpack",
                collapsable:false,
                children:[
                    ["webpack/","Webpack导航"],
                    "webpack/flow",
                    "webpack/principle",
                    "webpack/codesplit",
                    "webpack/treeshaking",
                ]
            }
           
        ],
        "/experience/container/":[
            {
                title:"容器化",
                collapsable:false,
                children:[
                    ["","容器化导航"],
                    "kubernetes",
                    "helm",
                    "docker"
                ]
            },  
            
        ],
        "/experience/business/":[
            {
                title:"业务",
                collapsable:false,
                children:[
                    ["","业务导航"]
                ]
            },

            {
                title:"上传",
                collapsable:false,
                children:[
                   ["upload/","上传知识"] ,
                    "upload/crc"
                ]
            },
        ]
    },
}