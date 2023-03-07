const addBtn = document.querySelector("#addBtn");
const editBtn = document.querySelector("#editBtn");
const delBtn = document.querySelector("#delBtn");
const input = document.querySelector("#input");

const toDoList = document.querySelector(".todoList__ul__wrap");
const todoSpan = document.querySelector(".todoList__span");


function addTag() {
    if (input.value.trim() == "") { // 공백처리
        alert('빈 칸을 입력하시오.');
    } else {
        let tag = '';

        tag += '        <li>';
        tag += '            <div class="todoList__item__wrap">';
        tag += '                <span class="todoList__span">' + input.value + '</span>';
        tag += '                <div class="todoList__item__btn">';
        tag += '                    <button id="editBtn">수정</button>';
        tag += '                    <button id="delBtn">삭제</button>';
        tag += '                </div>';
        tag += '            </div>';
        tag += '        </li>';

        toDoList.insertAdjacentHTML("beforeend", tag); // 요소추가

        input.value = ''; // input 공백처리
    }
}

//1. 글 추가기능

// 1-1. 글 추가기능 - 버튼클릭 시
addBtn.addEventListener("click", function () {
    addTag();
});

// 1-2. 글 추가기능 - 엔터키 발생 시
input.addEventListener("keydown", function () {
    if (window.event.keyCode == 13) { // 엔터키 누르면 실행
        addTag();
    }
})

