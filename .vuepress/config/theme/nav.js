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
            "text": "Docs",
            "icon": "reco-message",
            "items": [
                {
                    "text": "基础",
                    "link": "/docs/base/"
                },
                {
                    "text": "框架",
                    "link": "/docs/frame/"
                },
                {
                    "text": "工程化",
                    "link": "/docs/engine/"
                },
                {
                    "text": "业务",
                    "link": "/docs/business/"
                },
            ]
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
        "/docs/base/": [
           {
                title:"基础篇-杂谈",
                collapsable:false,
                children:[
                    "",
                    "theme",
                    "plugin",
                ]
           },
           {
                title:"计算机",
                collapsable:false,
                children:[
                    ["computer/","计算机知识"] ,
                    "computer/base",
                    "computer/algorithm"
                ]
            },  
            {
                title:"JavaScript",
                collapsable:false,
                children:[
                   ["js/","JavaScript知识"] ,
                    "js/mastermethod",
                    "js/string"  
                ]
            },  
        ],
        "/docs/frame/": [
            "",
            "theme",
            "plugin",
            "api"
        ],
        "/docs/engine/": [
            {
                title:"工程化",
                collapsable:false,
                children:[
                    "",
                    "theme",
                    "plugin",
                    "api"
                ]
            },
            {
                title:"Webpack",
                collapsable:false,
                children:[
                    ["webpack/","Webpack知识"],
                    "webpack/flow"
                ]
            }
           
        ],
        "/docs/business/":[
            {
                title:"业务",
                collapsable:false,
                children:[
                    "",
                    "theme",
                    "plugin",
                    "api"
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