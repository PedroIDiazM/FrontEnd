const container = document.getElementById("resContainer"), inputPkm = document.getElementById("name"), button = document.getElementById("btn");
inputPkm.required = " ";

const HTML404 = `
<div class="pokeimg">
    <img src=${"./ui-img/404.png"} alt="pokemon">
</div>`;

button.addEventListener("click", ()=>{
    const pkmName = inputPkm.value.toLowerCase(), url = `https://pokeapi.co/api/v2/pokemon/${pkmName}`;

    fetch(url).then((res) =>{
        if (res.status != "200"){
            console.log(res);
            container.innerHTML = HTML404;
        }else return res.json();
    }).then((data) => {
        if (data) {
            let pName = data.name, pImg = data.sprites.front_default, pAltura = data.height, pPeso = data.weight, pTipo = data.types[0].type.name, pPS = data.stats[0].base_stat, pATK = data.stats[1].base_stat, pDEF = data.stats[2].base_stat, pSATK = data.stats[3].base_stat, pSDEF = data.stats[4].base_stat, pSPEED = data.stats[5].base_stat, pMoves = data.moves;

            const getBarNumber = (number) => {
                if (number < 1) return 0;
                else if (number <= 16) return 10;
                else if (number <= 32) return 20;
                else if (number <= 48) return 30;
                else if (number <= 64) return 40;
                else if (number <= 80) return 50;
                else if (number <= 96) return 60;
                else if (number <= 112) return 70;
                else if (number <= 128) return 80;
                else if (number <= 144) return 90;
                else if (number <= 160) return 100;
            }

            const printMoves = () =>{
                let movesList = ``;
                for (let i = 0; i < pMoves.length; i++) {
                    movesList += `<p>${i+1} ${pMoves[i].move.name}</p>`;
                }
                return movesList;
            }

            const HTML200 = `
            <h2>${pName}</h2>
            <div class="pokeimg">
                <img src=${pImg} alt="pokemon">
            </div>
            <span><p class="blue">Altura: ${pAltura}0 cm</p><p class="blue">Peso: ${pPeso}00 g</p></span>
            <p class="blue">Tipo: ${pTipo}</p>
            <div class="stats">
                <div class="stscont">
                    <span class="brd"><p class="blue">PS: ${pPS}</p><div class="bar brd bar${getBarNumber(pPS)}"></div></span>
                    <span class="brd"><p class="blue">ATK: ${pATK}</p><div class="bar brd bar${getBarNumber(pATK)}"></div></span>
                    <span class="brd"><p class="blue">DEF: ${pDEF}</p><div class="bar brd bar${getBarNumber(pDEF)}"></div></span>
                </div>
                <div class="stscont">
                    <span class="brd"><p class="blue">SP.ATK: ${pSATK}</p><div class="bar brd bar${getBarNumber(pSATK)}"></div></span>
                    <span class="brd"><p class="blue">SP.DEF: ${pSDEF}</p><div class="bar brd bar${getBarNumber(pSDEF)}"></div></span>
                    <span class="brd"><p class="blue">SPEED: ${pSPEED}</p><div class="bar brd bar${getBarNumber(pSPEED)}"></div></span>
                </div>
            </div>
            <div class="contMoves">
                <h2>Movimientos</h2>
                <div id="moves">${printMoves()}</div>
            </div>
            `;
            container.innerHTML = HTML200;
        }
    });
});