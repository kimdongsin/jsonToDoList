document.addEventListener("DOMContentLoaded", function () {

    const addBtn = document.querySelector("#addBtn");
    const input = document.querySelector("#input");

    const toDoList = document.querySelector(".todoList__ul__wrap");

    function addTag() {
        if (input.value.trim() == "") { // 공백처리
            alert('빈 칸을 입력하시오.');
        } else {
            let tag = '';

            tag += '        <li>';
            tag += '            <div class="todoList__item__wrap">';
            tag += '                <div class="todoList__item__str">                                            ';
            tag += '                    <span class="todoList__span">' + input.value + '</span>';
            tag += '                    <input type="text" class="todoList__correction">';
            tag += '                </div>                                            ';
            tag += '                <div class="todoList__item__btn">';
            tag += '                    <button class="editBtn">수정</button>';
            tag += '                    <button class="delBtn">삭제</button>';
            tag += '                </div>';
            tag += '            </div>';
            tag += '        </li>';

            toDoList.insertAdjacentHTML("beforeend", tag); // 요소추가

            input.value = ''; // input 공백처리
        }
    }

    // 1. 글 추가기능

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

    // 2. 수정기능

    /*
        1. 수정버튼 클릭 시
        2. span.remove()
        3. input 생성 후
        4. input에서 text수정 후 엔터나 수정버튼 클릭 시
        5. 수정된 text로 span요소추가
    
    */

    let count = 1;

    // 2-1. 수정기능 - 수정 버튼 클릭 시 수정 할 input 보여줌.
    document.addEventListener("click", function (e) { // 문서에서 이벤트 타겟 시


        if (e.target.className == 'editBtn') {
            if (e.target.parentElement.parentElement.querySelector(".todoList__span").style.display == "block" || e.target.parentElement.parentElement.querySelector(".todoList__span").style.display == "") {
                // ".todoList__span"의 display가 block 혹은 "" 공백일 때 실행
                e.target.parentElement.parentElement.querySelector(".todoList__span").style.display = "none";
                // ".todoList__span" 요소의 display = none으로 변경
                e.target.parentElement.parentElement.querySelector(".todoList__correction").style.display = "block";
                // ".todoList__correction" 요소의 display = block으로 변경
                e.target.parentElement.parentElement.querySelector(".todoList__correction").value = e.target.parentElement.parentElement.querySelector(".todoList__span").innerText;
                // ".todoList__correction"의 값에 ".todoList__span"의 텍스트 값을 저장

            } else if (e.target.parentElement.parentElement.querySelector(".todoList__span").style.display == "none") {
                // ".todoList__span"의 display가 none일 때
                e.target.parentElement.parentElement.querySelector(".todoList__span").style.display = "block";
                // ".todoList__span"의 display를 block으로 변경
                e.target.parentElement.parentElement.querySelector(".todoList__correction").style.display = "none";
                // ".todoList__correction"의 display를 none으로 변경
            }

            e.target.parentElement.parentElement.querySelector(".todoList__span").innerText = e.target.parentElement.parentElement.querySelector(".todoList__correction").value;
            // 수정버튼 클릭 시 span의 값을 input값에 넣어줌. 기존 값을 넣어주는 기능
        }
    });


    // 2-2. 수정기능 - 수정내용을 입력 후 엔터 키 누르면 값 수정됨.
    document.addEventListener('keydown', function (e) {
        if (window.event.keyCode == 13) { // 엔터키 누르면 실행
            if (e.target.value == undefined) { // undefined 방지 
                return false; // undefined를 만나면 false를 return 시켜서 종료시킴.
            }


            if (e.target.parentElement.parentElement.querySelector(".todoList__correction").value.trim() != "") {
                // input 값이 공백이 아니라면
                e.target.parentElement.querySelector(".todoList__span").innerText = e.target.value;
                // span의 텍스트에 타겟의 값 (input값)을 저장
            }

            e.target.parentElement.querySelector(".todoList__span").innerText = e.target.value;
            // span의 텍스트에 타겟의 값 (input값)을 저장
            e.target.parentElement.querySelector(".todoList__span").style.display = "block";
            // span의 display를 block으로 변경
            e.target.parentElement.querySelector(".todoList__correction").style.display = "none";
            // input의 display를 none으로 변경

        }
    });


});