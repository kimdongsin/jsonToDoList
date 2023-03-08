document.addEventListener("DOMContentLoaded", function () {
    const addBtn = document.querySelector("#addBtn");
    const input = document.querySelector("#input");
    const toDoList = document.querySelector(".todoList__ul__wrap");



    $.ajax({ // 조회
        url : 'http://localhost:3000/todos',
        type: 'GET',
        data: {
            del: false,
        },
        success : function(res) {
            console.log(res);
            
            for(let i = 0; i < res.length; i++){
                let tag = '';
                
                tag += '        <li>';
                tag += '            <div class="todoList__item__wrap">';
                tag += '                <div class="todoList__item__str">';
                tag += '                   <span class="todoList__span">' + res[i].value  + '</span>';
                tag += '                    <input type="text" class="todoList__correction">';
                tag += '                </div>';
                tag += '                <div class="todoList__item__btn" id="'+ res[i].id +'">';
                tag += '                    <button class="editBtn">수정</button>';
                tag += '                    <button class="delBtn">삭제</button>';
                tag += '                </div>';
                tag += '            </div>';
                tag += '        </li>';
                
                toDoList.insertAdjacentHTML("beforeend", tag); // 요소추가

            }

        },
        error : function(e) {
            alert("에러");
            console.log(e);
        }
    
    });



    function addTag() { 
        if (input.value.trim() == "") { // 공백처리
            alert('빈 칸을 입력하시오.');
        } else {

            $.ajax({ // 추가
                url : 'http://localhost:3000/todos',
                data: {
                    value: input.value,
                    del: false,
                },
                type: "POST",
                success : function(res) {

                    let tag = '';
                    
                    tag += '        <li>';
                    tag += '            <div class="todoList__item__wrap">';
                    tag += '                <div class="todoList__item__str">';
                    tag += '                    <span class="todoList__span">' + res.value + '</span>';
                    tag += '                    <input type="text" class="todoList__correction">';
                    tag += '               </div>                                            ';
                    tag += '                <div class="todoList__item__btn" id="'+ res.id +'">';
                    tag += '                    <button class="editBtn">수정</button>';
                    tag += '                    <button class="delBtn">삭제</button>';
                    tag += '                </div>';
                    tag += '            </div>';
                    tag += '        </li>';
                    
                    toDoList.insertAdjacentHTML("beforeend", tag); // 요소추가
                    input.value = ''; // input 공백처리
                    
                },
                error : function(e) {
                    console.log(e);
                },
                
            });


            
            
        }
    }

    // 1. 글 추가기능

    // 1-1. 글 추가기능 - 버튼클릭 시
    addBtn.addEventListener("click", function (e) {
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
        const spanElement = e.target.parentElement.parentElement.querySelector(".todoList__span");
        const inputElement = e.target.parentElement.parentElement.querySelector(".todoList__correction");
        const liElement = e.target.parentElement.parentElement.parentElement;


        

        if (e.target.className == 'editBtn') {


            if (spanElement.style.display == "block" || spanElement.style.display == "") {
                // ".todoList__span"의 display가 block 혹은 "" 공백일 때 실행
                spanElement.style.display = "none";
                // ".todoList__span" 요소의 display = none으로 변경
                inputElement.style.display = "block";
                // ".todoList__correction" 요소의 display = block으로 변경
                
                inputElement.value = spanElement.innerText;
                // ".todoList__correction"의 값에 ".todoList__span"의 텍스트 값을 저장

                
                
            } else if (spanElement.style.display == "none") { // span이 display: none일 때
                if(inputElement.value.trim() == ""){  // input.display = block상태에서 input값이 input값이 공백으로 넘어왔을 때
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


            // 수정
            $.ajax({
                url : 'http://localhost:3000/todos/' + e.target.parentElement.id,
                type: 'PATCH',
                data: {
                    value : spanElement.innerText,
                },
                success : function(res) {
                    console.log(res);
                    
                    /*
                    1. 수정하면 
                    2. 해당 id.value = spanElement.innerText값을 저장한다.

                    */
                    
                },
                error : function(e) {
                    console.log(e);
                }

            });
            
        }


        // 3. 삭제기능
        if(e.target.className == 'delBtn'){

            // 수정 , 삭제
                $.ajax({
                    url : 'http://localhost:3000/todos/' + e.target.parentElement.id,
                    type: 'PATCH',
                    data: {
                        del : true,
                    },
                    success : function(res) {
                        console.log(res);
                        liElement.remove();
                    },
                    error : function(e) {
                        console.log(e);
                    }
                
                });

        }
    });


    // 2-2. 수정기능 - 수정내용을 입력 후 엔터 키 누르면 값 수정됨.
    document.addEventListener('keydown', function (e) {
        const keyInput = e.target.parentElement.parentElement.querySelector(".todoList__correction");
        const keySpan = e.target.parentElement.querySelector(".todoList__span");

        if (window.event.keyCode == 13) { // 엔터키 누르면 실행
            if (e.target.value == undefined || keyInput.value.trim() == "") { // undefined 방지 
                return false; // undefined를 만나면 false를 return 시켜서 종료시킴.
            }

            // span의 텍스트에 타겟의 값 (input값)을 저장
            keySpan.style.display = "block";
            // span의 display를 block으로 변경
            keyInput.style.display = "none";
            // input의 display를 none으로 변경

            keySpan.innerText = keyInput.value;
            // keySpan텍스트에 keyInput값 저장.


            // 수정
            $.ajax({
                url : 'http://localhost:3000/todos/' + e.target.parentElement.parentElement.parentElement.querySelector(".todoList__item__btn").id,
                type: 'PATCH',
                data: {
                    value : keySpan.innerText,
                },
                success : function(res) {
                    console.log(res);
                    
                    /*
                    1. 수정하면 
                    2. 해당 id.value = spanElement.innerText값을 저장한다.

                    */
                    
                },
                error : function(e) {
                    console.log(e);
                }

            });

        }
    });
});





/*

PUT = 덮어쓰기 ( 모든 data값을 정의해줘야 덮어써짐. )
PATCH = 수정( 필요한 값만 data로 넣어주면 됨. )


*/






// // 조회
// $.ajax({
//     url : 'http://localhost:3000/todos',
//     type: 'GET',
//     data: {
//         delete: false
//     },
//     success : function(res) {
//         console.log(res);
//     },
//     error : function(e) {
//         alert("에러");
//         console.log(e);
//     }

// });

// //추가 
// $('#addBtn').on('click', function() {
    
// });

// // 수정
// $('#editBtn').on('click', function() {
//     $.ajax({
//         url : 'http://localhost:3000/todos/3',
//         // type: 'PUT',
//         data: {
//             title: '6666666688888888888',
//             body: '8888',
//             delete: true,
//         },
//         success : function(res) {
//             console.log(res);
//         },
//         error : function(e) {
//             console.log(e);
//         }
    
//     });
// });

// 삭제
// $('#delBtn').on('click', function() {
//     $.ajax({
//         url : 'http://localhost:3000/todos/5',
//         type: 'DELETE',
//         success : function(res) {
//             console.log(res);
//         },
//         error : function(e) {
//             console.log(e);
//         }
    
//     });
// });