"use strict";


// 1.Сделать два инпута: в один вводить параметр(число), 
// во втором показывать объем шара при заданном параметре. Навесить валидацию на 1-й инпут.

const inputs = document.getElementById('inputs');
const [firstInput, secondInput] = inputs.querySelectorAll('input');

const regPosVal = /^[1-9][0-9]{0,5}$/g;

firstInput.addEventListener('input', isValidVolumeSphere);

firstInput.addEventListener('focus', function( {target: {value} } ) {

    if ( value.match(regPosVal) ) {
        this.classList.add('valid');
        this.classList.remove('invalid');
    } else {
        this.classList.remove('valid');
        this.classList.add('invalid');
    };
});

firstInput.addEventListener('blur', function(e) {
    this.className = '';
});

/**
 * 
 * @param {number} value 
 * @returns {number} volume sphere
 */
function getVolumeSphere(value) {
    return (4 / 3) * Math.PI * Math.pow(value, 3); 
};

/**
 * 
 * @param {object} object {target: {value}}
 * @param {object} object.target
 * @param {number} object.target.value
 */
function isValidVolumeSphere( {target: {value} } ) {

    if ( value.match(regPosVal) ) {
        this.classList.add('valid');
        this.classList.remove('invalid');

        const res = getVolumeSphere(value);
        secondInput.value = Math.floor(res);
    } else {
        this.classList.remove('valid');
        this.classList.add('invalid');

        secondInput.value = 'ERROR!';
    };
};


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

if (monstersList.querySelectorAll('li').length === 0) {
    btn.classList.add('allMonsters');
};

btn.addEventListener('click', function(e) {

    if (monstersList.querySelectorAll('li').length === 0) {
        infoArr.forEach(elem => {
            makeLi(monstersList, elem);
            this.classList.remove('allMonsters');
        });
    };

    if (monstersList.querySelectorAll('li').length > 0) {
        const lis = monstersList.querySelectorAll('li');
        lis.forEach( elem => handlerElement(elem, 50) );
    };
});


/**
 * 
 * @param {HTMLULElement | HTMLOLElement} listName
 * @param {object} element 
 */
function makeLi(listName, element) {
    
    const li = document.createElement('li');
    li.className = 'commonLi';
    li.innerHTML = `
        <span hidden>${element.id}</span>
        <h3>${element.title}</h3>
        <p>${element.description}</p>
        <div class='closeElem'>x</div>
    `;
    listName.append(li);

    const lastLi = listName.lastElementChild;
    const closeElem = lastLi.querySelector('.closeElem');
   
    closeElem.addEventListener('click', function(e) {
        if (listName.querySelectorAll('li').length === 1) {
            btn.classList.add('allMonsters');
        };

        this.parentElement.remove();
    });
};


/**
 * 
 * @param {HTMLElement} element
 * @param {number} delay
 */
function handlerElement(element, delay) {

    let actualElement = null;

    element.addEventListener('click', function(e) {
        this.classList.toggle('clickLi');

        if (this.classList.contains('hoverLi')) {
            this.classList.remove('hoverLi');
        };

        actualElement = null;
    });

    element.addEventListener('mouseover', function(e) {

        if (actualElement) {
            return;
        };

        let target = e.target;

        if (target.tagName !== 'li') {
            target = target.closest('li');
        };

        actualElement = target;
        target.classList.add('hoverLi');
    });

    element.addEventListener('mouseout', function(e) {

        if (this.classList.contains('hoverLi')) {

            if (!actualElement) {
                return;
            };

            let relatedTarget = e.relatedTarget;

            while (relatedTarget) {
                if (actualElement === relatedTarget) {
                    return;
                };

                relatedTarget = relatedTarget.parentElement;
            };

            actualElement.classList.add('quickStepLi');
            
            setTimeout( () => {
                this.classList.remove('quickStepLi');
                this.classList.remove('hoverLi');
            }, delay);

            actualElement = null;
        };
    });
};




