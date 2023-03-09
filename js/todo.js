document.addEventListener("DOMContentLoaded", function () {
    const addBtn = document.querySelector("#addBtn");
    const input = document.querySelector("#input");
    const toDoList = document.querySelector(".todoList__ul__wrap");

    const url = 'http://localhost:3000/todos/';

    function date() { // 현재 날짜, 시간을 반환 해주는 함수
        const today = new Date();

        const year = today.getFullYear();
        const month = ('0' + (today.getMonth() + 1)).slice(-2);
        const day = ('0' + today.getDate()).slice(-2);

        const hours = today.getHours();
        const minutes = today.getMinutes();
        const seconds = today.getSeconds();
        const dateString = year + '-' + month + '-' + day + ', ' + hours + '시 ' + minutes + '분 ' + seconds + '초';

        return dateString;

    }

    function addTag() { // input 공백처리와 통신 데이터처리하는 함수
        if (input.value.trim() == "") { // 공백처리
            alert('빈 칸을 입력하시오.');
        } else {

            $.ajax({ // 추가
                url: url,
                data: {
                    value: input.value,
                    del: false,
                    date: date(),
                },
                type: "POST",
                success: function (res) {
                    addTagPlus(res.value, date(), res.id);
                    input.value = ''; // input 공백처리

                },
                error: function (e) {
                    console.log(e);
                },

            });
        }
    }

    function addTagPlus(value, date, id) { // 태그추가 함수
        let tag = '';

        tag += '        <li>';
        tag += '            <div class="todoList__item__wrap">';
        tag += '                <div class="todoList__item__str">';
        tag += '                    <span class="todoList__span">' + value + '</span>';
        tag += '                    <input type="text" class="todoList__correction">';
        tag += '                    <span class="dateSpan">' + date + '</span>';
        tag += '               </div>                                            ';
        tag += '                <div class="todoList__item__btn" id="' + id + '">';
        tag += '                    <button class="editBtn">수정</button>';
        tag += '                    <button class="delBtn">삭제</button>';
        tag += '                </div>';
        tag += '            </div>';
        tag += '        </li>';

        toDoList.insertAdjacentHTML("beforeend", tag); // 요소추가
    }


    function editCommon(spanElement, inputElement, e) {
        // 수정 클릭, 엔터
        $.ajax({
            url: url + e.target.closest(".todoList__item__wrap").querySelector(".todoList__item__btn").id,
            type: 'PATCH',
            data: {
                value: inputElement.value,
                date: date(),
            },
            success: function (res) {
                console.log(res);

                e.target.closest(".todoList__item__wrap").querySelector(".dateSpan").innerText = res.date;
                // 수정된 현재 시간으로 화면에 업데이트

                if (spanElement.style.display == "block" || spanElement.style.display == "") {
                    // ".todoList__span"의 display가 block 혹은 "" 공백일 때 실행
                    spanElement.style.display = "none";
                    // ".todoList__span" 요소의 display = none으로 변경
                    inputElement.style.display = "block";
                    // ".todoList__correction" 요소의 display = block으로 변경

                    inputElement.value = spanElement.innerText;
                    // ".todoList__correction"의 값에 ".todoList__span"의 텍스트 값을 저장

                } else if (spanElement.style.display == "none") { // span이 display: none일 때
                    if (inputElement.value.trim() == "") {  // input.display = block상태에서 input값이 input값이 공백으로 넘어왔을 때
                        return false; // false로 return해서 종료시키므로, 공백인 상태에서 수정이 되지 않게 방지한다.
                    }

                    // ".todoList__span"의 display가 none일 때
                    spanElement.style.display = "block";
                    // ".todoList__span"의 display를 block으로 변경
                    inputElement.style.display = "none";
                    // ".todoList__correction"의 display를 none으로 변경
                }

                spanElement.innerText = inputElement.value;
                // 수정버튼 클릭 시 span의 값을 input값에 넣어줌. 기존 값을 넣어주는 기능

                /*
                1. 수정하면 
                2. 해당 id.value = spanElement.innerText값을 저장한다.
        
                */

            },
            error: function (e) {
                console.log(e);
            }

        });
    }


    $.ajax({ // 조회
        url: url,
        type: 'GET',
        data: {
            del: false,
        },
        success: function (res) {
            console.log(res);

            for (let i = 0; i < res.length; i++) {
                addTagPlus(res[i].value, res[i].date, res[i].id);
            }

        },
        error: function (e) {
            alert("에러");
            console.log(e);
        }

    });


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

    // 2-1. 수정기능 - 수정 버튼 클릭 시 수정 할 input 보여줌.
    document.addEventListener("click", function (e) { // 문서에서 이벤트 타겟 시
        const spanElement = e.target.closest('.todoList__item__wrap').querySelector(".todoList__span")
        const inputElement = e.target.closest('.todoList__item__wrap').querySelector(".todoList__correction");
        const liElement = e.target.closest('li');
        // const dateSpan = e.tartget.parentElement.parentElement.querySelector(".dateSpan");

        // if (e.target.className == 'editBtn') {
        //     // 수정
        //     ;

        // }

        e.target.className == 'editBtn' ? editCommon(spanElement, inputElement, e) : '' ;


        // 3. 삭제기능
        if (e.target.className == 'delBtn') {

            // 삭제
            $.ajax({
                url: url + e.target.parentElement.id,
                type: 'PATCH',
                data: {
                    del: true,
                },
                success: function (res) {
                    console.log(res);
                    liElement.remove();
                },
                error: function (e) {
                    console.log(e);
                }

            });
        }
    });


    // 2-2. 수정기능 - 수정내용을 입력 후 엔터 키 누르면 값 수정됨.
    document.addEventListener('keydown', function (e) {
        const inputElement = e.target.closest('.todoList__item__wrap').querySelector(".todoList__correction");
        const spanElement = e.target.closest('.todoList__item__wrap').querySelector(".todoList__span");

        if (window.event.keyCode == 13) { // 엔터키 누르면 실행
            if (e.target.value == undefined || inputElement.value.trim() == "") { // undefined 방지 
                return false; // undefined를 만나면 false를 return 시켜서 종료시킴.
            }

            editCommon(spanElement, inputElement, e);

        }
    });
});

/*

PUT = 덮어쓰기 ( 모든 data값을 정의해줘야 덮어써짐. )
PATCH = 수정( 필요한 값만 data로 넣어주면 됨. )

*/