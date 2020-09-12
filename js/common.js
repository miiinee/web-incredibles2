const secEntrance = document.querySelector('#entrance');
const secMain = document.querySelector('#main');

const cntArr = [{cnt:0}, {cnt:0}];
const sectionDictionary = {
    secHome: {
        val: document.querySelector('#home'),
        location1: '#char',
        location2: null,
        flag: 0,
        cntArr: cntArr
    },
    secChar: {
        val: document.querySelector('#char'),
        location1: '#video',
        location2: '#home',
        flag: 1,
        cntArr: cntArr
    },
    secVideo: {
        val: document.querySelector('#video'),
        location1: '#gallery',
        location2: '#char',
        flag: null,
        cntArr: null
    },
    secGallery: {
        val: document.querySelector('#gallery'),
        location1: null,
        location2: '#video',
        flag: null,
        cntArr: null
    }
};

const btnEnter = document.querySelector('.btn-enter');

const imgEntrance = secEntrance.children['img-entrance'];
const imgDivsCont5 = document.querySelectorAll('.container-5 div.bg');
const imgDivsCont = document.querySelectorAll('.container div.bg');

const onInit = () => {
    document.body.style.overflow = 'hidden';
    setImageSize();
};

const setImageSize = () => {
    imgEntrance.style.height = document.body.offsetHeight+'px';
    imgEntrance.style.width = document.body.offsetWidth+'px';

    imgDivsCont5.forEach((imgDiv) => {
        imgDiv.style.backgroundSize = document.body.offsetWidth+'px '+document.body.offsetHeight+'px';
    });

    imgDivsCont.forEach((imgDiv) => {
        imgDiv.style.backgroundSize = document.body.offsetWidth+'px '+document.body.offsetHeight+'px';
    });
};

window.onresize = () => {
    setImageSize();
}

btnEnter.addEventListener('click', (e) => {
    e.preventDefault();
    secEntrance.style.display = 'none';
    secMain.style.display = 'block';
    document.body.style.overflow = 'unset';
    document.body.style.overflowX = 'hidden';
    window.scrollTo(0, 0);
});

Object.keys(sectionDictionary).forEach((key, i) => {
    console.log(sectionDictionary[key].cntArr);
    const selector = sectionDictionary[key].val;
    selector.addEventListener('wheel', (e) => {
        const location1 = sectionDictionary[key].location1;
        const location2 = sectionDictionary[key].location2;
        const arr = sectionDictionary[key].cntArr;
        e.flag = sectionDictionary[key].flag;
        onScrollCarousel(selector, arr, location1, location2, e);
    });
});

const onScrollCarousel = (selector, cntArr, location1, location2, e) => {
    e.preventDefault();
    if (e.deltaY >= 0) {
        // console.log('wheel down', cntArr[e.flag].cnt);
        console.log(cntArr);
        if (cntArr !== null) {
            if (cntArr[e.flag].cnt < 4) {
                selector.childNodes[1].children[cntArr[e.flag].cnt].classList.remove('on');
                cntArr[e.flag].cnt++;
                selector.childNodes[1].children[cntArr[e.flag].cnt].classList.add('on');
            } else {
                if (selector.childNodes[1].children[4].classList.contains('on')) {
                    location.href = location1;
                }
            }
        } else {
            if (location1 !== null) {
                location.href = location1;
            }
        }
        // console.log(cntArr[e.flag]);
        // console.log(e.flag, ' cnt >>>', cntArr[e.flag].cnt);
    } else if (e.deltaY < 0) {
        // console.log('wheel up', cntArr[e.flag].cnt);
        if (cntArr !== null) {
            if (cntArr[e.flag].cnt > 0) {
                selector.childNodes[1].children[cntArr[e.flag].cnt].classList.remove('on');
                cntArr[e.flag].cnt--;
                selector.childNodes[1].children[cntArr[e.flag].cnt].classList.add('on');
            } else {
                if (location2 !== null) {
                    if (selector.childNodes[1].children[0].classList.contains('on')) {
                        location.href = location2;
                    }
                }
            }
        } else {
            if (location2 !== null) {
                location.href = location2;
            }
        }
        // console.log(cntArr[e.flag]);
        // console.log(e.flag, ' cnt >>>', cntArr[e.flag].cnt);
    }
};

const btnPrev = document.querySelector('.nav > .prev');
const btnNext = document.querySelector('.nav > .next');

btnPrev.addEventListener('click', (e) => {
    e.preventDefault();
    onMoveToPrev();
});

btnNext.addEventListener('click', (e) => {
    e.preventDefault();
    onMoveToNext();
});

const onMoveToPrev = () => {
    sectionDictionary['secHome'].val.childNodes[1].children[cntArr[0].cnt].classList.remove('on');
    if (cntArr[0].cnt === 0) {
        cntArr[0].cnt = 4;
    } else {
        cntArr[0].cnt--;
    }
    sectionDictionary['secHome'].val.childNodes[1].children[cntArr[0].cnt].classList.add('on');
}

const onMoveToNext = () => {
    sectionDictionary['secHome'].val.childNodes[1].children[cntArr[0].cnt].classList.remove('on');
    if (cntArr[0].cnt === 4) {
        cntArr[0].cnt = 0;
    } else {
        cntArr[0].cnt++;
    }
    sectionDictionary['secHome'].val.childNodes[1].children[cntArr[0].cnt].classList.add('on');
}

const btnDetailCharDictionary = {
    btnDetailChar1: document.querySelector('section#home .btn-home.char01'),
    btnDetailChar2: document.querySelector('section#home .btn-home.char02'),
    btnDetailChar3: document.querySelector('section#home .btn-home.char03'),
    btnDetailChar4: document.querySelector('section#home .btn-home.char04'),
    btnDetailChar5: document.querySelector('section#home .btn-home.char05')
};

Object.keys(btnDetailCharDictionary).forEach((key, i) => {
    // console.log(key);
    btnDetailCharDictionary[key].addEventListener('click', (e) => {
        e.preventDefault();
        cntArr[1].cnt = i;
        onMoveToDetail(cntArr[1].cnt);
    });
});


const onMoveToDetail = (cnt) => {
    const children = sectionDictionary['secChar'].val.childNodes[1].children;
    [...children].forEach((child) => {
        child.classList.remove('on');
    });
    sectionDictionary['secChar'].val.childNodes[1].children[cnt].classList.add('on');
    location.href = '#char';
};

onInit();











/* previous code for wheel & click event
*  2020.09.13
* */

// const secHome = document.querySelector('#home');
// const secChar = document.querySelector('#char');
// const secVideo = document.querySelector('#video');
// const secGallery = document.querySelector('#gallery');

// const cntArr = [{cnt:0}, {cnt:0}];

// secHome.addEventListener('wheel', (e) => {
//     const location1 = '#char';
//     const location2 = null;
//     e.flag = 0;
//     onScrollCarousel(secHome, cntArr, location1, location2, e);
// });
//
// secChar.addEventListener('wheel', (e) => {
//     const location1 = '#video';
//     const location2 = '#home';
//     e.flag = 1;
//     onScrollCarousel(secChar, cntArr, location1, location2, e);
// });
//
// secVideo.addEventListener('wheel', (e) => {
//     e.preventDefault();
//     const location1 = '#gallery';
//     const location2 = '#char';
//     onScrollCarousel(secVideo, null, location1, location2, e);
// });
//
// secGallery.addEventListener('wheel', (e) => {
//     e.preventDefault();
//     const location1 = null;
//     const location2 = '#video';
//     onScrollCarousel(secGallery, null, location1, location2, e);
// });

// const btnDetailChar1 = document.querySelector('section#home .btn-home.char01');
// const btnDetailChar2 = document.querySelector('section#home .btn-home.char02');
// const btnDetailChar3 = document.querySelector('section#home .btn-home.char03');
// const btnDetailChar4 = document.querySelector('section#home .btn-home.char04');
// const btnDetailChar5 = document.querySelector('section#home .btn-home.char05');
//
// const btnDetailCharArr = [btnDetailChar1, btnDetailChar2, btnDetailChar3, btnDetailChar4, btnDetailChar5];

// btnDetailCharArr.forEach((btnDetailChar, i) => {
//     btnDetailChar.addEventListener('click', (e) => {
//         e.preventDefault();
//         cntArr[1].cnt = i;
//         onMoveToDetail(cntArr[1].cnt);
//     });
// });


/* function declaration vs arrow function
* this, arguments의 바인딩이 다름
* function: this를 {} 안에서 찾음
* arrow: this는 일반적인 인자/변수와 동일하게 취급
* https://beomi.github.io/2017/07/12/understanding_js_scope_function_vs_arrow/
* */

// Object.keys(sectionDictionary).forEach(function (key, i) {
//     // console.log(this[key]);
//     const selector = this[key].val;
//     selector.addEventListener('wheel', (e) => {
//         const location1 = this[key].location1;
//         const location2 = this[key].location2;
//         e.flag = this[key].flag;
//         onScrollCarousel(selector, cntArr, location1, location2, e);
//     });
// }, sectionDictionary);

// Object.keys(sectionDictionary).forEach((key, i) => {
//     // console.log(this[key]);
//     const selector = sectionDictionary[key].val;
//     selector.addEventListener('wheel', (e) => {
//         const location1 = sectionDictionary[key].location1;
//         const location2 = sectionDictionary[key].location2;
//         e.flag = sectionDictionary[key].flag;
//         onScrollCarousel(selector, cntArr, location1, location2, e);
//     });
// });

// Object.keys(btnDetailCharDictionary).forEach(function(key, i) {
//     // console.log(this[key]);
//     this[key].addEventListener('click', (e) => {
//         e.preventDefault();
//         cntArr[1].cnt = i;
//         onMoveToDetail(cntArr[1].cnt);
//     });
// }, btnDetailCharDictionary);

// Object.keys(btnDetailCharDictionary).forEach((key, i) => {
//     // console.log(key);
//     btnDetailCharDictionary[key].addEventListener('click', (e) => {
//         e.preventDefault();
//         cntArr[1].cnt = i;
//         onMoveToDetail(cntArr[1].cnt);
//     });
// });