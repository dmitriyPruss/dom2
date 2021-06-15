"use strict";


// 1.Сделать два инпута: в один вводить параметр(число), 
// во втором показывать объем шара при заданном параметре. Навесить валидацию на 1-й инпут.

const inputs = document.getElementById('inputs');
const [firstInput, secondInput] = document.querySelectorAll('input');

firstInput.addEventListener('input', function(e) {
    const val = e.target.value;
    console.log('target :>> ', val);
    const res = (4 / 3) * Math.PI * Math.pow(val, 3); 

    secondInput.value = res;
});


// 2.Дан элемент #elem. Реализуйте 4 функции:
// - Добавьте ему класс www.
// - Удалите у него класс www.
// - Проверьте наличие у него класса www.
// - Добавьте ему класс www, если его нет и удалите - если есть.

const elem = document.getElementById('elem');

elem.classList.add('www');
elem.classList.remove('www');

console.log('elem.classList.contains("www") :>> ', elem.classList.contains("www"));

elem.classList.toggle('www');

console.log('elem.classList.contains("www") :>> ', elem.classList.contains("www"));


// 3. Вставьте элементы массива объектов (id, title, description) в конец ul так, 
// тобы каждый на каждый объект был свой li.
// Сделайте так, чтобы по нажатию на li - он подсвечивался другим цветом.
// Сделайте так, чтобы по нажатию на кнопку внутри li эта li удалялась из разметки.

const monstersList = document.getElementById('monstersList');
const btn = document.getElementById('btn');

const infoArr = [
    {
        id: 1,
        title: "Вампир",
        description: 'В низшей мифологии народов Европы живой, полумертвец либо мертвец, ведущий ночной образ жизни, сосущий кровь у людей, насылающий кошмары'
    },
    {
        id: 2,
        title: "Ве́дьма",
        description: 'Женщина, практикующая магию (колдовство), а также обладающая магическими способностями и знаниями'
    },
    {
        id: 3,
        title: 'Зо́мби',
        description: 'Мистический архетипический персонаж современной массовой культуры. Под зомби понимается оживлённый фантастическим образом труп или зомбированный живой человек — полностью потерявший контроль над собой и своим телом или подчиняющийся чьим-то приказам'
    },
    {
        id: 4,
        title: 'О́боротень',
        description: 'Мифическое существо, способное временно менять свой облик магическим путём, превращаясь («оборачиваясь, перекидываясь») из человека в другое существо, а также в атмосферное явление, растение или предмет, и наоборот'
    },
];

btn.addEventListener('click', function(e) {

    if (monstersList.querySelectorAll('li').length === 0) {

        infoArr.forEach(elem => {
            const li = document.createElement('li');
            li.className = 'commonLi';
            li.innerHTML = `
            <div>
                <span hidden>${elem.id}</span>
                <h3>${elem.title}</h3>
                <p>${elem.description}</p>
                <div class='closeElem'>x</div>
            </div>`;
            monstersList.append(li);

            const lastLi = monstersList.lastElementChild;
            const closeElem = lastLi.querySelector('.closeElem');

            closeElem.addEventListener('click', function(e) {
                this.parentElement.parentElement.remove();
            })
        });       
    };

    if (monstersList.querySelectorAll('li')) {

        const lis = monstersList.querySelectorAll('li');

        let currentElem = null;
        
        lis.forEach(elem => {

            elem.addEventListener('click', function(e) {
                elem.classList.toggle('clickLi');
                if (elem.classList.contains('hoverLi')) {
                    elem.classList.remove('hoverLi');
                };
                currentElem = null;
            });

            elem.addEventListener('mouseover', function(e) {

                if (currentElem) return;

                let target = e.target;

                if (target.tagName !== 'li') {
                    target = target.closest('li');
                };

                currentElem = target;
                target.classList.add('hoverLi');
            });

            elem.addEventListener('mouseout', function(e) {


                if (elem.classList.contains('hoverLi')) {

                    if (!currentElem) return;

                    let relatedTarget = e.relatedTarget;

                    while (relatedTarget) {
                        if (currentElem === relatedTarget) return;

                        relatedTarget = relatedTarget.parentElement;
                    }

                    currentElem.classList.add('quickStepLi');
                    
                    setTimeout( () => {
                        elem.classList.remove('quickStepLi');
                        elem.classList.remove('hoverLi');
                    }, 100);

                    currentElem = null;
                };
            });
        });
    };
});




