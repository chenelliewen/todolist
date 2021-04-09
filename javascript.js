

/* JavaScript
1.設定表單按鈕行為。*/
let section = document.querySelector("section");

let add = document.querySelector("form button");
add.addEventListener("click", e => {
    // 須設定資料會消失
    e.preventDefault();


    /*2.取得表單資料，並新增至表單下方。*/

    let form = e.target.parentElement;
    let todoText = form.children[0].value;
    let todoYear = form.children[1].value;
    let todoMonth = form.children[2].value;
    let todoDate = form.children[3].value;
    // 提示未輸入資料
    if (todoText === "") {
        alert("請輸入事項");
        return;
    }
    if (todoYear === "") {
        alert("請輸入年份");
        return;
    }
    if (todoMonth === "") {
        alert("請輸入月份");
        return;
    }
    if (todoDate === "") {
        alert("請輸入日期");
        return;
    }


    // console.log(todoText, todoYear, todoMonth, todoDate); //console.log測試

    let todo = document.createElement("div");
    todo.classList.add("todo");
    let text = document.createElement("p");
    text.classList.add("todo-text");
    text.innerText = todoText;
    let time = document.createElement("p");
    time.classList.add("todo-time");
    time.innerText = todoYear + "/" + todoMonth + "/" + todoDate;
    todo.appendChild(text);
    todo.appendChild(time);
    /*
    等同於
    <section>
        <div class="todo">
            <p class="todo-text"></p>
            <p class="todo-time"></p>
        </div>
    </section>
    */

    // 設定按鈕圖示
    let completeButton = document.createElement("button");
    completeButton.classList.add("complete");
    completeButton.innerHTML = '<i class="fas fa-check-double"></i>';
    //事項完成時標示記號
    completeButton.addEventListener("click", e => {
        let todoItem = e.target.parentElement;
        // add(只有新增功能)改成toggle(可新增可刪除)
        todoItem.classList.toggle("done");
    })

    let trashButton = document.createElement("button");
    trashButton.classList.add("trash");
    trashButton.innerHTML = '<i class="fas fa-poo"></i>';
    // 設定移除動畫與特效
    trashButton.addEventListener("click", e => {
        let todoItem = e.target.parentElement;
        todoItem.addEventListener("animationend", () => {
            // 刪除localStorage資料
            let text = todoItem.children[0].innerText;
            let myListArray = JSON.parse(localStorage.getItem("list"));
            myListArray.forEach((item, index) => {
                if (item.todoText == text) {
                    myListArray.splice(index, 1);
                    localStorage.setItem("list", JSON.stringify(myListArray));
                }
            })
            todoItem.remove();
        })
        todoItem.style.animation = "scaleDown 0.3s forwards";
    })

    todo.appendChild(completeButton);
    todo.appendChild(trashButton);

    // 設定事項動畫特效與事件 
    //須設在section前section.appendChild(todo);
    //動畫 動畫名稱 秒數 順向
    todo.style.animation = "scaleUp 0.8s forwards";

    // 將資料以陣列方式存入localStorage
    let myTodo = {
        todoText: todoText,
        todoYear: todoYear,
        todoMonth: todoMonth,
        todoDate: todoDate
    };

    let myList = localStorage.getItem("list");
    if (myList == null) {
        localStorage.setItem("list", JSON.stringify([myTodo]));
    } else {
        let myListArray = JSON.parse(myList);
        myListArray.push(myTodo);
        localStorage.setItem("list", JSON.stringify(myListArray));
    }

    // 測試 將資料以陣列方式存入localStorage
    console.log(JSON.parse(localStorage.getItem("list")));

    // 按下新增事項按鈕後清空輸入框
    // 須設在section前
    form.children[0].value = "";
    form.children[1].value = "";
    form.children[2].value = "";
    form.children[3].value = "";

    section.appendChild(todo);


});

// 建立按鈕功能
loadData();

function loadData() {
    // 重新開啟網頁時讀取localStorage資料
    let myList = localStorage.getItem("list");
    if (myList !== null) {
        let myListArray = JSON.parse(myList);
        myListArray.forEach(item => {

            // 複製上面 +item.
            let todo = document.createElement("div");
            todo.classList.add("todo");
            let text = document.createElement("p");
            text.classList.add("todo-text");
            text.innerText = item.todoText;
            let time = document.createElement("p");
            time.classList.add("todo-time");
            time.innerText = item.todoYear + "/" + item.todoMonth + "/" + item.todoDate;
            todo.appendChild(text);
            todo.appendChild(time);

            // 設定按鈕圖示
            let completeButton = document.createElement("button");
            completeButton.classList.add("complete");
            completeButton.innerHTML = '<i class="fas fa-check-double"></i>';
            //事項完成時標示記號
            completeButton.addEventListener("click", e => {
                let todoItem = e.target.parentElement;
                // add(只有新增功能)改成toggle(可新增可刪除)
                todoItem.classList.toggle("done");
            })

            let trashButton = document.createElement("button");
            trashButton.classList.add("trash");
            trashButton.innerHTML = '<i class="fas fa-poo"></i>';
            // 設定移除動畫與特效
            trashButton.addEventListener("click", e => {
                let todoItem = e.target.parentElement;
                todoItem.addEventListener("animationend", () => {

                    // 刪除localStorage資料(可在F12-Application 看到刪掉的正列排序)
                    let text = todoItem.children[0].innerText;
                    let myListArray = JSON.parse(localStorage.getItem("list"));
                    myListArray.forEach((item, index) => {
                        if (item.todoText == text) {
                            myListArray.splice(index, 1);
                            localStorage.setItem("list", JSON.stringify(myListArray));
                        }
                    })
                    todoItem.remove();
                })
                todoItem.style.animation = "scaleDown 0.3s forwards";
            })

            todo.appendChild(completeButton);
            todo.appendChild(trashButton);

            // 設定事項動畫特效與事件 
            //須設在section前section.appendChild(todo);
            //動畫 動畫名稱 秒數 順向
            todo.style.animation = "scaleUp 0.8s forwards";


            section.appendChild(todo);
        })
    }
}

// 建立按鈕功能
let sortButton = document.querySelector("div.sort button");
sortButton.addEventListener("click", () => {

    let sortedArray = mergeSort(JSON.parse(localStorage.getItem("list")));
    localStorage.setItem("list", JSON.stringify(sortedArray));

    let len = section.children.length;
    for (let i = 0; i < len; i++) {
        section.children[0].remove();
    }

    loadData();
})

// 建立比較函式
function mergeTime(arr1, arr2) {
    let result = [];
    let i = 0;
    let j = 0;
    while (i < arr1.length && j < arr2.length) {
        if (Number(arr1[i].todoYear) > Number(arr2[j].todoYear)) {
            result.push(arr2[j]);
            j++;
        } else if (Number(arr1[i].todoYear) < Number(arr2[j].todoYear)) {
            result.push(arr2[i]);
            i++;
        } else if (Number(arr1[i].todoYear) == Number(arr2[j].todoYear)) {
            if (Number(arr1[i].todoMonth) > Number(arr2[j].todoMonth)) {
                result.push(arr2[j]);
                j++;
            } else if (Number(arr1[i].todoMonth) > Number(arr2[j].todoMonth)) {
                result.push(arr2[j]);
                j++;
            } else if (Number(arr1[i].todoMonth) < Number(arr2[j].todoMonth)) {
                result.push(arr2[i]);
                i++;
            } else if (Number(arr1[i].todoMonth) == Number(arr2[j].todoMonth)) {
                if (Number(arr1[i].todoDate) > Number(arr2[j].todoDate)) {
                    result.push(arr2[j]);
                    j++;
                } else {
                    result.push(arr1[i]);
                    i++;
                }
            }
        }
    }
    while (i < arr1.length) {
        result.push(arr1[i]);
        i++;
    }
    while (j < arr2.length) {
        result.push(arr2[j]);
        j++;
    }
    return result;
}

function mergeSort(arr) {
    if (arr.length === 1) {
        return arr;
    } else {
        let middle = Math.floor(arr.length / 2);
        let right = arr.slice(0, middle);
        let left = arr.slice(middle, arr.length);
        return mergeTime(mergeSort(right), mergeSort(left));
    }
}
// 測試在console 函式裡的排序
console.log(mergeSort(JSON.parse(localStorage.getItem("list"))));