
var container = [[0,0,0],[0,0,0],[0,0,0]];

//玩家点击，获得坐标
function Player(element){
    console.log(element.id);
    var a = element.id.split('')[0];
    var b = element.id.split('')[1];
    if (container[a][b] === 0){
        container[a][b] = 1;
        illustration(element.id,1);
        document.getElementById(a+''+b).innerHTML="<img width='70' src=circle.jpg>"
        Win_lose();
        send_server(container);
    }
    else{
        alert('电脑出')
    }
}

function illustration(id,who) {
    var bigImg = document.createElement("img");		//创建一个img元素
    if(who===1){
        bigImg.src="circle.jpg";   //给img元素的src属性赋值
    }else {
        bigImg.src="cross.jpg";
    }
    bigImg.width=70;
    var myDiv = document.getElementById(id); //获得dom对象
    console.log(myDiv);
    myDiv.appendChild(bigImg);  	//为dom添加子元素img
}

function send_server(checkerboard) {
    $.ajax({
        type: "GET",
        url: "",
        data: {
            container: JSON.stringify(checkerboard)
        },
        async: false,
        dataType: "JSON",
        success: function (Data) {
            computer(Data);
        }
    });
}

function computer(Data) {
    if (Data.next()!=null){
        var a = Data.next[0];
        var b = Data.next[0];
        var id = a+b;
        illustration(id,-1);
        container[a][b]=-1;
        Win_lose();
    }
}
function Win_lose() {
    for (var i = 0; i < 3; i++){
        if(container[i][0]+container[i][1]+container[i][2]===3){
            alert('你赢了,开始下一局')
            reloadPage()
        }
        if(container[i][0]+container[i][1]+container[i][2]===-3){
            alert('电脑赢了，开始下一局')
            reloadPage()
        }
        if(container[0][i]+container[1][i]+container[2][i]===3){
            alert('你赢了，开始下一局')
            reloadPage()
        }
        if(container[0][i]+container[1][i]+container[2][i]===-3){
            alert('电脑赢了，开始下一局')
            reloadPage()
        }
    }
    if(container[0][0]+container[1][1]+container[2][2]===3){
        alert('你赢了，开始下一局')
        reloadPage()
    }
    if(container[0][0]+container[1][1]+container[2][2]===-3){
        alert('电脑赢了，开始下一局')
        reloadPage()
    }
    if(container[0][2]+container[1][1]+container[2][0]===3){
        alert('你赢了，开始下一局')
        reloadPage()
    }
    if(container[0][2]+container[1][1]+container[2][0]===-3){
        alert('电脑赢了，开始下一局')
        reloadPage()
    }
}

function reloadPage(){
    location.reload()
}
