const game = (() => {
    const grid = document.querySelectorAll(".grid");
    grid.forEach(square => square.addEventListener("click", () => {
        if (square.innerText !== "") {
            return
        }
        square.innerText = "X";
        setTimeout(function () {
            function fallback() {
                const gameboard = Array.from(grid);
                for (const ai of gameboard) {
                    if (ai.innerText === "") {
                        ai.innerText = "O"
                        break;
                    }
                }
            }
            switch (square.id) {
                case "0":
                    if (grid[1].innerText === "") {
                        grid[1].innerText = "O";
                    }
                    else {
                        fallback();
                    }
                    break;
                case "1":
                    if (grid[2].innerText === "") {
                        grid[2].innerText = "O";
                    }
                    else {
                        fallback();
                    }
                    break;
                case "2":
                    if (grid[4].innerText === "") {
                        grid[4].innerText = "O";
                    }
                    else {
                        fallback();
                    }
                    break;
                case "3":
                    if (grid[6].innerText === "") {
                        grid[6].innerText = "O";
                    }
                    else {
                        fallback();
                    }
                    break;
                case "4":
                    if (grid[3].innerText === "") {
                        grid[3].innerText = "O";
                    }
                    else {
                        fallback();
                    }
                    break;
                case "5":
                    if (grid[8].innerText === "") {
                        grid[8].innerText = "O";
                    }
                    else {
                        fallback();
                    }
                    break;
                case "6":
                    if (grid[7].innerText === "") {
                        grid[7].innerText = "O";
                    }
                    else {
                        fallback();
                    }
                    break;
                case "7":
                    if (grid[8].innerText === "") {
                        grid[8].innerText = "O";
                    }
                    else {
                        fallback();
                    }
                    break;
                case "8":
                    if (grid[7].innerText === "") {
                        grid[7].innerText = "O";
                    }
                    else {
                        fallback();
                    }
                    break;
                default:
            }
        }, 200)
    }))
})();
