const li_board = document.querySelector("header ul li");
const main = document.querySelector("main");

const board_list = [
    "인사캠 자유게시판",
    "자과캠 자유게시판",
    "브로리에게 물어봐",
    "정보게시판",
    "취업/진로",
    "동아리/학회",
];

let board_flag = 0;

const show_board = () => {
    if (!board_flag) {
        const board_list_div = document.createElement("div");
        board_list_div.className = "board__list__div";
        board_list.forEach((element) => {
            let board_span = document.createElement("span");
            board_span.innerejs = element;
            board_list_div.appendChild(board_span);
        });
        board_flag = 1;
        li_board.style.color = "red";
        main.appendChild(board_list_div);
    } else {
        board_flag = 0;
        li_board.style.color = "black";
        board_list_div = document.querySelector(".board__list__div");
        main.removeChild(board_list_div);
    }
};

li_board.onclick = show_board;