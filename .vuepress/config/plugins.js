module.exports = [
    "vuepress-plugin-mermaidjs",
    [
        require('./plugins/BgMusic'),
        {
          audios: [
            {
              name: '共同渡过',
              artist: '张国荣',
              url: 'http://www.ihaoge.net/kw/antiserver.kuwo.cn/anti.s?rid=MUSIC_27175854&response=res&format=mp3|aac&type=convert_url&br=128kmp3&agent=iPhone&callback=getlink&jpcallback=getlink.mp3',
              cover: '/music/Leslie.jpeg'
            },
          ]
        }
      ]
]