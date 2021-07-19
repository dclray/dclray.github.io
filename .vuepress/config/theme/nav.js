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
        "/docs/frame/": [
            "",
            "theme",
            "plugin",
            "api"
        ],
        "/docs/base/": [
            "",
            "theme",
            "plugin",
            {
                tilte:"js杂谈",
                collapsable:false,
                children:[
                   ["js/","js基础"] ,
                    "js/mastermethod"
                ]
            },
            
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
                    ["webpack/","基础"],
                    "webpack/flow"
                ]
            }
           
        ]
    },
}