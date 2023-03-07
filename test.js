// 조회
$.ajax({
    url : 'http://localhost:3000/todos',
    type: 'GET',
    data: {
        delete: false
    },
    success : function(res) {
        console.log(res);
    },
    error : function(e) {
        alert("에러");
        console.log(e);
    }

});

//추가 
$('#addBtn').on('click', function() {
    $.ajax({
        url : 'http://localhost:3000/todos',
        data: {
            
        },
        success : function(res) {
            console.log(res);
        },
        error : function(e) {
            console.log(e);
        }
    
    });
});

// 수정
$('#editBtn').on('click', function() {
    $.ajax({
        url : 'http://localhost:3000/todos/3',
        // type: 'PUT',
        data: {
            title: '6666666688888888888',
            body: '8888',
            delete: true,
        },
        success : function(res) {
            console.log(res);
        },
        error : function(e) {
            console.log(e);
        }
    
    });
});

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