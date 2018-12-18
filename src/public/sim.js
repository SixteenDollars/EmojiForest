function forestGenerate(content) {
    const forest = [];
    if (content.length === 0) {
        const possible = ["", "🌲", "🌳", "🌴", "🌵", "🌶", "🌷", "🌸", "🌹", "🌺", "🌻", "🌼", "🌽", "🌾", "🌿", "🍀", "🍁", "🍂", "🍃"];
        for (let i = 0; i < 8; i++) {
            let text = '';
            for (let i = 0; i < 8; i++) {
                text += possible[Math.floor(Math.random() * possible.length)];
            }
            forest.push(text);
        }
    }
    else {
        const possible = [...content, ""];
        for (let i = 0; i < 8; i++) {
            let text = '';
            for (let i = 0; i < 8; i++) {
                text += possible[Math.floor(Math.random() * possible.length)];
            }
            forest.push(text);
        }
    }

    for (let i = 0; i < forest.length; i++) {
        let row = document.createElement("div");
        row.textContent = forest[i];
        row.addEventListener("click", function () {
            row.style.backgroundColor = "grey";
            row.setAttribute("pinned", "yes");
        });

        document.getElementById("sim").appendChild(row);
    }
    return forest;
}

function forestGenerate1(content) {
    let possible = [];
    if (content.length === 0) {
        possible = ["", "🌲", "🌳", "🌴", "🌵", "🌶", "🌷", "🌸", "🌹", "🌺", "🌻", "🌼", "🌽", "🌾", "🌿", "🍀", "🍁", "🍂", "🍃"];
    }
    else {
        possible = [...content, ""];
    }

    let text = '';
    for (let i = 0; i < 8; i++) {
        text += possible[Math.floor(Math.random() * possible.length)];
    }

    let row = document.createElement("div");
    row.textContent = text;
    row.addEventListener("click", function () {
        row.style.backgroundColor = "grey";
        row.setAttribute("pinned", "yes");
    });

    return row;
}

function simpsonsShow(forest) {
    const simpsonsIndex = forest =>
        1 - Object.entries(
            [...forest.join("")].reduce(
                (counts, emoji) => ({ ...counts, [emoji]: (counts[emoji] || 0) + 1 }),
                {}
            )
        ).reduce(([top, bottom], [species, count]) => [top + (count * (count - 1)), bottom + count], [0, 0])
            .reduce((sumLilN, bigN) => sumLilN / (bigN * (bigN - 1)))

    var ind = simpsonsIndex(forest).toFixed(2);
    document.getElementById("simpsons").innerHTML = "";
    document.getElementById("simpsons").innerHTML = document.getElementById("simpsons").innerHTML + ind;

    if (ind <= .7) {
        let over = document.createElement("div");
        over.textContent = "WARNING: Simpson's Index Dropped To " + ind;
        document.getElementById("pushtray").style.zIndex = "100";
        document.getElementById("pushtray").style.right = "50px";
        document.getElementById("pushtray").style.position = "fixed";
        document.getElementById("pushtray").style.display = "block";
        document.getElementById("pushtray").appendChild(over);
    }
}

document.addEventListener("DOMContentLoaded", function () {

    let element = document.getElementById("sim");
    element.classList.add("hidden");

    let element1 = document.getElementById("pushtray");
    element1.classList.add("hidden");

    document.querySelector("div#intro button").addEventListener("click", function clicked() {

        document.getElementById("intro").style.display = "none";
        document.getElementById("sim").style.display = "block";
        document.getElementById("simpsons").style.display = "block";

        let content = document.getElementById("inputForest").value;

        let forest = forestGenerate(content);

        simpsonsShow(forest);

        let button = document.createElement("button");
        button.appendChild(document.createTextNode("generate"));
        button.addEventListener("click", function () {
            const curr = document.getElementById("sim").querySelectorAll("div");
            for (let i = 0; i < curr.length; i++) {
                if (!curr[i].hasAttribute("pinned")) {
                    const newfor = forestGenerate1(content);
                    forest[i - 1] = newfor.textContent;
                    console.log(forest);
                    document.getElementById("sim").replaceChild(newfor, curr[i]);
                }
            }
            document.getElementById("sim").removeChild(button);
            document.getElementById("pushtray").innerHTML = "";
            simpsonsShow(forest);
            document.getElementById("sim").appendChild(button);
        });

        document.getElementById("sim").appendChild(button);
    });
});
