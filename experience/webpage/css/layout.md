---
title: 布局
date: 2021-09-17
sidebar: auto
---
## flex
### 容器的属性
1. flex-direction
2. flex-wrap
3. flex-flow
4. justify-content
5. aligin-items
6. aligin-content
#### flex-direction 
该属性决定主轴的方向（即项目的排列方向）
flex-direction:row | row-reverse| column | column-reverse
#### flex-wrap
该属性定义了如果一条轴线排不下，如何换行
flex-wrap:nowrap| wrap | wrap-reverse
#### flex-flow
该属性是flex-direction和flex-wrap的简写 默认为 row nowrap
flex-flow: row nowrap;
#### justify-content
该属性定义了项目在主轴上的对齐方式
justify-content:flex-start | flex-end | center | space-between| space-around
#### align-items
该属性定义项目在交叉轴上如何对齐
aligin-items:flex-start | flex-end| center|baseline| stretch;
#### align-content
该属性定义了多根轴线的对齐方式，如果项目只有一根轴线，该属性不起作用
align-content:flex-start | flex-end| center| space-between| space-around|stretch;
### 项目的属性
1. order
2. flex-grow
3. flex-shrink
4. flex-basis
5. flex
6. align-self

#### order
该属性定义项目的排列顺序，数值越小，排列越靠前，默认为0
order: <integer>
#### flex-grow
该属性定义了项目的放大比例，默认为0，即如果存在剩余空间，也不放大，如果为1，项目将等分剩余空间
#### flex-shrink
该属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小
#### flex-basis
该属性定义了在分配多余空间之前，项目占据的主轴空间默认值为auto
flex-basis:<length> | auto;
#### flex
该属性是flex-grow flex-shrink flex-basis简写，默认值为 0 1 auto
#### align-self
该属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性，默认值auto,表示继承父元素的align-items属性
align-self:auto | flex-start| flex-end| center| baseline| stretch
## flex布局和grid布局的区别
flex布局是轴线布局，只能指定项目针对轴线的位置，可以看作是一维布局。grid布局则是将容器划分成行和列，产生单元格，然后指定项目所在的单元格，可以看作是二维布局，grid布局要比flex布局强大
## grid
### 容器和项目
采用网格布局的区域，称为容器（container）。容器内部采用网格定位的子元素，称为项目（item)
### 行和列
容器里面的水平区域称为行（row），垂直区域称为列（column）
### 单元格
行和列的交叉区域，称为单元格（cell）
### 网格线
划分网格的线，称为网格线（grid line）
### 容器的属性
grid布局的属性分为两类，一类定义在容器上，称为容器属性；另一类定义在项目上面，称为项目属性
#### display
该属性指定一个容器采用网格布局
display:grid;
默认情况下，容器元素都是块级元素，但也可以改为行内元素
display:inline-grid;
::: tip
设为网格布局后，容器子元素的float、display:inline-block、display:table-cell、vertical-align和column-*等设置都将失效
:::
#### grid-template-columns grid-template-rows
容器指定了网格布局以后，接着就要划分行和列，grid-template-columns属性定义每一列的列宽，grid-template-rows属性定义每一行的行高,值除了使用绝对单位也可以使用百分比
```css
.container{
    display:grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows:100px 100px 100px;
} 
// 可以简写
.container{
    display:grid;
    grid-template-columns:repeat(3,33.33%);
    grid-template-rows:repeat(3,33.33%);
}
// auto-fill
.container{
    display:grid;
    grid-template-columns:repeat(auto-fill,100px)
}
// fr
.container{
    display:grid;
    grid-template-columns:1fr 1fr;
}
// minmax()
.container{
    display:grid;
    grid-template-columns:1fr 1fr minmax(100px,1fr);
}
// auto
.container{
    display:grid;
    grid-template-columns:100px auto 100px;
}
// 网格线名称 为网格线命名
.container{
    display:grid;
    grid-template-columns:[c1] 100px [c2] 100px [c3] auto [c4];
    grid-template-rows:[r1] 100px [r2] 100px [r3] auto [r4];
}
```
auto-fill 表示每列宽度100px,然后自动填充，知道容器不能放置更多的列</br>
fr fraction片段的意思，如果两列宽度分别为1fr 1fr，表示两者等宽平分，1fr,2fr，表示后者是前者两倍</br>
minmax(100px,1fr)表示列宽不小于100px，不大于1fr</br>
auto关键字，表示第二列宽度由浏览器自己决定长度
#### row-gap column-gap gap
row-gap 属性设置行与行的间隔（行间隔）column-gap列间距</br>
gap是row-gap和column-gap的合并简写</br>
gap: <row-gap> <column-gap>;
