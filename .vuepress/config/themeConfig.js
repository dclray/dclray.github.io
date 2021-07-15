const sidebarNav = require("./theme/nav")
module.exports = {
    "sidebar":sidebarNav.sidebar,
    "nav":sidebarNav.nav,
    "type": "blog",
    "blogConfig":require("./theme/blogConfig") ,
    //"friendLink": require("./theme/friendLink"),
    "logo": "/logo.jpg",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "Devin",
    "authorAvatar": "/avatar.jfif",
    "record": "xxxx",
    "startYear": "2016",
}
